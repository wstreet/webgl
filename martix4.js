// webgl中的矩阵是列为主序

class  Matrix4  {


  /**
   *Creates an instance of Matrix4.
   *初始化为单位矩阵
   * @memberof Matrix4
   */
  constructor() {
      this.elements = new Float32Array([
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0 , 0, 0, 1
      ])
  }


  /**
   * 当前矩阵右乘以一个矩阵
   *
   * @param {*} matrix4
   * @memberof Matrix4
   */
  multiply(matrix4) {
    let i, e, a, b, ai0, ai1, ai2, ai3;
  
        // Calculate e = a * b
        e = this.elements;
        a = this.elements;
        b = matrix4.elements;
        
        // If e equals b, copy b to temporary matrix.
        if (e === b) {
            b = new Float32Array(16);
            for (i = 0; i < 16; ++i) {
                b[i] = e[i];
            }
        }
        
        for (i = 0; i < 4; i++) {
            ai0=a[i];  ai1=a[i+4];  ai2=a[i+8];  ai3=a[i+12];
            e[i]    = ai0 * b[0]  + ai1 * b[1]  + ai2 * b[2]  + ai3 * b[3];
            e[i+4]  = ai0 * b[4]  + ai1 * b[5]  + ai2 * b[6]  + ai3 * b[7];
            e[i+8]  = ai0 * b[8]  + ai1 * b[9]  + ai2 * b[10] + ai3 * b[11];
            e[i+12] = ai0 * b[12] + ai1 * b[13] + ai2 * b[14] + ai3 * b[15];
        }
        
        return this;
  }


  /**
   *重置当前矩阵为单位矩阵
   *
   * @returns
   * @memberof Matrix4
   */
  setIdentity() {
    this.elements = new Float32Array([
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0 , 0, 0, 1
    ])
    return this
  }


  /**
   *平移矩阵
   *
   * @param {*} x
   * @param {*} y
   * @param {*} z
   * @memberof Matrix4
   */
  setTranslate(x, y, z) {
    this.elements = new Float32Array([
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      x, y, z, 1
    ])
    return this
    // var e = this.elements;
    // e[0] = 1;  e[4] = 0;  e[8]  = 0;  e[12] = x;
    // e[1] = 0;  e[5] = 1;  e[9]  = 0;  e[13] = y;
    // e[2] = 0;  e[6] = 0;  e[10] = 1;  e[14] = z;
    // e[3] = 0;  e[7] = 0;  e[11] = 0;  e[15] = 1;
    // return this;
  }

  setRotate(angle, x, y, z) {
    const radian = Math.PI * angle / 180
    let sinB = Math.sin(radian)
    const cosB = Math.cos(radian)
    const e = this.elements

    if (0 !== z && 0 === x && 0 === y) {
      // 绕z轴旋转
      if (z < 0) {
        sinB = -sinB
      }
      e[0] = cosB; e[4] = -sinB; e[8]  = 0.0; e[12] = 0.0
      e[1] = sinB; e[5] = cosB;  e[9]  = 0.0; e[13] = 0.0
      e[2] = 0.0;  e[6] = 0.0;   e[10] = 1.0; e[14] = 0.0
      e[3] = 0.0;  e[7] = 0.0;   e[11] = 0.0; e[15] = 1.0 
    } else if(0 !== x && 0 === z && 0 === y) {
      // 绕x轴旋转
      if (x < 0) {
        sinB = -sinB
      }
      e[0] = 1.0;  e[4] = 0.0;  e[8]  = 0.0;   e[12] = 0.0
      e[1] = 0.0;  e[5] = cosB; e[9]  = -sinB; e[13] = 0.0
      e[2] = 0.0;  e[6] = sinB; e[10] = cosB;  e[14] = 0.0
      e[3] = 0.0;  e[7] = 0.0;  e[11] = 0.0;   e[15] = 1.0 
    } else if(0 !== y && 0 === z && 0 === x) {
      // 绕y轴旋转
      if (y < 0) {
        sinB = -sinB
      }
      e[0] = cosB; e[4] = 0.0;  e[8]  = sinB; e[12] = 0.0
      e[1] = 0.0;  e[5] = 1.0;  e[9]  = 0.0;   e[13] = 0.0
      e[2] = -sinB; e[6] = 0.0;  e[10] = cosB;  e[14] = 0.0
      e[3] = 0.0;  e[7] = 0.0;  e[11] = 0.0;   e[15] = 1.0 
    } else {
      // 绕其他轴旋转
    }
    return this
  }


  
  /**
   * 缩放矩阵
   *
   * @param {*} sx
   * @param {*} sy
   * @param {*} sz
   * @returns
   * @memberof Matrix4
   */
  setScale(sx, sy, sz) {
    const e = this.elements
    e[0] = sx; e[4] = 0;  e[8] = 0;   e[12] = 0;
    e[1] = 0;  e[5] = sy; e[9] = 0;   e[13] = 0;
    e[2] = 0;  e[6] = 0;  e[10] = sz; e[14] = 0;
    e[3] = 0;  e[7] = 0;  e[11] = 0;  e[15] = 1;
    return this
  }

  
  /**
   * 当前矩阵右乘以一个平移矩阵，并将结果设置给当前矩阵
   *  tips：当前矩阵右乘以一个平移矩阵，得到的结果与当前矩阵相比，只有最后一列改变了
   * @param {*} x
   * @param {*} y
   * @param {*} z
   * @memberof Matrix4
   */
  translate(x, y, z) {
    const e = this.elements
    e[12] += e[0] * x + e[4] * y + e[8]  * z;
    e[13] += e[1] * x + e[5] * y + e[9]  * z;
    e[14] += e[2] * x + e[6] * y + e[10] * z;
    e[15] += e[3] * x + e[7] * y + e[11] * z;
    return this
  }


  /**
   * 当前矩阵与一个旋转矩阵相乘，并将结果设置给当前矩阵
   *
   * @param {*} angle
   * @param {*} x
   * @param {*} y
   * @param {*} z
   * @returns
   * @memberof Matrix4
   */
  rotate(angle, x, y, z){
    return this.multiply(new Matrix4().setRotate(angle, x, y, z));
  }


  /**
   * 当前矩阵右乘以一个缩放矩阵，并将结果设置到当前矩阵
   *
   * @param {*} sx
   * @param {*} sy
   * @param {*} sz
   * @returns
   * @memberof Matrix4
   */
  scale(sx, sy, sz){
    let e = this.elements;
    e[0] *= sx; e[4] *= sy;  e[8] *= sz;
    e[1] *= sx; e[5] *= sy;  e[9] *= sz;
    e[2] *= sx; e[6] *= sy;  e[10] *= sz;
    e[3] *= sx; e[7] *= sy;  e[11] *= sz;
    return this;
  }


  setLookAt(eyeX, eyeY, eyeZ, atX, atY, atZ, upX, upY, upZ) {
      // N = eye - target
      let nx, ny, nz;
      nx = eyeX - atX;
      ny = eyeY - atY;
      nz = eyeZ - atZ;
      let rl = 1/Math.sqrt(nx*nx+ny*ny+nz*nz);
      nx *= rl;
      ny *= rl;
      nz *= rl;
      // U = UP cross N
      let ux, uy, uz;
      ux = upY * nz - upZ * ny;
      uy = upZ * nx - upX * nz;
      uz = upX * ny - upY * nx;
      rl = 1/Math.sqrt(ux*ux+uy*uy+uz*uz);
      ux *= rl;
      uy *= rl;
      uz *= rl;
      // V = N cross U
      let vx, vy, vz;
      vx = ny * uz - nz * uy;
      vy = nz * ux - nx * uz;
      vz = nx * uy - ny * ux;
      rl = 1/Math.sqrt(vx*vx+vy*vy+vz*vz);
      vx *= rl;
      vy *= rl;
      vz *= rl;

      let e = this.elements;
      e[0] = ux;
      e[1] = vx;
      e[2] = nx;
      e[3] = 0;

      e[4] = uy;
      e[5] = vy;
      e[6] = ny;
      e[7] = 0;

      e[8] = uz;
      e[9] = vz;
      e[10] = nz;
      e[11] = 0;

      e[12] = 0;
      e[13] = 0;
      e[14] = 0;
      e[15] = 1;

      return this.translate(-eyeX, -eyeY, -eyeZ);
  }

  setPerspective(fovy, aspect, near, far) {
    var e, rd, s, ct;
  
    if (near === far || aspect === 0) {
      throw 'null frustum';
    }
    if (near <= 0) {
      throw 'near <= 0';
    }
    if (far <= 0) {
      throw 'far <= 0';
    }
  
    fovy = Math.PI * fovy / 180 / 2;
    s = Math.sin(fovy);
    if (s === 0) {
      throw 'null frustum';
    }
  
    rd = 1 / (far - near);
    ct = Math.cos(fovy) / s;
  
    e = this.elements;
  
    e[0]  = ct / aspect;
    e[1]  = 0;
    e[2]  = 0;
    e[3]  = 0;
  
    e[4]  = 0;
    e[5]  = ct;
    e[6]  = 0;
    e[7]  = 0;
  
    e[8]  = 0;
    e[9]  = 0;
    e[10] = -(far + near) * rd;
    e[11] = -1;
  
    e[12] = 0;
    e[13] = 0;
    e[14] = -2 * near * far * rd;
    e[15] = 0;
  
    return this;
  };

  lookAt(eyeX, eyeY, eyeZ, centerX, centerY, centerZ, upX, upY, upZ) {
    return this.concat(new Matrix4().setLookAt(eyeX, eyeY, eyeZ, centerX, centerY, centerZ, upX, upY, upZ));
  }

  concat(other) {
    var i, e, a, b, ai0, ai1, ai2, ai3;
  
    // Calculate e = a * b
    e = this.elements;
    a = this.elements;
    b = other.elements;
    
    // If e equals b, copy b to temporary matrix.
    if (e === b) {
      b = new Float32Array(16);
      for (i = 0; i < 16; ++i) {
        b[i] = e[i];
      }
    }
    
    for (i = 0; i < 4; i++) {
      ai0=a[i];  ai1=a[i+4];  ai2=a[i+8];  ai3=a[i+12];
      e[i]    = ai0 * b[0]  + ai1 * b[1]  + ai2 * b[2]  + ai3 * b[3];
      e[i+4]  = ai0 * b[4]  + ai1 * b[5]  + ai2 * b[6]  + ai3 * b[7];
      e[i+8]  = ai0 * b[8]  + ai1 * b[9]  + ai2 * b[10] + ai3 * b[11];
      e[i+12] = ai0 * b[12] + ai1 * b[13] + ai2 * b[14] + ai3 * b[15];
    }
    
    return this;
  }

  /**
   * 逆矩阵
   * @param {*} other 
   */
  setInverseOf(other) {
    var i, s, d, inv, det;
  
    s = other.elements;
    d = this.elements;
    inv = new Float32Array(16);
  
    inv[0]  =   s[5]*s[10]*s[15] - s[5] *s[11]*s[14] - s[9] *s[6]*s[15]
              + s[9]*s[7] *s[14] + s[13]*s[6] *s[11] - s[13]*s[7]*s[10];
    inv[4]  = - s[4]*s[10]*s[15] + s[4] *s[11]*s[14] + s[8] *s[6]*s[15]
              - s[8]*s[7] *s[14] - s[12]*s[6] *s[11] + s[12]*s[7]*s[10];
    inv[8]  =   s[4]*s[9] *s[15] - s[4] *s[11]*s[13] - s[8] *s[5]*s[15]
              + s[8]*s[7] *s[13] + s[12]*s[5] *s[11] - s[12]*s[7]*s[9];
    inv[12] = - s[4]*s[9] *s[14] + s[4] *s[10]*s[13] + s[8] *s[5]*s[14]
              - s[8]*s[6] *s[13] - s[12]*s[5] *s[10] + s[12]*s[6]*s[9];
  
    inv[1]  = - s[1]*s[10]*s[15] + s[1] *s[11]*s[14] + s[9] *s[2]*s[15]
              - s[9]*s[3] *s[14] - s[13]*s[2] *s[11] + s[13]*s[3]*s[10];
    inv[5]  =   s[0]*s[10]*s[15] - s[0] *s[11]*s[14] - s[8] *s[2]*s[15]
              + s[8]*s[3] *s[14] + s[12]*s[2] *s[11] - s[12]*s[3]*s[10];
    inv[9]  = - s[0]*s[9] *s[15] + s[0] *s[11]*s[13] + s[8] *s[1]*s[15]
              - s[8]*s[3] *s[13] - s[12]*s[1] *s[11] + s[12]*s[3]*s[9];
    inv[13] =   s[0]*s[9] *s[14] - s[0] *s[10]*s[13] - s[8] *s[1]*s[14]
              + s[8]*s[2] *s[13] + s[12]*s[1] *s[10] - s[12]*s[2]*s[9];
  
    inv[2]  =   s[1]*s[6]*s[15] - s[1] *s[7]*s[14] - s[5] *s[2]*s[15]
              + s[5]*s[3]*s[14] + s[13]*s[2]*s[7]  - s[13]*s[3]*s[6];
    inv[6]  = - s[0]*s[6]*s[15] + s[0] *s[7]*s[14] + s[4] *s[2]*s[15]
              - s[4]*s[3]*s[14] - s[12]*s[2]*s[7]  + s[12]*s[3]*s[6];
    inv[10] =   s[0]*s[5]*s[15] - s[0] *s[7]*s[13] - s[4] *s[1]*s[15]
              + s[4]*s[3]*s[13] + s[12]*s[1]*s[7]  - s[12]*s[3]*s[5];
    inv[14] = - s[0]*s[5]*s[14] + s[0] *s[6]*s[13] + s[4] *s[1]*s[14]
              - s[4]*s[2]*s[13] - s[12]*s[1]*s[6]  + s[12]*s[2]*s[5];
  
    inv[3]  = - s[1]*s[6]*s[11] + s[1]*s[7]*s[10] + s[5]*s[2]*s[11]
              - s[5]*s[3]*s[10] - s[9]*s[2]*s[7]  + s[9]*s[3]*s[6];
    inv[7]  =   s[0]*s[6]*s[11] - s[0]*s[7]*s[10] - s[4]*s[2]*s[11]
              + s[4]*s[3]*s[10] + s[8]*s[2]*s[7]  - s[8]*s[3]*s[6];
    inv[11] = - s[0]*s[5]*s[11] + s[0]*s[7]*s[9]  + s[4]*s[1]*s[11]
              - s[4]*s[3]*s[9]  - s[8]*s[1]*s[7]  + s[8]*s[3]*s[5];
    inv[15] =   s[0]*s[5]*s[10] - s[0]*s[6]*s[9]  - s[4]*s[1]*s[10]
              + s[4]*s[2]*s[9]  + s[8]*s[1]*s[6]  - s[8]*s[2]*s[5];
  
    det = s[0]*inv[0] + s[1]*inv[4] + s[2]*inv[8] + s[3]*inv[12];
    if (det === 0) {
      return this;
    }
  
    det = 1 / det;
    for (i = 0; i < 16; i++) {
      d[i] = inv[i] * det;
    }
  
    return this;
  }

  /**
   * 转制
   */
  transpose () {
    var e, t;
  
    e = this.elements;
  
    t = e[ 1];  e[ 1] = e[ 4];  e[ 4] = t;
    t = e[ 2];  e[ 2] = e[ 8];  e[ 8] = t;
    t = e[ 3];  e[ 3] = e[12];  e[12] = t;
    t = e[ 6];  e[ 6] = e[ 9];  e[ 9] = t;
    t = e[ 7];  e[ 7] = e[13];  e[13] = t;
    t = e[11];  e[11] = e[14];  e[14] = t;
  
    return this;
  }

}