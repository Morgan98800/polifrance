"""
Utilitaires mathématiques vectoriels en Python natif pur (Zéro dépendance externe).
"""

import math
import random
from typing import List, Union

Vector = List[float]
Matrix = List[List[float]]

def dot(v1: Vector, v2: Vector) -> float:
    return sum(a * b for a, b in zip(v1, v2))

def norm(v: Vector) -> float:
    return math.sqrt(sum(x * x for x in v))

def cosine_similarity(v1: Vector, v2: Vector) -> float:
    n1, n2 = norm(v1), norm(v2)
    if n1 <= 1e-9 or n2 <= 1e-9:
        return 0.0
    return dot(v1, v2) / (n1 * n2)

def clip(val: float, min_v: float, max_v: float) -> float:
    return max(min_v, min(val, max_v))

def std_dev(values: List[float]) -> float:
    if len(values) < 2:
        return 0.05
    mean = sum(values) / len(values)
    variance = sum((x - mean) ** 2 for x in values) / (len(values) - 1)
    return math.sqrt(variance)

def mat_vec_mul(mat: Matrix, vec: Vector) -> Vector:
    return [dot(row, vec) for row in mat]

def mat_mul(m1: Matrix, m2: Matrix) -> Matrix:
    rows_m1 = len(m1)
    cols_m1 = len(m1[0])
    cols_m2 = len(m2[0])
    res = [[0.0] * cols_m2 for _ in range(rows_m1)]
    for i in range(rows_m1):
        for j in range(cols_m2):
            res[i][j] = sum(m1[i][k] * m2[k][j] for k in range(cols_m1))
    return res

def rand_uniform(low: float, high: float) -> float:
    return random.uniform(low, high)

def rand_normal(mean: float = 0.0, std: float = 1.0) -> float:
    return random.gauss(mean, std)
