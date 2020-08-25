
/**
 * 三维向量
 */

class Vector3 {
  constructor(src) {
    const v = new Float32Array(3)
    if(src && typeof src === 'object') {
      v[0] = src[0]
      v[1] = src[1]
      v[2] = src[2]
    }
    this.elements = v
  }

  normalize() {
    const v = this.elements;
    const c = v[0], 
          d = v[1], 
          e = v[2] 
    let g = Math.sqrt(c*c+d*d+e*e);
    if(g) {
      if(g == 1) return this;
     } else {
       v[0] = 0; v[1] = 0; v[2] = 0;
       return this;
     }
     g = 1/g;
     v[0] = c*g; v[1] = d*g; v[2] = e*g;
     return this;
  }
}