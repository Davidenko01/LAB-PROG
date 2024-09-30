const duplicar = (x) => {
    return x*2;
}

let a = [1, 2 ,3, 4];
for(let i; i < a.length; i++) {
    a[i] = duplicar(a[i]);
}

duplicar = a.map