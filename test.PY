# 给你三个整数 l、r 和 k。
# 如果存在一个整数 x，使得 y = x^k，则称整数 y 为一个 完全 k 次幂。
# 返回区间 [l, r]（包含两端）内是完全 k 次幂的整数 y 的数量。

# 1 10 2
# L=1,R=10,K=2
# 1^2=1,2^2=4 3^3=9

import map
l,r,k=map(int,input().split())
def f(n):
    if n<0:return 0
    x = int(n**(1/K))
    while pow(x+1,K) <= n:x+=1
    while pow(x,K)>n:x-=1
    return x
print(f(r)-f(l-1))


