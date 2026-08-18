/**
 * Moteur 1 (TypeScript) : Marché de Prédiction Politique & Carnet d'Ordres
 */

export interface Order {
  price: number;
  volume: number;
  agentId: string;
  side: 'BUY' | 'SELL';
  timestamp: number;
}

export class LimitOrderBook {
  public bids: Order[] = [];
  public asks: Order[] = [];
  public priceHistory: number[] = [0.50];
  public trades: Array<{ price: number; volume: number; timestamp: number }> = [];

  constructor(public contractId: string) {}

  public addOrder(order: Order) {
    if (order.side === 'BUY') {
      while (this.asks.length > 0 && order.volume > 0 && this.asks[0].price <= order.price) {
        const bestAsk = this.asks[0];
        const matchVol = Math.min(order.volume, bestAsk.volume);
        order.volume -= matchVol;
        bestAsk.volume -= matchVol;
        this.trades.push({ price: bestAsk.price, volume: matchVol, timestamp: Date.now() });
        this.priceHistory.push(bestAsk.price);
        if (bestAsk.volume <= 1e-6) this.asks.shift();
      }
      if (order.volume > 1e-6) {
        this.bids.push(order);
        this.bids.sort((a, b) => b.price - a.price);
      }
    } else {
      while (this.bids.length > 0 && order.volume > 0 && this.bids[0].price >= order.price) {
        const bestBid = this.bids[0];
        const matchVol = Math.min(order.volume, bestBid.volume);
        order.volume -= matchVol;
        bestBid.volume -= matchVol;
        this.trades.push({ price: bestBid.price, volume: matchVol, timestamp: Date.now() });
        this.priceHistory.push(bestBid.price);
        if (bestBid.volume <= 1e-6) this.bids.shift();
      }
      if (order.volume > 1e-6) {
        this.asks.push(order);
        this.asks.sort((a, b) => a.price - b.price);
      }
    }
  }

  public getMidPrice(): number {
    if (this.bids.length > 0 && this.asks.length > 0) {
      return (this.bids[0].price + this.asks[0].price) / 2;
    }
    return this.priceHistory[this.priceHistory.length - 1] || 0.50;
  }

  public getVwap(windowSize: number = 20): number {
    if (this.trades.length === 0) return this.getMidPrice();
    const recent = this.trades.slice(-windowSize);
    const totalVol = recent.reduce((sum, t) => sum + t.volume, 0);
    if (totalVol <= 1e-6) return this.getMidPrice();
    return recent.reduce((sum, t) => sum + t.price * t.volume, 0) / totalVol;
  }

  public calculateVolatility(windowSize: number = 15): number {
    const recent = this.priceHistory.slice(-windowSize);
    if (recent.length < 3) return 0.05;
    const logReturns = [];
    for (let i = 1; i < recent.length; i++) {
      const p1 = Math.max(0.01, Math.min(0.99, recent[i]));
      const p0 = Math.max(0.01, Math.min(0.99, recent[i - 1]));
      logReturns.push(Math.log(p1 / p0));
    }
    const mean = logReturns.reduce((a, b) => a + b, 0) / logReturns.length;
    const variance = logReturns.reduce((sum, r) => sum + Math.pow(r - mean, 2), 0) / (logReturns.length - 1);
    return Math.sqrt(variance);
  }
}

export class PredictionMarketEngine {
  public books: Map<string, LimitOrderBook> = new Map();
  public baseBundRate: number = 2.40;

  constructor() {
    this.getOrCreateBook('reforme_plf_2027');
  }

  public getOrCreateBook(contractId: string): LimitOrderBook {
    if (!this.books.has(contractId)) {
      const book = new LimitOrderBook(contractId);
      // Remplissage initial d'ordres réalistes
      book.addOrder({ price: 0.52, volume: 50, agentId: 'bot_hedge_1', side: 'BUY', timestamp: Date.now() });
      book.addOrder({ price: 0.50, volume: 80, agentId: 'bot_lobby_1', side: 'BUY', timestamp: Date.now() });
      book.addOrder({ price: 0.55, volume: 60, agentId: 'bot_media_1', side: 'SELL', timestamp: Date.now() });
      book.addOrder({ price: 0.58, volume: 45, agentId: 'bot_hedge_2', side: 'SELL', timestamp: Date.now() });
      this.books.set(contractId, book);
    }
    return this.books.get(contractId)!;
  }

  public simulateOrderFlow(contractId: string, fundamentalSignal: number) {
    const book = this.getOrCreateBook(contractId);
    for (let i = 0; i < 8; i++) {
      const isBuy = Math.random() < fundamentalSignal;
      const mid = book.getMidPrice();
      const spreadDelta = (Math.random() * 0.05 + 0.01);
      const price = isBuy ? Math.min(0.99, mid + spreadDelta) : Math.max(0.01, mid - spreadDelta);
      const volume = Math.round(Math.random() * 40 + 10);
      book.addOrder({
        price: Number(price.toFixed(2)),
        volume,
        agentId: `bot_sim_${i}`,
        side: isBuy ? 'BUY' : 'SELL',
        timestamp: Date.now()
      });
    }
  }

  public calculateSovereignSpread(contractId: string, deficitPct: number, debtPct: number) {
    const book = this.getOrCreateBook(contractId);
    const pImplied = book.getVwap();
    const sigmaPol = book.calculateVolatility();

    const baseSpread = 45.0;
    const macroSpread = Math.max(0, deficitPct - 3.0) * 18.0 + Math.max(0, debtPct - 100.0) * 0.85;
    const politicalRisk = 120.0 * sigmaPol * Math.pow(1.0 - pImplied, 2);

    const totalSpreadBps = baseSpread + macroSpread + politicalRisk;
    const oatYield10y = this.baseBundRate + totalSpreadBps / 100.0;

    return {
      pImpliedSuccess: Number(pImplied.toFixed(3)),
      politicalVolatility: Number(sigmaPol.toFixed(3)),
      spreadOatBundBps: Number(totalSpreadBps.toFixed(1)),
      oat10yYieldPct: Number(oatYield10y.toFixed(3)),
      macroRisk: Number(macroSpread.toFixed(1)),
      politicalRisk: Number(politicalRisk.toFixed(1)),
      bids: book.bids.slice(0, 4),
      asks: book.asks.slice(0, 4),
    };
  }
}
