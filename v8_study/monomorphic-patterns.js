/**
 * V8 Monomorphic vs Polymorphic Optimization Patterns
 * ====================================================
 * This file demonstrates how V8's Inline Caches (ICs) optimize based on the
 * number of different object shapes (hidden classes) seen at a call site.
 */

const ITERATIONS = 10000000;

class Point2D {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.z = '';
        this.a = '';
        this.b = '';
        this.c = '';
        this.d = '';
        this.e = '';
        this.f = '';
        this.g = '';
    }
}

class Point3D {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.a = '';
        this.b = '';
        this.c = '';
        this.d = '';
        this.e = '';
        this.f = '';
        this.g = '';
    }
}

class Point4D {
    constructor(x, y, z, a) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.a = a;
        this.b = '';
        this.c = '';
        this.d = '';
        this.e = '';
        this.f = '';
        this.g = '';
    }
}

class Point5D {
    constructor(x, y, z, a, b) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.a = a;
        this.b = b;
        this.c = '';
        this.d = '';
        this.e = '';
        this.f = '';
        this.g = '';
    }
}

class Point6D {
    constructor(x, y, z, a, b, c) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = '';
        this.e = '';
        this.f = '';
        this.g = '';
    }
}

class Point7D {
    constructor(x, y, z, a, b, c, d) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
        this.e = '';
        this.f = '';
        this.g = '';
    }
}

class Point8D {
    constructor(x, y, z, a, b, c, d, e) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
        this.e = e;
        this.f = '';
        this.g = '';
    }
}

class Point9D {
    constructor(x, y, z, a, b, c, d, e, f) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
        this.e = e;
        this.f = f;
        this.g = '';
    }
}

class Point10D {
    constructor(x, y, z, a, b, c, d, e, f, g) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
        this.e = e;
        this.f = f;
        this.g = g;
    }
}

// This function's call site is MONOMORPHIC. It will always see Point2D objects.
function getX_monomorphic(point) {
    return point.x;
}

// This function's call site is POLYMORPHIC. It will see different object shapes.
function getX_polymorphic(point) {
    return point.x;
}

// Prime the functions so V8 can optimize them
for (let i = 0; i < 10000; i++) {
    getX_monomorphic(new Point2D(i, i));

    getX_polymorphic(new Point2D(i, i));
    getX_polymorphic(new Point3D(i, i, i));
    getX_polymorphic(new Point4D(i, i, i, i));
    getX_polymorphic(new Point5D(i, i, i, i, i));
    getX_polymorphic(new Point6D(i, i, i, i, i, i));
    getX_polymorphic(new Point7D(i, i, i, i, i, i, i));
    getX_polymorphic(new Point8D(i, i, i, i, i, i, i, i));
    getX_polymorphic(new Point9D(i, i, i, i, i, i, i, i, i));
    getX_polymorphic(new Point10D(i, i, i, i, i, i, i, i, i, i));
}

console.time("Monomorphic");
let mono_sum = 0;
for (let i = 0; i < ITERATIONS; i++) {
    const mod = i % 9;
    mono_sum += getX_monomorphic(
        mod === 0 ? new Point2D(i, i) :
        mod === 1 ? new Point2D(i, i) :
        mod === 2 ? new Point2D(i, i) :
        mod === 3 ? new Point2D(i, i) :
        mod === 4 ? new Point2D(i, i) :
        mod === 5 ? new Point2D(i, i) :
        mod === 6 ? new Point2D(i, i) :
        mod === 7 ? new Point2D(i, i) :
        new Point2D(i, i)
    );
}
console.timeEnd("Monomorphic");

console.time("Polymorphic");
let poly_sum = 0;
for (let i = 0; i < ITERATIONS; i++) {
    const mod = i % 9;
    poly_sum += getX_polymorphic(
        mod === 0 ? new Point2D(i, i) :
        mod === 1 ? new Point3D(i, i, i) :
        mod === 2 ? new Point4D(i, i, i, i) :
        mod === 3 ? new Point5D(i, i, i, i, i) :
        mod === 4 ? new Point6D(i, i, i, i, i, i) :
        mod === 5 ? new Point7D(i, i, i, i, i, i, i) :
        mod === 6 ? new Point8D(i, i, i, i, i, i, i, i) :
        mod === 7 ? new Point9D(i, i, i, i, i, i, i, i, i) :
        new Point10D(i, i, i, i, i, i, i, i, i, i)
    );
}
console.timeEnd("Polymorphic");

// Note: Ensure sums are used to prevent V8 from optimizing away the loops.
console.log(mono_sum, poly_sum);