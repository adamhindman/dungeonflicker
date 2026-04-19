var vc=Object.defineProperty;var xc=(s,t,e)=>t in s?vc(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e;var co=(s,t,e)=>xc(s,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=e(i);fetch(i.href,r)}})();/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Ua="177",Ti={ROTATE:0,DOLLY:1,PAN:2},yi={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Mc=0,ho=1,yc=2,wl=1,Sc=2,mn=3,Dn=0,Ce=1,le=2,An=0,Ei=1,uo=2,fo=3,po=4,Tc=5,qn=100,Ec=101,bc=102,wc=103,Cc=104,Ac=200,Rc=201,Dc=202,Pc=203,Xr=204,Yr=205,Lc=206,Ic=207,Nc=208,Oc=209,Uc=210,Fc=211,Bc=212,kc=213,zc=214,qr=0,Kr=1,Zr=2,Ci=3,jr=4,$r=5,Jr=6,Qr=7,Fa=0,Hc=1,Vc=2,Rn=0,Gc=1,Wc=2,Xc=3,Yc=4,qc=5,Kc=6,Zc=7,Cl=300,Ai=301,Ri=302,ta=303,ea=304,Qs=306,te=1e3,jn=1001,na=1002,Qe=1003,jc=1004,fs=1005,rn=1006,ar=1007,$n=1008,an=1009,Al=1010,Rl=1011,Ji=1012,Ba=1013,Jn=1014,gn=1015,cs=1016,ka=1017,za=1018,Qi=1020,Dl=35902,Pl=1021,Ll=1022,Je=1023,ts=1026,es=1027,Il=1028,Ha=1029,Nl=1030,Va=1031,Ga=1033,Vs=33776,Gs=33777,Ws=33778,Xs=33779,ia=35840,sa=35841,ra=35842,aa=35843,oa=36196,la=37492,ca=37496,ha=37808,ua=37809,da=37810,fa=37811,pa=37812,ma=37813,ga=37814,_a=37815,va=37816,xa=37817,Ma=37818,ya=37819,Sa=37820,Ta=37821,Ys=36492,Ea=36494,ba=36495,Ol=36283,wa=36284,Ca=36285,Aa=36286,$c=3200,Jc=3201,Wa=0,Qc=1,Cn="",He="srgb",Di="srgb-linear",Ks="linear",se="srgb",ai=7680,mo=519,th=512,eh=513,nh=514,Ul=515,ih=516,sh=517,rh=518,ah=519,go=35044,_o="300 es",_n=2e3,Zs=2001;class ei{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){const n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){const n=this._listeners;if(n===void 0)return;const i=n[t];if(i!==void 0){const r=i.indexOf(e);r!==-1&&i.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const n=e[t.type];if(n!==void 0){t.target=this;const i=n.slice(0);for(let r=0,a=i.length;r<a;r++)i[r].call(this,t);t.target=null}}}const be=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let vo=1234567;const qi=Math.PI/180,Pi=180/Math.PI;function ni(){const s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(be[s&255]+be[s>>8&255]+be[s>>16&255]+be[s>>24&255]+"-"+be[t&255]+be[t>>8&255]+"-"+be[t>>16&15|64]+be[t>>24&255]+"-"+be[e&63|128]+be[e>>8&255]+"-"+be[e>>16&255]+be[e>>24&255]+be[n&255]+be[n>>8&255]+be[n>>16&255]+be[n>>24&255]).toLowerCase()}function jt(s,t,e){return Math.max(t,Math.min(e,s))}function Xa(s,t){return(s%t+t)%t}function oh(s,t,e,n,i){return n+(s-t)*(i-n)/(e-t)}function lh(s,t,e){return s!==t?(e-s)/(t-s):0}function Ki(s,t,e){return(1-e)*s+e*t}function ch(s,t,e,n){return Ki(s,t,1-Math.exp(-e*n))}function hh(s,t=1){return t-Math.abs(Xa(s,t*2)-t)}function uh(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*(3-2*s))}function dh(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*s*(s*(s*6-15)+10))}function fh(s,t){return s+Math.floor(Math.random()*(t-s+1))}function ph(s,t){return s+Math.random()*(t-s)}function mh(s){return s*(.5-Math.random())}function gh(s){s!==void 0&&(vo=s);let t=vo+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function _h(s){return s*qi}function vh(s){return s*Pi}function xh(s){return(s&s-1)===0&&s!==0}function Mh(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function yh(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function Sh(s,t,e,n,i){const r=Math.cos,a=Math.sin,o=r(e/2),l=a(e/2),c=r((t+n)/2),h=a((t+n)/2),u=r((t-n)/2),f=a((t-n)/2),d=r((n-t)/2),g=a((n-t)/2);switch(i){case"XYX":s.set(o*h,l*u,l*f,o*c);break;case"YZY":s.set(l*f,o*h,l*u,o*c);break;case"ZXZ":s.set(l*u,l*f,o*h,o*c);break;case"XZX":s.set(o*h,l*g,l*d,o*c);break;case"YXY":s.set(l*d,o*h,l*g,o*c);break;case"ZYZ":s.set(l*g,l*d,o*h,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function Mi(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function Re(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}const Ra={DEG2RAD:qi,RAD2DEG:Pi,generateUUID:ni,clamp:jt,euclideanModulo:Xa,mapLinear:oh,inverseLerp:lh,lerp:Ki,damp:ch,pingpong:hh,smoothstep:uh,smootherstep:dh,randInt:fh,randFloat:ph,randFloatSpread:mh,seededRandom:gh,degToRad:_h,radToDeg:vh,isPowerOfTwo:xh,ceilPowerOfTwo:Mh,floorPowerOfTwo:yh,setQuaternionFromProperEuler:Sh,normalize:Re,denormalize:Mi};class dt{constructor(t=0,e=0){dt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=jt(this.x,t.x,e.x),this.y=jt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=jt(this.x,t,e),this.y=jt(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(jt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(jt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),i=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*i+t.x,this.y=r*i+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class tn{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,r,a,o){let l=n[i+0],c=n[i+1],h=n[i+2],u=n[i+3];const f=r[a+0],d=r[a+1],g=r[a+2],_=r[a+3];if(o===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u;return}if(o===1){t[e+0]=f,t[e+1]=d,t[e+2]=g,t[e+3]=_;return}if(u!==_||l!==f||c!==d||h!==g){let m=1-o;const p=l*f+c*d+h*g+u*_,E=p>=0?1:-1,M=1-p*p;if(M>Number.EPSILON){const w=Math.sqrt(M),b=Math.atan2(w,p*E);m=Math.sin(m*b)/w,o=Math.sin(o*b)/w}const x=o*E;if(l=l*m+f*x,c=c*m+d*x,h=h*m+g*x,u=u*m+_*x,m===1-o){const w=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=w,c*=w,h*=w,u*=w}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,i,r,a){const o=n[i],l=n[i+1],c=n[i+2],h=n[i+3],u=r[a],f=r[a+1],d=r[a+2],g=r[a+3];return t[e]=o*g+h*u+l*d-c*f,t[e+1]=l*g+h*f+c*u-o*d,t[e+2]=c*g+h*d+o*f-l*u,t[e+3]=h*g-o*u-l*f-c*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,i=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(i/2),u=o(r/2),f=l(n/2),d=l(i/2),g=l(r/2);switch(a){case"XYZ":this._x=f*h*u+c*d*g,this._y=c*d*u-f*h*g,this._z=c*h*g+f*d*u,this._w=c*h*u-f*d*g;break;case"YXZ":this._x=f*h*u+c*d*g,this._y=c*d*u-f*h*g,this._z=c*h*g-f*d*u,this._w=c*h*u+f*d*g;break;case"ZXY":this._x=f*h*u-c*d*g,this._y=c*d*u+f*h*g,this._z=c*h*g+f*d*u,this._w=c*h*u-f*d*g;break;case"ZYX":this._x=f*h*u-c*d*g,this._y=c*d*u+f*h*g,this._z=c*h*g-f*d*u,this._w=c*h*u+f*d*g;break;case"YZX":this._x=f*h*u+c*d*g,this._y=c*d*u+f*h*g,this._z=c*h*g-f*d*u,this._w=c*h*u-f*d*g;break;case"XZY":this._x=f*h*u-c*d*g,this._y=c*d*u-f*h*g,this._z=c*h*g+f*d*u,this._w=c*h*u+f*d*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],i=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],u=e[10],f=n+o+u;if(f>0){const d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(h-l)*d,this._y=(r-c)*d,this._z=(a-i)*d}else if(n>o&&n>u){const d=2*Math.sqrt(1+n-o-u);this._w=(h-l)/d,this._x=.25*d,this._y=(i+a)/d,this._z=(r+c)/d}else if(o>u){const d=2*Math.sqrt(1+o-n-u);this._w=(r-c)/d,this._x=(i+a)/d,this._y=.25*d,this._z=(l+h)/d}else{const d=2*Math.sqrt(1+u-n-o);this._w=(a-i)/d,this._x=(r+c)/d,this._y=(l+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(jt(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,i=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+a*o+i*c-r*l,this._y=i*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-i*o,this._w=a*h-n*o-i*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,i=this._y,r=this._z,a=this._w;let o=a*t._w+n*t._x+i*t._y+r*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=n,this._y=i,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const d=1-e;return this._w=d*a+e*this._w,this._x=d*n+e*this._x,this._y=d*i+e*this._y,this._z=d*r+e*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,o),u=Math.sin((1-e)*h)/c,f=Math.sin(e*h)/c;return this._w=a*u+this._w*f,this._x=n*u+this._x*f,this._y=i*u+this._y*f,this._z=r*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class A{constructor(t=0,e=0,n=0){A.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(xo.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(xo.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*i,this.y=r[1]*e+r[4]*n+r[7]*i,this.z=r[2]*e+r[5]*n+r[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*i+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*i+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*i+r[14])*a,this}applyQuaternion(t){const e=this.x,n=this.y,i=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*i-o*n),h=2*(o*e-r*i),u=2*(r*n-a*e);return this.x=e+l*c+a*u-o*h,this.y=n+l*h+o*c-r*u,this.z=i+l*u+r*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*i,this.y=r[1]*e+r[5]*n+r[9]*i,this.z=r[2]*e+r[6]*n+r[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=jt(this.x,t.x,e.x),this.y=jt(this.y,t.y,e.y),this.z=jt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=jt(this.x,t,e),this.y=jt(this.y,t,e),this.z=jt(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(jt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,i=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=i*l-r*o,this.y=r*a-n*l,this.z=n*o-i*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return or.copy(this).projectOnVector(t),this.sub(or)}reflect(t){return this.sub(or.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(jt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const or=new A,xo=new tn;class qt{constructor(t,e,n,i,r,a,o,l,c){qt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,a,o,l,c)}set(t,e,n,i,r,a,o,l,c){const h=this.elements;return h[0]=t,h[1]=i,h[2]=o,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],u=n[7],f=n[2],d=n[5],g=n[8],_=i[0],m=i[3],p=i[6],E=i[1],M=i[4],x=i[7],w=i[2],b=i[5],R=i[8];return r[0]=a*_+o*E+l*w,r[3]=a*m+o*M+l*b,r[6]=a*p+o*x+l*R,r[1]=c*_+h*E+u*w,r[4]=c*m+h*M+u*b,r[7]=c*p+h*x+u*R,r[2]=f*_+d*E+g*w,r[5]=f*m+d*M+g*b,r[8]=f*p+d*x+g*R,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-n*r*h+n*o*l+i*r*c-i*a*l}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=h*a-o*c,f=o*l-h*r,d=c*r-a*l,g=e*u+n*f+i*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return t[0]=u*_,t[1]=(i*c-h*n)*_,t[2]=(o*n-i*a)*_,t[3]=f*_,t[4]=(h*e-i*l)*_,t[5]=(i*r-o*e)*_,t[6]=d*_,t[7]=(n*l-c*e)*_,t[8]=(a*e-n*r)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+t,-i*c,i*l,-i*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(lr.makeScale(t,e)),this}rotate(t){return this.premultiply(lr.makeRotation(-t)),this}translate(t,e){return this.premultiply(lr.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const lr=new qt;function Fl(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function ns(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function Th(){const s=ns("canvas");return s.style.display="block",s}const Mo={};function bi(s){s in Mo||(Mo[s]=!0,console.warn(s))}function Eh(s,t,e){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(t,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function bh(s){const t=s.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function wh(s){const t=s.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const yo=new qt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),So=new qt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Ch(){const s={enabled:!0,workingColorSpace:Di,spaces:{},convert:function(i,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===se&&(i.r=xn(i.r),i.g=xn(i.g),i.b=xn(i.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(i.applyMatrix3(this.spaces[r].toXYZ),i.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===se&&(i.r=wi(i.r),i.g=wi(i.g),i.b=wi(i.b))),i},workingToColorSpace:function(i,r){return this.convert(i,this.workingColorSpace,r)},colorSpaceToWorking:function(i,r){return this.convert(i,r,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Cn?Ks:this.spaces[i].transfer},getLuminanceCoefficients:function(i,r=this.workingColorSpace){return i.fromArray(this.spaces[r].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,r,a){return i.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,r){return bi("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),s.workingToColorSpace(i,r)},toWorkingColorSpace:function(i,r){return bi("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),s.colorSpaceToWorking(i,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return s.define({[Di]:{primaries:t,whitePoint:n,transfer:Ks,toXYZ:yo,fromXYZ:So,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:He},outputColorSpaceConfig:{drawingBufferColorSpace:He}},[He]:{primaries:t,whitePoint:n,transfer:se,toXYZ:yo,fromXYZ:So,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:He}}}),s}const Qt=Ch();function xn(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function wi(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let oi;class Ah{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{oi===void 0&&(oi=ns("canvas")),oi.width=t.width,oi.height=t.height;const i=oi.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),n=oi}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=ns("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const i=n.getImageData(0,0,t.width,t.height),r=i.data;for(let a=0;a<r.length;a++)r[a]=xn(r[a]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(xn(e[n]/255)*255):e[n]=xn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Rh=0;class Ya{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Rh++}),this.uuid=ni(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?r.push(cr(i[a].image)):r.push(cr(i[a]))}else r=cr(i);n.url=r}return e||(t.images[this.uuid]=n),n}}function cr(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Ah.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Dh=0;const hr=new A;class Le extends ei{constructor(t=Le.DEFAULT_IMAGE,e=Le.DEFAULT_MAPPING,n=jn,i=jn,r=rn,a=$n,o=Je,l=an,c=Le.DEFAULT_ANISOTROPY,h=Cn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Dh++}),this.uuid=ni(),this.name="",this.source=new Ya(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new dt(0,0),this.repeat=new dt(1,1),this.center=new dt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new qt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(hr).x}get height(){return this.source.getSize(hr).y}get depth(){return this.source.getSize(hr).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){console.warn(`THREE.Texture.setValues(): property '${e}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Cl)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case te:t.x=t.x-Math.floor(t.x);break;case jn:t.x=t.x<0?0:1;break;case na:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case te:t.y=t.y-Math.floor(t.y);break;case jn:t.y=t.y<0?0:1;break;case na:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Le.DEFAULT_IMAGE=null;Le.DEFAULT_MAPPING=Cl;Le.DEFAULT_ANISOTROPY=1;class oe{constructor(t=0,e=0,n=0,i=1){oe.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*i+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*i+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*i+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*i+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,r;const l=t.elements,c=l[0],h=l[4],u=l[8],f=l[1],d=l[5],g=l[9],_=l[2],m=l[6],p=l[10];if(Math.abs(h-f)<.01&&Math.abs(u-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+d+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const M=(c+1)/2,x=(d+1)/2,w=(p+1)/2,b=(h+f)/4,R=(u+_)/4,L=(g+m)/4;return M>x&&M>w?M<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(M),i=b/n,r=R/n):x>w?x<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(x),n=b/i,r=L/i):w<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(w),n=R/r,i=L/r),this.set(n,i,r,e),this}let E=Math.sqrt((m-g)*(m-g)+(u-_)*(u-_)+(f-h)*(f-h));return Math.abs(E)<.001&&(E=1),this.x=(m-g)/E,this.y=(u-_)/E,this.z=(f-h)/E,this.w=Math.acos((c+d+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=jt(this.x,t.x,e.x),this.y=jt(this.y,t.y,e.y),this.z=jt(this.z,t.z,e.z),this.w=jt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=jt(this.x,t,e),this.y=jt(this.y,t,e),this.z=jt(this.z,t,e),this.w=jt(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(jt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Ph extends ei{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:rn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new oe(0,0,t,e),this.scissorTest=!1,this.viewport=new oe(0,0,t,e);const i={width:t,height:e,depth:n.depth},r=new Le(i);this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(t={}){const e={minFilter:rn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n,this.textures[i].isArrayTexture=this.textures[i].image.depth>1;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const i=Object.assign({},t.textures[e].image);this.textures[e].source=new Ya(i)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Qn extends Ph{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Bl extends Le{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Qe,this.minFilter=Qe,this.wrapR=jn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Lh extends Le{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Qe,this.minFilter=Qe,this.wrapR=jn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ii{constructor(t=new A(1/0,1/0,1/0),e=new A(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Ke.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Ke.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=Ke.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,Ke):Ke.fromBufferAttribute(r,a),Ke.applyMatrix4(t.matrixWorld),this.expandByPoint(Ke);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),ps.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ps.copy(n.boundingBox)),ps.applyMatrix4(t.matrixWorld),this.union(ps)}const i=t.children;for(let r=0,a=i.length;r<a;r++)this.expandByObject(i[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Ke),Ke.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Ui),ms.subVectors(this.max,Ui),li.subVectors(t.a,Ui),ci.subVectors(t.b,Ui),hi.subVectors(t.c,Ui),yn.subVectors(ci,li),Sn.subVectors(hi,ci),Nn.subVectors(li,hi);let e=[0,-yn.z,yn.y,0,-Sn.z,Sn.y,0,-Nn.z,Nn.y,yn.z,0,-yn.x,Sn.z,0,-Sn.x,Nn.z,0,-Nn.x,-yn.y,yn.x,0,-Sn.y,Sn.x,0,-Nn.y,Nn.x,0];return!ur(e,li,ci,hi,ms)||(e=[1,0,0,0,1,0,0,0,1],!ur(e,li,ci,hi,ms))?!1:(gs.crossVectors(yn,Sn),e=[gs.x,gs.y,gs.z],ur(e,li,ci,hi,ms))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Ke).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Ke).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(cn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),cn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),cn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),cn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),cn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),cn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),cn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),cn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(cn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const cn=[new A,new A,new A,new A,new A,new A,new A,new A],Ke=new A,ps=new ii,li=new A,ci=new A,hi=new A,yn=new A,Sn=new A,Nn=new A,Ui=new A,ms=new A,gs=new A,On=new A;function ur(s,t,e,n,i){for(let r=0,a=s.length-3;r<=a;r+=3){On.fromArray(s,r);const o=i.x*Math.abs(On.x)+i.y*Math.abs(On.y)+i.z*Math.abs(On.z),l=t.dot(On),c=e.dot(On),h=n.dot(On);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const Ih=new ii,Fi=new A,dr=new A;class tr{constructor(t=new A,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Ih.setFromPoints(t).getCenter(n);let i=0;for(let r=0,a=t.length;r<a;r++)i=Math.max(i,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Fi.subVectors(t,this.center);const e=Fi.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(Fi,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(dr.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Fi.copy(t.center).add(dr)),this.expandByPoint(Fi.copy(t.center).sub(dr))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}const hn=new A,fr=new A,_s=new A,Tn=new A,pr=new A,vs=new A,mr=new A;class er{constructor(t=new A,e=new A(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,hn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=hn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(hn.copy(this.origin).addScaledVector(this.direction,e),hn.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){fr.copy(t).add(e).multiplyScalar(.5),_s.copy(e).sub(t).normalize(),Tn.copy(this.origin).sub(fr);const r=t.distanceTo(e)*.5,a=-this.direction.dot(_s),o=Tn.dot(this.direction),l=-Tn.dot(_s),c=Tn.lengthSq(),h=Math.abs(1-a*a);let u,f,d,g;if(h>0)if(u=a*l-o,f=a*o-l,g=r*h,u>=0)if(f>=-g)if(f<=g){const _=1/h;u*=_,f*=_,d=u*(u+a*f+2*o)+f*(a*u+f+2*l)+c}else f=r,u=Math.max(0,-(a*f+o)),d=-u*u+f*(f+2*l)+c;else f=-r,u=Math.max(0,-(a*f+o)),d=-u*u+f*(f+2*l)+c;else f<=-g?(u=Math.max(0,-(-a*r+o)),f=u>0?-r:Math.min(Math.max(-r,-l),r),d=-u*u+f*(f+2*l)+c):f<=g?(u=0,f=Math.min(Math.max(-r,-l),r),d=f*(f+2*l)+c):(u=Math.max(0,-(a*r+o)),f=u>0?r:Math.min(Math.max(-r,-l),r),d=-u*u+f*(f+2*l)+c);else f=a>0?-r:r,u=Math.max(0,-(a*f+o)),d=-u*u+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(fr).addScaledVector(_s,f),d}intersectSphere(t,e){hn.subVectors(t.center,this.origin);const n=hn.dot(this.direction),i=hn.dot(hn)-n*n,r=t.radius*t.radius;if(i>r)return null;const a=Math.sqrt(r-i),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,r,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return c>=0?(n=(t.min.x-f.x)*c,i=(t.max.x-f.x)*c):(n=(t.max.x-f.x)*c,i=(t.min.x-f.x)*c),h>=0?(r=(t.min.y-f.y)*h,a=(t.max.y-f.y)*h):(r=(t.max.y-f.y)*h,a=(t.min.y-f.y)*h),n>a||r>i||((r>n||isNaN(n))&&(n=r),(a<i||isNaN(i))&&(i=a),u>=0?(o=(t.min.z-f.z)*u,l=(t.max.z-f.z)*u):(o=(t.max.z-f.z)*u,l=(t.min.z-f.z)*u),n>l||o>i)||((o>n||n!==n)&&(n=o),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,hn)!==null}intersectTriangle(t,e,n,i,r){pr.subVectors(e,t),vs.subVectors(n,t),mr.crossVectors(pr,vs);let a=this.direction.dot(mr),o;if(a>0){if(i)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Tn.subVectors(this.origin,t);const l=o*this.direction.dot(vs.crossVectors(Tn,vs));if(l<0)return null;const c=o*this.direction.dot(pr.cross(Tn));if(c<0||l+c>a)return null;const h=-o*Tn.dot(mr);return h<0?null:this.at(h/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ce{constructor(t,e,n,i,r,a,o,l,c,h,u,f,d,g,_,m){ce.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,a,o,l,c,h,u,f,d,g,_,m)}set(t,e,n,i,r,a,o,l,c,h,u,f,d,g,_,m){const p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=i,p[1]=r,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=h,p[10]=u,p[14]=f,p[3]=d,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ce().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,i=1/ui.setFromMatrixColumn(t,0).length(),r=1/ui.setFromMatrixColumn(t,1).length(),a=1/ui.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,i=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const f=a*h,d=a*u,g=o*h,_=o*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=d+g*c,e[5]=f-_*c,e[9]=-o*l,e[2]=_-f*c,e[6]=g+d*c,e[10]=a*l}else if(t.order==="YXZ"){const f=l*h,d=l*u,g=c*h,_=c*u;e[0]=f+_*o,e[4]=g*o-d,e[8]=a*c,e[1]=a*u,e[5]=a*h,e[9]=-o,e[2]=d*o-g,e[6]=_+f*o,e[10]=a*l}else if(t.order==="ZXY"){const f=l*h,d=l*u,g=c*h,_=c*u;e[0]=f-_*o,e[4]=-a*u,e[8]=g+d*o,e[1]=d+g*o,e[5]=a*h,e[9]=_-f*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){const f=a*h,d=a*u,g=o*h,_=o*u;e[0]=l*h,e[4]=g*c-d,e[8]=f*c+_,e[1]=l*u,e[5]=_*c+f,e[9]=d*c-g,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){const f=a*l,d=a*c,g=o*l,_=o*c;e[0]=l*h,e[4]=_-f*u,e[8]=g*u+d,e[1]=u,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=d*u+g,e[10]=f-_*u}else if(t.order==="XZY"){const f=a*l,d=a*c,g=o*l,_=o*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=f*u+_,e[5]=a*h,e[9]=d*u-g,e[2]=g*u-d,e[6]=o*h,e[10]=_*u+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Nh,t,Oh)}lookAt(t,e,n){const i=this.elements;return Be.subVectors(t,e),Be.lengthSq()===0&&(Be.z=1),Be.normalize(),En.crossVectors(n,Be),En.lengthSq()===0&&(Math.abs(n.z)===1?Be.x+=1e-4:Be.z+=1e-4,Be.normalize(),En.crossVectors(n,Be)),En.normalize(),xs.crossVectors(Be,En),i[0]=En.x,i[4]=xs.x,i[8]=Be.x,i[1]=En.y,i[5]=xs.y,i[9]=Be.y,i[2]=En.z,i[6]=xs.z,i[10]=Be.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],u=n[5],f=n[9],d=n[13],g=n[2],_=n[6],m=n[10],p=n[14],E=n[3],M=n[7],x=n[11],w=n[15],b=i[0],R=i[4],L=i[8],S=i[12],y=i[1],D=i[5],B=i[9],O=i[13],H=i[2],X=i[6],k=i[10],Q=i[14],F=i[3],$=i[7],ot=i[11],ft=i[15];return r[0]=a*b+o*y+l*H+c*F,r[4]=a*R+o*D+l*X+c*$,r[8]=a*L+o*B+l*k+c*ot,r[12]=a*S+o*O+l*Q+c*ft,r[1]=h*b+u*y+f*H+d*F,r[5]=h*R+u*D+f*X+d*$,r[9]=h*L+u*B+f*k+d*ot,r[13]=h*S+u*O+f*Q+d*ft,r[2]=g*b+_*y+m*H+p*F,r[6]=g*R+_*D+m*X+p*$,r[10]=g*L+_*B+m*k+p*ot,r[14]=g*S+_*O+m*Q+p*ft,r[3]=E*b+M*y+x*H+w*F,r[7]=E*R+M*D+x*X+w*$,r[11]=E*L+M*B+x*k+w*ot,r[15]=E*S+M*O+x*Q+w*ft,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],i=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],u=t[6],f=t[10],d=t[14],g=t[3],_=t[7],m=t[11],p=t[15];return g*(+r*l*u-i*c*u-r*o*f+n*c*f+i*o*d-n*l*d)+_*(+e*l*d-e*c*f+r*a*f-i*a*d+i*c*h-r*l*h)+m*(+e*c*u-e*o*d-r*a*u+n*a*d+r*o*h-n*c*h)+p*(-i*o*h-e*l*u+e*o*f+i*a*u-n*a*f+n*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=t[9],f=t[10],d=t[11],g=t[12],_=t[13],m=t[14],p=t[15],E=u*m*c-_*f*c+_*l*d-o*m*d-u*l*p+o*f*p,M=g*f*c-h*m*c-g*l*d+a*m*d+h*l*p-a*f*p,x=h*_*c-g*u*c+g*o*d-a*_*d-h*o*p+a*u*p,w=g*u*l-h*_*l-g*o*f+a*_*f+h*o*m-a*u*m,b=e*E+n*M+i*x+r*w;if(b===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const R=1/b;return t[0]=E*R,t[1]=(_*f*r-u*m*r-_*i*d+n*m*d+u*i*p-n*f*p)*R,t[2]=(o*m*r-_*l*r+_*i*c-n*m*c-o*i*p+n*l*p)*R,t[3]=(u*l*r-o*f*r-u*i*c+n*f*c+o*i*d-n*l*d)*R,t[4]=M*R,t[5]=(h*m*r-g*f*r+g*i*d-e*m*d-h*i*p+e*f*p)*R,t[6]=(g*l*r-a*m*r-g*i*c+e*m*c+a*i*p-e*l*p)*R,t[7]=(a*f*r-h*l*r+h*i*c-e*f*c-a*i*d+e*l*d)*R,t[8]=x*R,t[9]=(g*u*r-h*_*r-g*n*d+e*_*d+h*n*p-e*u*p)*R,t[10]=(a*_*r-g*o*r+g*n*c-e*_*c-a*n*p+e*o*p)*R,t[11]=(h*o*r-a*u*r-h*n*c+e*u*c+a*n*d-e*o*d)*R,t[12]=w*R,t[13]=(h*_*i-g*u*i+g*n*f-e*_*f-h*n*m+e*u*m)*R,t[14]=(g*o*i-a*_*i-g*n*l+e*_*l+a*n*m-e*o*m)*R,t[15]=(a*u*i-h*o*i+h*n*l-e*u*l-a*n*f+e*o*f)*R,this}scale(t){const e=this.elements,n=t.x,i=t.y,r=t.z;return e[0]*=n,e[4]*=i,e[8]*=r,e[1]*=n,e[5]*=i,e[9]*=r,e[2]*=n,e[6]*=i,e[10]*=r,e[3]*=n,e[7]*=i,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),i=Math.sin(e),r=1-n,a=t.x,o=t.y,l=t.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-i*l,c*l+i*o,0,c*o+i*l,h*o+n,h*l-i*a,0,c*l-i*o,h*l+i*a,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,r,a){return this.set(1,n,r,0,t,1,a,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){const i=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,h=a+a,u=o+o,f=r*c,d=r*h,g=r*u,_=a*h,m=a*u,p=o*u,E=l*c,M=l*h,x=l*u,w=n.x,b=n.y,R=n.z;return i[0]=(1-(_+p))*w,i[1]=(d+x)*w,i[2]=(g-M)*w,i[3]=0,i[4]=(d-x)*b,i[5]=(1-(f+p))*b,i[6]=(m+E)*b,i[7]=0,i[8]=(g+M)*R,i[9]=(m-E)*R,i[10]=(1-(f+_))*R,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){const i=this.elements;let r=ui.set(i[0],i[1],i[2]).length();const a=ui.set(i[4],i[5],i[6]).length(),o=ui.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),t.x=i[12],t.y=i[13],t.z=i[14],Ze.copy(this);const c=1/r,h=1/a,u=1/o;return Ze.elements[0]*=c,Ze.elements[1]*=c,Ze.elements[2]*=c,Ze.elements[4]*=h,Ze.elements[5]*=h,Ze.elements[6]*=h,Ze.elements[8]*=u,Ze.elements[9]*=u,Ze.elements[10]*=u,e.setFromRotationMatrix(Ze),n.x=r,n.y=a,n.z=o,this}makePerspective(t,e,n,i,r,a,o=_n){const l=this.elements,c=2*r/(e-t),h=2*r/(n-i),u=(e+t)/(e-t),f=(n+i)/(n-i);let d,g;if(o===_n)d=-(a+r)/(a-r),g=-2*a*r/(a-r);else if(o===Zs)d=-a/(a-r),g=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=d,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,i,r,a,o=_n){const l=this.elements,c=1/(e-t),h=1/(n-i),u=1/(a-r),f=(e+t)*c,d=(n+i)*h;let g,_;if(o===_n)g=(a+r)*u,_=-2*u;else if(o===Zs)g=r*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-d,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const ui=new A,Ze=new ce,Nh=new A(0,0,0),Oh=new A(1,1,1),En=new A,xs=new A,Be=new A,To=new ce,Eo=new tn;class en{constructor(t=0,e=0,n=0,i=en.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const i=t.elements,r=i[0],a=i[4],o=i[8],l=i[1],c=i[5],h=i[9],u=i[2],f=i[6],d=i[10];switch(e){case"XYZ":this._y=Math.asin(jt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-jt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(jt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-jt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(jt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,d));break;case"XZY":this._z=Math.asin(-jt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return To.makeRotationFromQuaternion(t),this.setFromRotationMatrix(To,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Eo.setFromEuler(this),this.setFromQuaternion(Eo,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}en.DEFAULT_ORDER="XYZ";class qa{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Uh=0;const bo=new A,di=new tn,un=new ce,Ms=new A,Bi=new A,Fh=new A,Bh=new tn,wo=new A(1,0,0),Co=new A(0,1,0),Ao=new A(0,0,1),Ro={type:"added"},kh={type:"removed"},fi={type:"childadded",child:null},gr={type:"childremoved",child:null};class ae extends ei{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Uh++}),this.uuid=ni(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ae.DEFAULT_UP.clone();const t=new A,e=new en,n=new tn,i=new A(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new ce},normalMatrix:{value:new qt}}),this.matrix=new ce,this.matrixWorld=new ce,this.matrixAutoUpdate=ae.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ae.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new qa,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return di.setFromAxisAngle(t,e),this.quaternion.multiply(di),this}rotateOnWorldAxis(t,e){return di.setFromAxisAngle(t,e),this.quaternion.premultiply(di),this}rotateX(t){return this.rotateOnAxis(wo,t)}rotateY(t){return this.rotateOnAxis(Co,t)}rotateZ(t){return this.rotateOnAxis(Ao,t)}translateOnAxis(t,e){return bo.copy(t).applyQuaternion(this.quaternion),this.position.add(bo.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(wo,t)}translateY(t){return this.translateOnAxis(Co,t)}translateZ(t){return this.translateOnAxis(Ao,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(un.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Ms.copy(t):Ms.set(t,e,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Bi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?un.lookAt(Bi,Ms,this.up):un.lookAt(Ms,Bi,this.up),this.quaternion.setFromRotationMatrix(un),i&&(un.extractRotation(i.matrixWorld),di.setFromRotationMatrix(un),this.quaternion.premultiply(di.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Ro),fi.child=t,this.dispatchEvent(fi),fi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(kh),gr.child=t,this.dispatchEvent(gr),gr.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),un.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),un.multiply(t.parent.matrixWorld)),t.applyMatrix4(un),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Ro),fi.child=t,this.dispatchEvent(fi),fi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){const a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Bi,t,Fh),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Bi,Bh,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(o=>({...o})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(t),i.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];r(t.shapes,u)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));i.material=o}else i.material=r(t.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];i.animations.push(r(t.animations,l))}}if(e){const o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),u=a(t.shapes),f=a(t.skeletons),d=a(t.animations),g=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),g.length>0&&(n.nodes=g)}return n.object=i,n;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const i=t.children[n];this.add(i.clone())}return this}}ae.DEFAULT_UP=new A(0,1,0);ae.DEFAULT_MATRIX_AUTO_UPDATE=!0;ae.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const je=new A,dn=new A,_r=new A,fn=new A,pi=new A,mi=new A,Do=new A,vr=new A,xr=new A,Mr=new A,yr=new oe,Sr=new oe,Tr=new oe;class $e{constructor(t=new A,e=new A,n=new A){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),je.subVectors(t,e),i.cross(je);const r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(t,e,n,i,r){je.subVectors(i,e),dn.subVectors(n,e),_r.subVectors(t,e);const a=je.dot(je),o=je.dot(dn),l=je.dot(_r),c=dn.dot(dn),h=dn.dot(_r),u=a*c-o*o;if(u===0)return r.set(0,0,0),null;const f=1/u,d=(c*l-o*h)*f,g=(a*h-o*l)*f;return r.set(1-d-g,g,d)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,fn)===null?!1:fn.x>=0&&fn.y>=0&&fn.x+fn.y<=1}static getInterpolation(t,e,n,i,r,a,o,l){return this.getBarycoord(t,e,n,i,fn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,fn.x),l.addScaledVector(a,fn.y),l.addScaledVector(o,fn.z),l)}static getInterpolatedAttribute(t,e,n,i,r,a){return yr.setScalar(0),Sr.setScalar(0),Tr.setScalar(0),yr.fromBufferAttribute(t,e),Sr.fromBufferAttribute(t,n),Tr.fromBufferAttribute(t,i),a.setScalar(0),a.addScaledVector(yr,r.x),a.addScaledVector(Sr,r.y),a.addScaledVector(Tr,r.z),a}static isFrontFacing(t,e,n,i){return je.subVectors(n,e),dn.subVectors(t,e),je.cross(dn).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return je.subVectors(this.c,this.b),dn.subVectors(this.a,this.b),je.cross(dn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return $e.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return $e.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,r){return $e.getInterpolation(t,this.a,this.b,this.c,e,n,i,r)}containsPoint(t){return $e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return $e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,i=this.b,r=this.c;let a,o;pi.subVectors(i,n),mi.subVectors(r,n),vr.subVectors(t,n);const l=pi.dot(vr),c=mi.dot(vr);if(l<=0&&c<=0)return e.copy(n);xr.subVectors(t,i);const h=pi.dot(xr),u=mi.dot(xr);if(h>=0&&u<=h)return e.copy(i);const f=l*u-h*c;if(f<=0&&l>=0&&h<=0)return a=l/(l-h),e.copy(n).addScaledVector(pi,a);Mr.subVectors(t,r);const d=pi.dot(Mr),g=mi.dot(Mr);if(g>=0&&d<=g)return e.copy(r);const _=d*c-l*g;if(_<=0&&c>=0&&g<=0)return o=c/(c-g),e.copy(n).addScaledVector(mi,o);const m=h*g-d*u;if(m<=0&&u-h>=0&&d-g>=0)return Do.subVectors(r,i),o=(u-h)/(u-h+(d-g)),e.copy(i).addScaledVector(Do,o);const p=1/(m+_+f);return a=_*p,o=f*p,e.copy(n).addScaledVector(pi,a).addScaledVector(mi,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const kl={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},bn={h:0,s:0,l:0},ys={h:0,s:0,l:0};function Er(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s}class Kt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=He){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Qt.colorSpaceToWorking(this,e),this}setRGB(t,e,n,i=Qt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Qt.colorSpaceToWorking(this,i),this}setHSL(t,e,n,i=Qt.workingColorSpace){if(t=Xa(t,1),e=jt(e,0,1),n=jt(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=Er(a,r,t+1/3),this.g=Er(a,r,t),this.b=Er(a,r,t-1/3)}return Qt.colorSpaceToWorking(this,i),this}setStyle(t,e=He){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=i[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=He){const n=kl[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=xn(t.r),this.g=xn(t.g),this.b=xn(t.b),this}copyLinearToSRGB(t){return this.r=wi(t.r),this.g=wi(t.g),this.b=wi(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=He){return Qt.workingToColorSpace(we.copy(this),t),Math.round(jt(we.r*255,0,255))*65536+Math.round(jt(we.g*255,0,255))*256+Math.round(jt(we.b*255,0,255))}getHexString(t=He){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Qt.workingColorSpace){Qt.workingToColorSpace(we.copy(this),e);const n=we.r,i=we.g,r=we.b,a=Math.max(n,i,r),o=Math.min(n,i,r);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const u=a-o;switch(c=h<=.5?u/(a+o):u/(2-a-o),a){case n:l=(i-r)/u+(i<r?6:0);break;case i:l=(r-n)/u+2;break;case r:l=(n-i)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=Qt.workingColorSpace){return Qt.workingToColorSpace(we.copy(this),e),t.r=we.r,t.g=we.g,t.b=we.b,t}getStyle(t=He){Qt.workingToColorSpace(we.copy(this),t);const e=we.r,n=we.g,i=we.b;return t!==He?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(bn),this.setHSL(bn.h+t,bn.s+e,bn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(bn),t.getHSL(ys);const n=Ki(bn.h,ys.h,e),i=Ki(bn.s,ys.s,e),r=Ki(bn.l,ys.l,e);return this.setHSL(n,i,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,i=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*i,this.g=r[1]*e+r[4]*n+r[7]*i,this.b=r[2]*e+r[5]*n+r[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const we=new Kt;Kt.NAMES=kl;let zh=0;class si extends ei{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:zh++}),this.uuid=ni(),this.name="",this.type="Material",this.blending=Ei,this.side=Dn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Xr,this.blendDst=Yr,this.blendEquation=qn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Kt(0,0,0),this.blendAlpha=0,this.depthFunc=Ci,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=mo,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ai,this.stencilZFail=ai,this.stencilZPass=ai,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ei&&(n.blending=this.blending),this.side!==Dn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Xr&&(n.blendSrc=this.blendSrc),this.blendDst!==Yr&&(n.blendDst=this.blendDst),this.blendEquation!==qn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ci&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==mo&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ai&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ai&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ai&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(e){const r=i(t.textures),a=i(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const i=e.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class Oe extends si{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Kt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new en,this.combine=Fa,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const ge=new A,Ss=new dt;let Hh=0;class xe{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Hh++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=go,this.updateRanges=[],this.gpuType=gn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Ss.fromBufferAttribute(this,e),Ss.applyMatrix3(t),this.setXY(e,Ss.x,Ss.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)ge.fromBufferAttribute(this,e),ge.applyMatrix3(t),this.setXYZ(e,ge.x,ge.y,ge.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)ge.fromBufferAttribute(this,e),ge.applyMatrix4(t),this.setXYZ(e,ge.x,ge.y,ge.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)ge.fromBufferAttribute(this,e),ge.applyNormalMatrix(t),this.setXYZ(e,ge.x,ge.y,ge.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)ge.fromBufferAttribute(this,e),ge.transformDirection(t),this.setXYZ(e,ge.x,ge.y,ge.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Mi(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Re(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Mi(e,this.array)),e}setX(t,e){return this.normalized&&(e=Re(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Mi(e,this.array)),e}setY(t,e){return this.normalized&&(e=Re(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Mi(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Re(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Mi(e,this.array)),e}setW(t,e){return this.normalized&&(e=Re(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Re(e,this.array),n=Re(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=Re(e,this.array),n=Re(n,this.array),i=Re(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t*=this.itemSize,this.normalized&&(e=Re(e,this.array),n=Re(n,this.array),i=Re(i,this.array),r=Re(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==go&&(t.usage=this.usage),t}}class zl extends xe{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Hl extends xe{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class pe extends xe{constructor(t,e,n){super(new Float32Array(t),e,n)}}let Vh=0;const Xe=new ce,br=new ae,gi=new A,ke=new ii,ki=new ii,Se=new A;class Te extends ei{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Vh++}),this.uuid=ni(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Fl(t)?Hl:zl)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new qt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Xe.makeRotationFromQuaternion(t),this.applyMatrix4(Xe),this}rotateX(t){return Xe.makeRotationX(t),this.applyMatrix4(Xe),this}rotateY(t){return Xe.makeRotationY(t),this.applyMatrix4(Xe),this}rotateZ(t){return Xe.makeRotationZ(t),this.applyMatrix4(Xe),this}translate(t,e,n){return Xe.makeTranslation(t,e,n),this.applyMatrix4(Xe),this}scale(t,e,n){return Xe.makeScale(t,e,n),this.applyMatrix4(Xe),this}lookAt(t){return br.lookAt(t),br.updateMatrix(),this.applyMatrix4(br.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(gi).negate(),this.translate(gi.x,gi.y,gi.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let i=0,r=t.length;i<r;i++){const a=t[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new pe(n,3))}else{const n=Math.min(t.length,e.count);for(let i=0;i<n;i++){const r=t[i];e.setXYZ(i,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ii);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new A(-1/0,-1/0,-1/0),new A(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){const r=e[n];ke.setFromBufferAttribute(r),this.morphTargetsRelative?(Se.addVectors(this.boundingBox.min,ke.min),this.boundingBox.expandByPoint(Se),Se.addVectors(this.boundingBox.max,ke.max),this.boundingBox.expandByPoint(Se)):(this.boundingBox.expandByPoint(ke.min),this.boundingBox.expandByPoint(ke.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new tr);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new A,1/0);return}if(t){const n=this.boundingSphere.center;if(ke.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const o=e[r];ki.setFromBufferAttribute(o),this.morphTargetsRelative?(Se.addVectors(ke.min,ki.min),ke.expandByPoint(Se),Se.addVectors(ke.max,ki.max),ke.expandByPoint(Se)):(ke.expandByPoint(ki.min),ke.expandByPoint(ki.max))}ke.getCenter(n);let i=0;for(let r=0,a=t.count;r<a;r++)Se.fromBufferAttribute(t,r),i=Math.max(i,n.distanceToSquared(Se));if(e)for(let r=0,a=e.length;r<a;r++){const o=e[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Se.fromBufferAttribute(o,c),l&&(gi.fromBufferAttribute(t,c),Se.add(gi)),i=Math.max(i,n.distanceToSquared(Se))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,i=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new xe(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let L=0;L<n.count;L++)o[L]=new A,l[L]=new A;const c=new A,h=new A,u=new A,f=new dt,d=new dt,g=new dt,_=new A,m=new A;function p(L,S,y){c.fromBufferAttribute(n,L),h.fromBufferAttribute(n,S),u.fromBufferAttribute(n,y),f.fromBufferAttribute(r,L),d.fromBufferAttribute(r,S),g.fromBufferAttribute(r,y),h.sub(c),u.sub(c),d.sub(f),g.sub(f);const D=1/(d.x*g.y-g.x*d.y);isFinite(D)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(u,-d.y).multiplyScalar(D),m.copy(u).multiplyScalar(d.x).addScaledVector(h,-g.x).multiplyScalar(D),o[L].add(_),o[S].add(_),o[y].add(_),l[L].add(m),l[S].add(m),l[y].add(m))}let E=this.groups;E.length===0&&(E=[{start:0,count:t.count}]);for(let L=0,S=E.length;L<S;++L){const y=E[L],D=y.start,B=y.count;for(let O=D,H=D+B;O<H;O+=3)p(t.getX(O+0),t.getX(O+1),t.getX(O+2))}const M=new A,x=new A,w=new A,b=new A;function R(L){w.fromBufferAttribute(i,L),b.copy(w);const S=o[L];M.copy(S),M.sub(w.multiplyScalar(w.dot(S))).normalize(),x.crossVectors(b,S);const D=x.dot(l[L])<0?-1:1;a.setXYZW(L,M.x,M.y,M.z,D)}for(let L=0,S=E.length;L<S;++L){const y=E[L],D=y.start,B=y.count;for(let O=D,H=D+B;O<H;O+=3)R(t.getX(O+0)),R(t.getX(O+1)),R(t.getX(O+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new xe(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);const i=new A,r=new A,a=new A,o=new A,l=new A,c=new A,h=new A,u=new A;if(t)for(let f=0,d=t.count;f<d;f+=3){const g=t.getX(f+0),_=t.getX(f+1),m=t.getX(f+2);i.fromBufferAttribute(e,g),r.fromBufferAttribute(e,_),a.fromBufferAttribute(e,m),h.subVectors(a,r),u.subVectors(i,r),h.cross(u),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,m),o.add(h),l.add(h),c.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,d=e.count;f<d;f+=3)i.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),a.fromBufferAttribute(e,f+2),h.subVectors(a,r),u.subVectors(i,r),h.cross(u),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Se.fromBufferAttribute(t,e),Se.normalize(),t.setXYZ(e,Se.x,Se.y,Se.z)}toNonIndexed(){function t(o,l){const c=o.array,h=o.itemSize,u=o.normalized,f=new c.constructor(l.length*h);let d=0,g=0;for(let _=0,m=l.length;_<m;_++){o.isInterleavedBufferAttribute?d=l[_]*o.data.stride+o.offset:d=l[_]*h;for(let p=0;p<h;p++)f[g++]=c[d++]}return new xe(f,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Te,n=this.index.array,i=this.attributes;for(const o in i){const l=i[o],c=t(l,n);e.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let h=0,u=c.length;h<u;h++){const f=c[h],d=t(f,n);l.push(d)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const i={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,f=c.length;u<f;u++){const d=c[u];h.push(d.toJSON(t.data))}h.length>0&&(i[l]=h,r=!0)}r&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone());const i=t.attributes;for(const c in i){const h=i[c];this.setAttribute(c,h.clone(e))}const r=t.morphAttributes;for(const c in r){const h=[],u=r[c];for(let f=0,d=u.length;f<d;f++)h.push(u[f].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let c=0,h=a.length;c<h;c++){const u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Po=new ce,Un=new er,Ts=new tr,Lo=new A,Es=new A,bs=new A,ws=new A,wr=new A,Cs=new A,Io=new A,As=new A;class Et extends ae{constructor(t=new Te,e=new Oe){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(i,t);const o=this.morphTargetInfluences;if(r&&o){Cs.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=o[l],u=r[l];h!==0&&(wr.fromBufferAttribute(u,t),a?Cs.addScaledVector(wr,h):Cs.addScaledVector(wr.sub(e),h))}e.add(Cs)}return e}raycast(t,e){const n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ts.copy(n.boundingSphere),Ts.applyMatrix4(r),Un.copy(t.ray).recast(t.near),!(Ts.containsPoint(Un.origin)===!1&&(Un.intersectSphere(Ts,Lo)===null||Un.origin.distanceToSquared(Lo)>(t.far-t.near)**2))&&(Po.copy(r).invert(),Un.copy(t.ray).applyMatrix4(Po),!(n.boundingBox!==null&&Un.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Un)))}_computeIntersections(t,e,n){let i;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,d=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,_=f.length;g<_;g++){const m=f[g],p=a[m.materialIndex],E=Math.max(m.start,d.start),M=Math.min(o.count,Math.min(m.start+m.count,d.start+d.count));for(let x=E,w=M;x<w;x+=3){const b=o.getX(x),R=o.getX(x+1),L=o.getX(x+2);i=Rs(this,p,t,n,c,h,u,b,R,L),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{const g=Math.max(0,d.start),_=Math.min(o.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){const E=o.getX(m),M=o.getX(m+1),x=o.getX(m+2);i=Rs(this,a,t,n,c,h,u,E,M,x),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,_=f.length;g<_;g++){const m=f[g],p=a[m.materialIndex],E=Math.max(m.start,d.start),M=Math.min(l.count,Math.min(m.start+m.count,d.start+d.count));for(let x=E,w=M;x<w;x+=3){const b=x,R=x+1,L=x+2;i=Rs(this,p,t,n,c,h,u,b,R,L),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{const g=Math.max(0,d.start),_=Math.min(l.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){const E=m,M=m+1,x=m+2;i=Rs(this,a,t,n,c,h,u,E,M,x),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}}}function Gh(s,t,e,n,i,r,a,o){let l;if(t.side===Ce?l=n.intersectTriangle(a,r,i,!0,o):l=n.intersectTriangle(i,r,a,t.side===Dn,o),l===null)return null;As.copy(o),As.applyMatrix4(s.matrixWorld);const c=e.ray.origin.distanceTo(As);return c<e.near||c>e.far?null:{distance:c,point:As.clone(),object:s}}function Rs(s,t,e,n,i,r,a,o,l,c){s.getVertexPosition(o,Es),s.getVertexPosition(l,bs),s.getVertexPosition(c,ws);const h=Gh(s,t,e,n,Es,bs,ws,Io);if(h){const u=new A;$e.getBarycoord(Io,Es,bs,ws,u),i&&(h.uv=$e.getInterpolatedAttribute(i,o,l,c,u,new dt)),r&&(h.uv1=$e.getInterpolatedAttribute(r,o,l,c,u,new dt)),a&&(h.normal=$e.getInterpolatedAttribute(a,o,l,c,u,new A),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const f={a:o,b:l,c,normal:new A,materialIndex:0};$e.getNormal(Es,bs,ws,f.normal),h.face=f,h.barycoord=u}return h}class Xt extends Te{constructor(t=1,e=1,n=1,i=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:r,depthSegments:a};const o=this;i=Math.floor(i),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],h=[],u=[];let f=0,d=0;g("z","y","x",-1,-1,n,e,t,a,r,0),g("z","y","x",1,-1,n,e,-t,a,r,1),g("x","z","y",1,1,t,n,e,i,a,2),g("x","z","y",1,-1,t,n,-e,i,a,3),g("x","y","z",1,-1,t,e,n,i,r,4),g("x","y","z",-1,-1,t,e,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new pe(c,3)),this.setAttribute("normal",new pe(h,3)),this.setAttribute("uv",new pe(u,2));function g(_,m,p,E,M,x,w,b,R,L,S){const y=x/R,D=w/L,B=x/2,O=w/2,H=b/2,X=R+1,k=L+1;let Q=0,F=0;const $=new A;for(let ot=0;ot<k;ot++){const ft=ot*D-O;for(let Dt=0;Dt<X;Dt++){const Ut=Dt*y-B;$[_]=Ut*E,$[m]=ft*M,$[p]=H,c.push($.x,$.y,$.z),$[_]=0,$[m]=0,$[p]=b>0?1:-1,h.push($.x,$.y,$.z),u.push(Dt/R),u.push(1-ot/L),Q+=1}}for(let ot=0;ot<L;ot++)for(let ft=0;ft<R;ft++){const Dt=f+ft+X*ot,Ut=f+ft+X*(ot+1),W=f+(ft+1)+X*(ot+1),tt=f+(ft+1)+X*ot;l.push(Dt,Ut,tt),l.push(Ut,W,tt),F+=6}o.addGroup(d,F,S),d+=F,f+=Q}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Xt(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Li(s){const t={};for(const e in s){t[e]={};for(const n in s[e]){const i=s[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function De(s){const t={};for(let e=0;e<s.length;e++){const n=Li(s[e]);for(const i in n)t[i]=n[i]}return t}function Wh(s){const t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t}function Vl(s){const t=s.getRenderTarget();return t===null?s.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Qt.workingColorSpace}const Xh={clone:Li,merge:De};var Yh=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,qh=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Pn extends si{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Yh,this.fragmentShader=qh,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Li(t.uniforms),this.uniformsGroups=Wh(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const i in this.uniforms){const a=this.uniforms[i].value;a&&a.isTexture?e.uniforms[i]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[i]={type:"m4",value:a.toArray()}:e.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Gl extends ae{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ce,this.projectionMatrix=new ce,this.projectionMatrixInverse=new ce,this.coordinateSystem=_n}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const wn=new A,No=new dt,Oo=new dt;class Ue extends Gl{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Pi*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(qi*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Pi*2*Math.atan(Math.tan(qi*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){wn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(wn.x,wn.y).multiplyScalar(-t/wn.z),wn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(wn.x,wn.y).multiplyScalar(-t/wn.z)}getViewSize(t,e){return this.getViewBounds(t,No,Oo),e.subVectors(Oo,No)}setViewOffset(t,e,n,i,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(qi*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,r=-.5*i;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*i/l,e-=a.offsetY*n/c,i*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const _i=-90,vi=1;class Kh extends ae{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new Ue(_i,vi,t,e);i.layers=this.layers,this.add(i);const r=new Ue(_i,vi,t,e);r.layers=this.layers,this.add(r);const a=new Ue(_i,vi,t,e);a.layers=this.layers,this.add(a);const o=new Ue(_i,vi,t,e);o.layers=this.layers,this.add(o);const l=new Ue(_i,vi,t,e);l.layers=this.layers,this.add(l);const c=new Ue(_i,vi,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,i,r,a,o,l]=e;for(const c of e)this.remove(c);if(t===_n)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Zs)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,h]=this.children,u=t.getRenderTarget(),f=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,i),t.render(e,r),t.setRenderTarget(n,1,i),t.render(e,a),t.setRenderTarget(n,2,i),t.render(e,o),t.setRenderTarget(n,3,i),t.render(e,l),t.setRenderTarget(n,4,i),t.render(e,c),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,i),t.render(e,h),t.setRenderTarget(u,f,d),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Wl extends Le{constructor(t=[],e=Ai,n,i,r,a,o,l,c,h){super(t,e,n,i,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Zh extends Qn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new Wl(i),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new Xt(5,5,5),r=new Pn({name:"CubemapFromEquirect",uniforms:Li(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ce,blending:An});r.uniforms.tEquirect.value=e;const a=new Et(i,r),o=e.minFilter;return e.minFilter===$n&&(e.minFilter=rn),new Kh(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,n=!0,i=!0){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,i);t.setRenderTarget(r)}}class vn extends ae{constructor(){super(),this.isGroup=!0,this.type="Group"}}const jh={type:"move"};class Cr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new vn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new vn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new A,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new A),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new vn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new A,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new A),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(const _ of t.hand.values()){const m=e.getJointPose(_,n),p=this._getHandJoint(c,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],f=h.position.distanceTo(u.position),d=.02,g=.005;c.inputState.pinching&&f>d+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&f<=d-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(jh)))}return o!==null&&(o.visible=i!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new vn;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}class $h extends ae{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new en,this.environmentIntensity=1,this.environmentRotation=new en,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}const Ar=new A,Jh=new A,Qh=new qt;class Ve{constructor(t=new A(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const i=Ar.subVectors(n,e).cross(Jh.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(Ar),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Qh.getNormalMatrix(t),i=this.coplanarPoint(Ar).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Fn=new tr,Ds=new A;class Ka{constructor(t=new Ve,e=new Ve,n=new Ve,i=new Ve,r=new Ve,a=new Ve){this.planes=[t,e,n,i,r,a]}set(t,e,n,i,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(i),o[4].copy(r),o[5].copy(a),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=_n){const n=this.planes,i=t.elements,r=i[0],a=i[1],o=i[2],l=i[3],c=i[4],h=i[5],u=i[6],f=i[7],d=i[8],g=i[9],_=i[10],m=i[11],p=i[12],E=i[13],M=i[14],x=i[15];if(n[0].setComponents(l-r,f-c,m-d,x-p).normalize(),n[1].setComponents(l+r,f+c,m+d,x+p).normalize(),n[2].setComponents(l+a,f+h,m+g,x+E).normalize(),n[3].setComponents(l-a,f-h,m-g,x-E).normalize(),n[4].setComponents(l-o,f-u,m-_,x-M).normalize(),e===_n)n[5].setComponents(l+o,f+u,m+_,x+M).normalize();else if(e===Zs)n[5].setComponents(o,u,_,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Fn.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Fn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Fn)}intersectsSprite(t){return Fn.center.set(0,0,0),Fn.radius=.7071067811865476,Fn.applyMatrix4(t.matrixWorld),this.intersectsSphere(Fn)}intersectsSphere(t){const e=this.planes,n=t.center,i=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const i=e[n];if(Ds.x=i.normal.x>0?t.max.x:t.min.x,Ds.y=i.normal.y>0?t.max.y:t.min.y,Ds.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(Ds)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Xl extends si{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Kt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const js=new A,$s=new A,Uo=new ce,zi=new er,Ps=new tr,Rr=new A,Fo=new A;class tu extends ae{constructor(t=new Te,e=new Xl){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let i=1,r=e.count;i<r;i++)js.fromBufferAttribute(e,i-1),$s.fromBufferAttribute(e,i),n[i]=n[i-1],n[i]+=js.distanceTo($s);t.setAttribute("lineDistance",new pe(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,i=this.matrixWorld,r=t.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ps.copy(n.boundingSphere),Ps.applyMatrix4(i),Ps.radius+=r,t.ray.intersectsSphere(Ps)===!1)return;Uo.copy(i).invert(),zi.copy(t.ray).applyMatrix4(Uo);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=n.index,f=n.attributes.position;if(h!==null){const d=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let _=d,m=g-1;_<m;_+=c){const p=h.getX(_),E=h.getX(_+1),M=Ls(this,t,zi,l,p,E,_);M&&e.push(M)}if(this.isLineLoop){const _=h.getX(g-1),m=h.getX(d),p=Ls(this,t,zi,l,_,m,g-1);p&&e.push(p)}}else{const d=Math.max(0,a.start),g=Math.min(f.count,a.start+a.count);for(let _=d,m=g-1;_<m;_+=c){const p=Ls(this,t,zi,l,_,_+1,_);p&&e.push(p)}if(this.isLineLoop){const _=Ls(this,t,zi,l,g-1,d,g-1);_&&e.push(_)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Ls(s,t,e,n,i,r,a){const o=s.geometry.attributes.position;if(js.fromBufferAttribute(o,i),$s.fromBufferAttribute(o,r),e.distanceSqToSegment(js,$s,Rr,Fo)>n)return;Rr.applyMatrix4(s.matrixWorld);const c=t.ray.origin.distanceTo(Rr);if(!(c<t.near||c>t.far))return{distance:c,point:Fo.clone().applyMatrix4(s.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:s}}class Yl extends Le{constructor(t,e,n=Jn,i,r,a,o=Qe,l=Qe,c,h=ts,u=1){if(h!==ts&&h!==es)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:t,height:e,depth:u};super(f,i,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Ya(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class is extends Te{constructor(t=1,e=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:i},e=Math.max(3,e);const r=[],a=[],o=[],l=[],c=new A,h=new dt;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let u=0,f=3;u<=e;u++,f+=3){const d=n+u/e*i;c.x=t*Math.cos(d),c.y=t*Math.sin(d),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[f]/t+1)/2,h.y=(a[f+1]/t+1)/2,l.push(h.x,h.y)}for(let u=1;u<=e;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new pe(a,3)),this.setAttribute("normal",new pe(o,3)),this.setAttribute("uv",new pe(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new is(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class sn extends Te{constructor(t=1,e=1,n=1,i=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const c=this;i=Math.floor(i),r=Math.floor(r);const h=[],u=[],f=[],d=[];let g=0;const _=[],m=n/2;let p=0;E(),a===!1&&(t>0&&M(!0),e>0&&M(!1)),this.setIndex(h),this.setAttribute("position",new pe(u,3)),this.setAttribute("normal",new pe(f,3)),this.setAttribute("uv",new pe(d,2));function E(){const x=new A,w=new A;let b=0;const R=(e-t)/n;for(let L=0;L<=r;L++){const S=[],y=L/r,D=y*(e-t)+t;for(let B=0;B<=i;B++){const O=B/i,H=O*l+o,X=Math.sin(H),k=Math.cos(H);w.x=D*X,w.y=-y*n+m,w.z=D*k,u.push(w.x,w.y,w.z),x.set(X,R,k).normalize(),f.push(x.x,x.y,x.z),d.push(O,1-y),S.push(g++)}_.push(S)}for(let L=0;L<i;L++)for(let S=0;S<r;S++){const y=_[S][L],D=_[S+1][L],B=_[S+1][L+1],O=_[S][L+1];(t>0||S!==0)&&(h.push(y,D,O),b+=3),(e>0||S!==r-1)&&(h.push(D,B,O),b+=3)}c.addGroup(p,b,0),p+=b}function M(x){const w=g,b=new dt,R=new A;let L=0;const S=x===!0?t:e,y=x===!0?1:-1;for(let B=1;B<=i;B++)u.push(0,m*y,0),f.push(0,y,0),d.push(.5,.5),g++;const D=g;for(let B=0;B<=i;B++){const H=B/i*l+o,X=Math.cos(H),k=Math.sin(H);R.x=S*k,R.y=m*y,R.z=S*X,u.push(R.x,R.y,R.z),f.push(0,y,0),b.x=X*.5+.5,b.y=k*.5*y+.5,d.push(b.x,b.y),g++}for(let B=0;B<i;B++){const O=w+B,H=D+B;x===!0?h.push(H,H+1,O):h.push(H+1,H,O),L+=3}c.addGroup(p,L,x===!0?1:2),p+=L}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new sn(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class on{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,i=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)n=this.getPoint(a/t),r+=n.distanceTo(i),e.push(r),i=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){const n=this.getLengths();let i=0;const r=n.length;let a;e?a=e:a=t*n[r-1];let o=0,l=r-1,c;for(;o<=l;)if(i=Math.floor(o+(l-o)/2),c=n[i]-a,c<0)o=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===a)return i/(r-1);const h=n[i],f=n[i+1]-h,d=(a-h)/f;return(i+d)/(r-1)}getTangent(t,e){let i=t-1e-4,r=t+1e-4;i<0&&(i=0),r>1&&(r=1);const a=this.getPoint(i),o=this.getPoint(r),l=e||(a.isVector2?new dt:new A);return l.copy(o).sub(a).normalize(),l}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){const n=new A,i=[],r=[],a=[],o=new A,l=new ce;for(let d=0;d<=t;d++){const g=d/t;i[d]=this.getTangentAt(g,new A)}r[0]=new A,a[0]=new A;let c=Number.MAX_VALUE;const h=Math.abs(i[0].x),u=Math.abs(i[0].y),f=Math.abs(i[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),f<=c&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],o),a[0].crossVectors(i[0],r[0]);for(let d=1;d<=t;d++){if(r[d]=r[d-1].clone(),a[d]=a[d-1].clone(),o.crossVectors(i[d-1],i[d]),o.length()>Number.EPSILON){o.normalize();const g=Math.acos(jt(i[d-1].dot(i[d]),-1,1));r[d].applyMatrix4(l.makeRotationAxis(o,g))}a[d].crossVectors(i[d],r[d])}if(e===!0){let d=Math.acos(jt(r[0].dot(r[t]),-1,1));d/=t,i[0].dot(o.crossVectors(r[0],r[t]))>0&&(d=-d);for(let g=1;g<=t;g++)r[g].applyMatrix4(l.makeRotationAxis(i[g],d*g)),a[g].crossVectors(i[g],r[g])}return{tangents:i,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class Za extends on{constructor(t=0,e=0,n=1,i=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(t,e=new dt){const n=e,i=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(a?r=0:r=i),this.aClockwise===!0&&!a&&(r===i?r=-i:r=r-i);const o=this.aStartAngle+t*r;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),f=l-this.aX,d=c-this.aY;l=f*h-d*u+this.aX,c=f*u+d*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class eu extends Za{constructor(t,e,n,i,r,a){super(t,e,n,n,i,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function ja(){let s=0,t=0,e=0,n=0;function i(r,a,o,l){s=r,t=o,e=-3*r+3*a-2*o-l,n=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){i(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,h,u){let f=(a-r)/c-(o-r)/(c+h)+(o-a)/h,d=(o-a)/h-(l-a)/(h+u)+(l-o)/u;f*=h,d*=h,i(a,o,f,d)},calc:function(r){const a=r*r,o=a*r;return s+t*r+e*a+n*o}}}const Is=new A,Dr=new ja,Pr=new ja,Lr=new ja;class nu extends on{constructor(t=[],e=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=i}getPoint(t,e=new A){const n=e,i=this.points,r=i.length,a=(r-(this.closed?0:1))*t;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,h;this.closed||o>0?c=i[(o-1)%r]:(Is.subVectors(i[0],i[1]).add(i[0]),c=Is);const u=i[o%r],f=i[(o+1)%r];if(this.closed||o+2<r?h=i[(o+2)%r]:(Is.subVectors(i[r-1],i[r-2]).add(i[r-1]),h=Is),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(u),d),_=Math.pow(u.distanceToSquared(f),d),m=Math.pow(f.distanceToSquared(h),d);_<1e-4&&(_=1),g<1e-4&&(g=_),m<1e-4&&(m=_),Dr.initNonuniformCatmullRom(c.x,u.x,f.x,h.x,g,_,m),Pr.initNonuniformCatmullRom(c.y,u.y,f.y,h.y,g,_,m),Lr.initNonuniformCatmullRom(c.z,u.z,f.z,h.z,g,_,m)}else this.curveType==="catmullrom"&&(Dr.initCatmullRom(c.x,u.x,f.x,h.x,this.tension),Pr.initCatmullRom(c.y,u.y,f.y,h.y,this.tension),Lr.initCatmullRom(c.z,u.z,f.z,h.z,this.tension));return n.set(Dr.calc(l),Pr.calc(l),Lr.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new A().fromArray(i))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function Bo(s,t,e,n,i){const r=(n-t)*.5,a=(i-e)*.5,o=s*s,l=s*o;return(2*e-2*n+r+a)*l+(-3*e+3*n-2*r-a)*o+r*s+e}function iu(s,t){const e=1-s;return e*e*t}function su(s,t){return 2*(1-s)*s*t}function ru(s,t){return s*s*t}function Zi(s,t,e,n){return iu(s,t)+su(s,e)+ru(s,n)}function au(s,t){const e=1-s;return e*e*e*t}function ou(s,t){const e=1-s;return 3*e*e*s*t}function lu(s,t){return 3*(1-s)*s*s*t}function cu(s,t){return s*s*s*t}function ji(s,t,e,n,i){return au(s,t)+ou(s,e)+lu(s,n)+cu(s,i)}class ql extends on{constructor(t=new dt,e=new dt,n=new dt,i=new dt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new dt){const n=e,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(ji(t,i.x,r.x,a.x,o.x),ji(t,i.y,r.y,a.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class hu extends on{constructor(t=new A,e=new A,n=new A,i=new A){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new A){const n=e,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(ji(t,i.x,r.x,a.x,o.x),ji(t,i.y,r.y,a.y,o.y),ji(t,i.z,r.z,a.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Kl extends on{constructor(t=new dt,e=new dt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new dt){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new dt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class uu extends on{constructor(t=new A,e=new A){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new A){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new A){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Zl extends on{constructor(t=new dt,e=new dt,n=new dt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new dt){const n=e,i=this.v0,r=this.v1,a=this.v2;return n.set(Zi(t,i.x,r.x,a.x),Zi(t,i.y,r.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class du extends on{constructor(t=new A,e=new A,n=new A){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new A){const n=e,i=this.v0,r=this.v1,a=this.v2;return n.set(Zi(t,i.x,r.x,a.x),Zi(t,i.y,r.y,a.y),Zi(t,i.z,r.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class jl extends on{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new dt){const n=e,i=this.points,r=(i.length-1)*t,a=Math.floor(r),o=r-a,l=i[a===0?a:a-1],c=i[a],h=i[a>i.length-2?i.length-1:a+1],u=i[a>i.length-3?i.length-1:a+2];return n.set(Bo(o,l.x,c.x,h.x,u.x),Bo(o,l.y,c.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new dt().fromArray(i))}return this}}var ko=Object.freeze({__proto__:null,ArcCurve:eu,CatmullRomCurve3:nu,CubicBezierCurve:ql,CubicBezierCurve3:hu,EllipseCurve:Za,LineCurve:Kl,LineCurve3:uu,QuadraticBezierCurve:Zl,QuadraticBezierCurve3:du,SplineCurve:jl});class fu extends on{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new ko[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),i=this.getCurveLengths();let r=0;for(;r<i.length;){if(i[r]>=n){const a=i[r]-n,o=this.curves[r],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,i=this.curves.length;n<i;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let i=0,r=this.curves;i<r.length;i++){const a=r[i],o=a.isEllipseCurve?t*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?t*a.points.length:t,l=a.getPoints(o);for(let c=0;c<l.length;c++){const h=l[c];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(i.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const i=this.curves[e];t.curves.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(new ko[i.type]().fromJSON(i))}return this}}class zo extends fu{constructor(t){super(),this.type="Path",this.currentPoint=new dt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new Kl(this.currentPoint.clone(),new dt(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,i){const r=new Zl(this.currentPoint.clone(),new dt(t,e),new dt(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this}bezierCurveTo(t,e,n,i,r,a){const o=new ql(this.currentPoint.clone(),new dt(t,e),new dt(n,i),new dt(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new jl(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,i,r,a){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+o,e+l,n,i,r,a),this}absarc(t,e,n,i,r,a){return this.absellipse(t,e,n,n,i,r,a),this}ellipse(t,e,n,i,r,a,o,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,n,i,r,a,o,l),this}absellipse(t,e,n,i,r,a,o,l){const c=new Za(t,e,n,i,r,a,o,l);if(this.curves.length>0){const u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);const h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class $l extends zo{constructor(t){super(t),this.uuid=ni(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,i=this.holes.length;n<i;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const i=t.holes[e];this.holes.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const i=this.holes[e];t.holes.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const i=t.holes[e];this.holes.push(new zo().fromJSON(i))}return this}}function pu(s,t,e=2){const n=t&&t.length,i=n?t[0]*e:s.length;let r=Jl(s,0,i,e,!0);const a=[];if(!r||r.next===r.prev)return a;let o,l,c;if(n&&(r=xu(s,t,r,e)),s.length>80*e){o=1/0,l=1/0;let h=-1/0,u=-1/0;for(let f=e;f<i;f+=e){const d=s[f],g=s[f+1];d<o&&(o=d),g<l&&(l=g),d>h&&(h=d),g>u&&(u=g)}c=Math.max(h-o,u-l),c=c!==0?32767/c:0}return ss(r,a,e,o,l,c,0),a}function Jl(s,t,e,n,i){let r;if(i===Du(s,t,e,n)>0)for(let a=t;a<e;a+=n)r=Ho(a/n|0,s[a],s[a+1],r);else for(let a=e-n;a>=t;a-=n)r=Ho(a/n|0,s[a],s[a+1],r);return r&&Ii(r,r.next)&&(as(r),r=r.next),r}function ti(s,t){if(!s)return s;t||(t=s);let e=s,n;do if(n=!1,!e.steiner&&(Ii(e,e.next)||fe(e.prev,e,e.next)===0)){if(as(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function ss(s,t,e,n,i,r,a){if(!s)return;!a&&r&&Eu(s,n,i,r);let o=s;for(;s.prev!==s.next;){const l=s.prev,c=s.next;if(r?gu(s,n,i,r):mu(s)){t.push(l.i,s.i,c.i),as(s),s=c.next,o=c.next;continue}if(s=c,s===o){a?a===1?(s=_u(ti(s),t),ss(s,t,e,n,i,r,2)):a===2&&vu(s,t,e,n,i,r):ss(ti(s),t,e,n,i,r,1);break}}}function mu(s){const t=s.prev,e=s,n=s.next;if(fe(t,e,n)>=0)return!1;const i=t.x,r=e.x,a=n.x,o=t.y,l=e.y,c=n.y,h=Math.min(i,r,a),u=Math.min(o,l,c),f=Math.max(i,r,a),d=Math.max(o,l,c);let g=n.next;for(;g!==t;){if(g.x>=h&&g.x<=f&&g.y>=u&&g.y<=d&&Xi(i,o,r,l,a,c,g.x,g.y)&&fe(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function gu(s,t,e,n){const i=s.prev,r=s,a=s.next;if(fe(i,r,a)>=0)return!1;const o=i.x,l=r.x,c=a.x,h=i.y,u=r.y,f=a.y,d=Math.min(o,l,c),g=Math.min(h,u,f),_=Math.max(o,l,c),m=Math.max(h,u,f),p=Da(d,g,t,e,n),E=Da(_,m,t,e,n);let M=s.prevZ,x=s.nextZ;for(;M&&M.z>=p&&x&&x.z<=E;){if(M.x>=d&&M.x<=_&&M.y>=g&&M.y<=m&&M!==i&&M!==a&&Xi(o,h,l,u,c,f,M.x,M.y)&&fe(M.prev,M,M.next)>=0||(M=M.prevZ,x.x>=d&&x.x<=_&&x.y>=g&&x.y<=m&&x!==i&&x!==a&&Xi(o,h,l,u,c,f,x.x,x.y)&&fe(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;M&&M.z>=p;){if(M.x>=d&&M.x<=_&&M.y>=g&&M.y<=m&&M!==i&&M!==a&&Xi(o,h,l,u,c,f,M.x,M.y)&&fe(M.prev,M,M.next)>=0)return!1;M=M.prevZ}for(;x&&x.z<=E;){if(x.x>=d&&x.x<=_&&x.y>=g&&x.y<=m&&x!==i&&x!==a&&Xi(o,h,l,u,c,f,x.x,x.y)&&fe(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function _u(s,t){let e=s;do{const n=e.prev,i=e.next.next;!Ii(n,i)&&tc(n,e,e.next,i)&&rs(n,i)&&rs(i,n)&&(t.push(n.i,e.i,i.i),as(e),as(e.next),e=s=i),e=e.next}while(e!==s);return ti(e)}function vu(s,t,e,n,i,r){let a=s;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&Cu(a,o)){let l=ec(a,o);a=ti(a,a.next),l=ti(l,l.next),ss(a,t,e,n,i,r,0),ss(l,t,e,n,i,r,0);return}o=o.next}a=a.next}while(a!==s)}function xu(s,t,e,n){const i=[];for(let r=0,a=t.length;r<a;r++){const o=t[r]*n,l=r<a-1?t[r+1]*n:s.length,c=Jl(s,o,l,n,!1);c===c.next&&(c.steiner=!0),i.push(wu(c))}i.sort(Mu);for(let r=0;r<i.length;r++)e=yu(i[r],e);return e}function Mu(s,t){let e=s.x-t.x;if(e===0&&(e=s.y-t.y,e===0)){const n=(s.next.y-s.y)/(s.next.x-s.x),i=(t.next.y-t.y)/(t.next.x-t.x);e=n-i}return e}function yu(s,t){const e=Su(s,t);if(!e)return t;const n=ec(e,s);return ti(n,n.next),ti(e,e.next)}function Su(s,t){let e=t;const n=s.x,i=s.y;let r=-1/0,a;if(Ii(s,e))return e;do{if(Ii(s,e.next))return e.next;if(i<=e.y&&i>=e.next.y&&e.next.y!==e.y){const u=e.x+(i-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(u<=n&&u>r&&(r=u,a=e.x<e.next.x?e:e.next,u===n))return a}e=e.next}while(e!==t);if(!a)return null;const o=a,l=a.x,c=a.y;let h=1/0;e=a;do{if(n>=e.x&&e.x>=l&&n!==e.x&&Ql(i<c?n:r,i,l,c,i<c?r:n,i,e.x,e.y)){const u=Math.abs(i-e.y)/(n-e.x);rs(e,s)&&(u<h||u===h&&(e.x>a.x||e.x===a.x&&Tu(a,e)))&&(a=e,h=u)}e=e.next}while(e!==o);return a}function Tu(s,t){return fe(s.prev,s,t.prev)<0&&fe(t.next,s,s.next)<0}function Eu(s,t,e,n){let i=s;do i.z===0&&(i.z=Da(i.x,i.y,t,e,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==s);i.prevZ.nextZ=null,i.prevZ=null,bu(i)}function bu(s){let t,e=1;do{let n=s,i;s=null;let r=null;for(t=0;n;){t++;let a=n,o=0;for(let c=0;c<e&&(o++,a=a.nextZ,!!a);c++);let l=e;for(;o>0||l>0&&a;)o!==0&&(l===0||!a||n.z<=a.z)?(i=n,n=n.nextZ,o--):(i=a,a=a.nextZ,l--),r?r.nextZ=i:s=i,i.prevZ=r,r=i;n=a}r.nextZ=null,e*=2}while(t>1);return s}function Da(s,t,e,n,i){return s=(s-e)*i|0,t=(t-n)*i|0,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,s|t<<1}function wu(s){let t=s,e=s;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==s);return e}function Ql(s,t,e,n,i,r,a,o){return(i-a)*(t-o)>=(s-a)*(r-o)&&(s-a)*(n-o)>=(e-a)*(t-o)&&(e-a)*(r-o)>=(i-a)*(n-o)}function Xi(s,t,e,n,i,r,a,o){return!(s===a&&t===o)&&Ql(s,t,e,n,i,r,a,o)}function Cu(s,t){return s.next.i!==t.i&&s.prev.i!==t.i&&!Au(s,t)&&(rs(s,t)&&rs(t,s)&&Ru(s,t)&&(fe(s.prev,s,t.prev)||fe(s,t.prev,t))||Ii(s,t)&&fe(s.prev,s,s.next)>0&&fe(t.prev,t,t.next)>0)}function fe(s,t,e){return(t.y-s.y)*(e.x-t.x)-(t.x-s.x)*(e.y-t.y)}function Ii(s,t){return s.x===t.x&&s.y===t.y}function tc(s,t,e,n){const i=Os(fe(s,t,e)),r=Os(fe(s,t,n)),a=Os(fe(e,n,s)),o=Os(fe(e,n,t));return!!(i!==r&&a!==o||i===0&&Ns(s,e,t)||r===0&&Ns(s,n,t)||a===0&&Ns(e,s,n)||o===0&&Ns(e,t,n))}function Ns(s,t,e){return t.x<=Math.max(s.x,e.x)&&t.x>=Math.min(s.x,e.x)&&t.y<=Math.max(s.y,e.y)&&t.y>=Math.min(s.y,e.y)}function Os(s){return s>0?1:s<0?-1:0}function Au(s,t){let e=s;do{if(e.i!==s.i&&e.next.i!==s.i&&e.i!==t.i&&e.next.i!==t.i&&tc(e,e.next,s,t))return!0;e=e.next}while(e!==s);return!1}function rs(s,t){return fe(s.prev,s,s.next)<0?fe(s,t,s.next)>=0&&fe(s,s.prev,t)>=0:fe(s,t,s.prev)<0||fe(s,s.next,t)<0}function Ru(s,t){let e=s,n=!1;const i=(s.x+t.x)/2,r=(s.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&i<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==s);return n}function ec(s,t){const e=Pa(s.i,s.x,s.y),n=Pa(t.i,t.x,t.y),i=s.next,r=t.prev;return s.next=t,t.prev=s,e.next=i,i.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function Ho(s,t,e,n){const i=Pa(s,t,e);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function as(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function Pa(s,t,e){return{i:s,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Du(s,t,e,n){let i=0;for(let r=t,a=e-n;r<e;r+=n)i+=(s[a]-s[r])*(s[r+1]+s[a+1]),a=r;return i}class Pu{static triangulate(t,e,n=2){return pu(t,e,n)}}class $i{static area(t){const e=t.length;let n=0;for(let i=e-1,r=0;r<e;i=r++)n+=t[i].x*t[r].y-t[r].x*t[i].y;return n*.5}static isClockWise(t){return $i.area(t)<0}static triangulateShape(t,e){const n=[],i=[],r=[];Vo(t),Go(n,t);let a=t.length;e.forEach(Vo);for(let l=0;l<e.length;l++)i.push(a),a+=e[l].length,Go(n,e[l]);const o=Pu.triangulate(n,i);for(let l=0;l<o.length;l+=3)r.push(o.slice(l,l+3));return r}}function Vo(s){const t=s.length;t>2&&s[t-1].equals(s[0])&&s.pop()}function Go(s,t){for(let e=0;e<t.length;e++)s.push(t[e].x),s.push(t[e].y)}class ze extends Te{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};const r=t/2,a=e/2,o=Math.floor(n),l=Math.floor(i),c=o+1,h=l+1,u=t/o,f=e/l,d=[],g=[],_=[],m=[];for(let p=0;p<h;p++){const E=p*f-a;for(let M=0;M<c;M++){const x=M*u-r;g.push(x,-E,0),_.push(0,0,1),m.push(M/o),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let E=0;E<o;E++){const M=E+c*p,x=E+c*(p+1),w=E+1+c*(p+1),b=E+1+c*p;d.push(M,x,b),d.push(x,w,b)}this.setIndex(d),this.setAttribute("position",new pe(g,3)),this.setAttribute("normal",new pe(_,3)),this.setAttribute("uv",new pe(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ze(t.width,t.height,t.widthSegments,t.heightSegments)}}class os extends Te{constructor(t=.5,e=1,n=32,i=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:i,thetaStart:r,thetaLength:a},n=Math.max(3,n),i=Math.max(1,i);const o=[],l=[],c=[],h=[];let u=t;const f=(e-t)/i,d=new A,g=new dt;for(let _=0;_<=i;_++){for(let m=0;m<=n;m++){const p=r+m/n*a;d.x=u*Math.cos(p),d.y=u*Math.sin(p),l.push(d.x,d.y,d.z),c.push(0,0,1),g.x=(d.x/e+1)/2,g.y=(d.y/e+1)/2,h.push(g.x,g.y)}u+=f}for(let _=0;_<i;_++){const m=_*(n+1);for(let p=0;p<n;p++){const E=p+m,M=E,x=E+n+1,w=E+n+2,b=E+1;o.push(M,x,b),o.push(x,w,b)}}this.setIndex(o),this.setAttribute("position",new pe(l,3)),this.setAttribute("normal",new pe(c,3)),this.setAttribute("uv",new pe(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new os(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class $a extends Te{constructor(t=new $l([new dt(0,.5),new dt(-.5,-.5),new dt(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};const n=[],i=[],r=[],a=[];let o=0,l=0;if(Array.isArray(t)===!1)c(t);else for(let h=0;h<t.length;h++)c(t[h]),this.addGroup(o,l,h),o+=l,l=0;this.setIndex(n),this.setAttribute("position",new pe(i,3)),this.setAttribute("normal",new pe(r,3)),this.setAttribute("uv",new pe(a,2));function c(h){const u=i.length/3,f=h.extractPoints(e);let d=f.shape;const g=f.holes;$i.isClockWise(d)===!1&&(d=d.reverse());for(let m=0,p=g.length;m<p;m++){const E=g[m];$i.isClockWise(E)===!0&&(g[m]=E.reverse())}const _=$i.triangulateShape(d,g);for(let m=0,p=g.length;m<p;m++){const E=g[m];d=d.concat(E)}for(let m=0,p=d.length;m<p;m++){const E=d[m];i.push(E.x,E.y,0),r.push(0,0,1),a.push(E.x,E.y)}for(let m=0,p=_.length;m<p;m++){const E=_[m],M=E[0]+u,x=E[1]+u,w=E[2]+u;n.push(M,x,w),l+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes;return Lu(e,t)}static fromJSON(t,e){const n=[];for(let i=0,r=t.shapes.length;i<r;i++){const a=e[t.shapes[i]];n.push(a)}return new $a(n,t.curveSegments)}}function Lu(s,t){if(t.shapes=[],Array.isArray(s))for(let e=0,n=s.length;e<n;e++){const i=s[e];t.shapes.push(i.uuid)}else t.shapes.push(s.uuid);return t}class ls extends Te{constructor(t=1,e=.4,n=12,i=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:i,arc:r},n=Math.floor(n),i=Math.floor(i);const a=[],o=[],l=[],c=[],h=new A,u=new A,f=new A;for(let d=0;d<=n;d++)for(let g=0;g<=i;g++){const _=g/i*r,m=d/n*Math.PI*2;u.x=(t+e*Math.cos(m))*Math.cos(_),u.y=(t+e*Math.cos(m))*Math.sin(_),u.z=e*Math.sin(m),o.push(u.x,u.y,u.z),h.x=t*Math.cos(_),h.y=t*Math.sin(_),f.subVectors(u,h).normalize(),l.push(f.x,f.y,f.z),c.push(g/i),c.push(d/n)}for(let d=1;d<=n;d++)for(let g=1;g<=i;g++){const _=(i+1)*d+g-1,m=(i+1)*(d-1)+g-1,p=(i+1)*(d-1)+g,E=(i+1)*d+g;a.push(_,m,E),a.push(m,p,E)}this.setIndex(a),this.setAttribute("position",new pe(o,3)),this.setAttribute("normal",new pe(l,3)),this.setAttribute("uv",new pe(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ls(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class ve extends si{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Kt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Kt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Wa,this.normalScale=new dt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new en,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Us extends si{constructor(t){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new Kt(16777215),this.specular=new Kt(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Kt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Wa,this.normalScale=new dt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new en,this.combine=Fa,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.specular.copy(t.specular),this.shininess=t.shininess,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Iu extends si{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=$c,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Nu extends si{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const Js={enabled:!1,files:{},add:function(s,t){this.enabled!==!1&&(this.files[s]=t)},get:function(s){if(this.enabled!==!1)return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}};class Ou{constructor(t,e,n){const i=this;let r=!1,a=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(h){o++,r===!1&&i.onStart!==void 0&&i.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,i.onProgress!==void 0&&i.onProgress(h,a,o),a===o&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){const u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,f=c.length;u<f;u+=2){const d=c[u],g=c[u+1];if(d.global&&(d.lastIndex=0),d.test(h))return g}return null}}}const Uu=new Ou;class hs{constructor(t){this.manager=t!==void 0?t:Uu,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){const n=this;return new Promise(function(i,r){n.load(t,i,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}}hs.DEFAULT_MATERIAL_NAME="__DEFAULT";const pn={};class Fu extends Error{constructor(t,e){super(t),this.response=e}}class Bu extends hs{constructor(t){super(t),this.mimeType="",this.responseType=""}load(t,e,n,i){t===void 0&&(t=""),this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const r=Js.get(t);if(r!==void 0)return this.manager.itemStart(t),setTimeout(()=>{e&&e(r),this.manager.itemEnd(t)},0),r;if(pn[t]!==void 0){pn[t].push({onLoad:e,onProgress:n,onError:i});return}pn[t]=[],pn[t].push({onLoad:e,onProgress:n,onError:i});const a=new Request(t,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),o=this.mimeType,l=this.responseType;fetch(a).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const h=pn[t],u=c.body.getReader(),f=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),d=f?parseInt(f):0,g=d!==0;let _=0;const m=new ReadableStream({start(p){E();function E(){u.read().then(({done:M,value:x})=>{if(M)p.close();else{_+=x.byteLength;const w=new ProgressEvent("progress",{lengthComputable:g,loaded:_,total:d});for(let b=0,R=h.length;b<R;b++){const L=h[b];L.onProgress&&L.onProgress(w)}p.enqueue(x),E()}},M=>{p.error(M)})}}});return new Response(m)}else throw new Fu(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,o));case"json":return c.json();default:if(o==="")return c.text();{const u=/charset="?([^;"\s]*)"?/i.exec(o),f=u&&u[1]?u[1].toLowerCase():void 0,d=new TextDecoder(f);return c.arrayBuffer().then(g=>d.decode(g))}}}).then(c=>{Js.add(t,c);const h=pn[t];delete pn[t];for(let u=0,f=h.length;u<f;u++){const d=h[u];d.onLoad&&d.onLoad(c)}}).catch(c=>{const h=pn[t];if(h===void 0)throw this.manager.itemError(t),c;delete pn[t];for(let u=0,f=h.length;u<f;u++){const d=h[u];d.onError&&d.onError(c)}this.manager.itemError(t)}).finally(()=>{this.manager.itemEnd(t)}),this.manager.itemStart(t)}setResponseType(t){return this.responseType=t,this}setMimeType(t){return this.mimeType=t,this}}class ku extends hs{constructor(t){super(t)}load(t,e,n,i){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const r=this,a=Js.get(t);if(a!==void 0)return r.manager.itemStart(t),setTimeout(function(){e&&e(a),r.manager.itemEnd(t)},0),a;const o=ns("img");function l(){h(),Js.add(t,this),e&&e(this),r.manager.itemEnd(t)}function c(u){h(),i&&i(u),r.manager.itemError(t),r.manager.itemEnd(t)}function h(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),r.manager.itemStart(t),o.src=t,o}}class Ja extends hs{constructor(t){super(t)}load(t,e,n,i){const r=new Le,a=new ku(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(t,function(o){r.image=o,r.needsUpdate=!0,e!==void 0&&e(r)},n,i),r}}class nr extends ae{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Kt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}const Ir=new ce,Wo=new A,Xo=new A;class Qa{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new dt(512,512),this.mapType=an,this.map=null,this.mapPass=null,this.matrix=new ce,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ka,this._frameExtents=new dt(1,1),this._viewportCount=1,this._viewports=[new oe(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Wo.setFromMatrixPosition(t.matrixWorld),e.position.copy(Wo),Xo.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Xo),e.updateMatrixWorld(),Ir.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ir),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Ir)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class zu extends Qa{constructor(){super(new Ue(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(t){const e=this.camera,n=Pi*2*t.angle*this.focus,i=this.mapSize.width/this.mapSize.height*this.aspect,r=t.distance||e.far;(n!==e.fov||i!==e.aspect||r!==e.far)&&(e.fov=n,e.aspect=i,e.far=r,e.updateProjectionMatrix()),super.updateMatrices(t)}copy(t){return super.copy(t),this.focus=t.focus,this}}class Hu extends nr{constructor(t,e,n=0,i=Math.PI/3,r=0,a=2){super(t,e),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(ae.DEFAULT_UP),this.updateMatrix(),this.target=new ae,this.distance=n,this.angle=i,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new zu}get power(){return this.intensity*Math.PI}set power(t){this.intensity=t/Math.PI}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}const Yo=new ce,Hi=new A,Nr=new A;class Vu extends Qa{constructor(){super(new Ue(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new dt(4,2),this._viewportCount=6,this._viewports=[new oe(2,1,1,1),new oe(0,1,1,1),new oe(3,1,1,1),new oe(1,1,1,1),new oe(3,0,1,1),new oe(1,0,1,1)],this._cubeDirections=[new A(1,0,0),new A(-1,0,0),new A(0,0,1),new A(0,0,-1),new A(0,1,0),new A(0,-1,0)],this._cubeUps=[new A(0,1,0),new A(0,1,0),new A(0,1,0),new A(0,1,0),new A(0,0,1),new A(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,i=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Hi.setFromMatrixPosition(t.matrixWorld),n.position.copy(Hi),Nr.copy(n.position),Nr.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(Nr),n.updateMatrixWorld(),i.makeTranslation(-Hi.x,-Hi.y,-Hi.z),Yo.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Yo)}}class Gu extends nr{constructor(t,e,n=0,i=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new Vu}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class nc extends Gl{constructor(t=-1,e=1,n=1,i=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=n-t,a=n+t,o=i+e,l=i-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class Wu extends Qa{constructor(){super(new nc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Xu extends nr{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ae.DEFAULT_UP),this.updateMatrix(),this.target=new ae,this.shadow=new Wu}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class Yu extends nr{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}let Fs;class ic{static getContext(){return Fs===void 0&&(Fs=new(window.AudioContext||window.webkitAudioContext)),Fs}static setContext(t){Fs=t}}class qu extends hs{constructor(t){super(t)}load(t,e,n,i){const r=this,a=new Bu(this.manager);a.setResponseType("arraybuffer"),a.setPath(this.path),a.setRequestHeader(this.requestHeader),a.setWithCredentials(this.withCredentials),a.load(t,function(l){try{const c=l.slice(0);ic.getContext().decodeAudioData(c,function(u){e(u)}).catch(o)}catch(c){o(c)}},n,i);function o(l){i?i(l):console.error(l),r.manager.itemError(t)}}}class Ku extends Ue{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}class Zu{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=qo(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=qo();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function qo(){return performance.now()}const Bn=new A,Or=new tn,ju=new A,kn=new A,zn=new A;class $u extends ae{constructor(){super(),this.type="AudioListener",this.context=ic.getContext(),this.gain=this.context.createGain(),this.gain.connect(this.context.destination),this.filter=null,this.timeDelta=0,this._clock=new Zu}getInput(){return this.gain}removeFilter(){return this.filter!==null&&(this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination),this.gain.connect(this.context.destination),this.filter=null),this}getFilter(){return this.filter}setFilter(t){return this.filter!==null?(this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination)):this.gain.disconnect(this.context.destination),this.filter=t,this.gain.connect(this.filter),this.filter.connect(this.context.destination),this}getMasterVolume(){return this.gain.gain.value}setMasterVolume(t){return this.gain.gain.setTargetAtTime(t,this.context.currentTime,.01),this}updateMatrixWorld(t){super.updateMatrixWorld(t);const e=this.context.listener;if(this.timeDelta=this._clock.getDelta(),this.matrixWorld.decompose(Bn,Or,ju),kn.set(0,0,-1).applyQuaternion(Or),zn.set(0,1,0).applyQuaternion(Or),e.positionX){const n=this.context.currentTime+this.timeDelta;e.positionX.linearRampToValueAtTime(Bn.x,n),e.positionY.linearRampToValueAtTime(Bn.y,n),e.positionZ.linearRampToValueAtTime(Bn.z,n),e.forwardX.linearRampToValueAtTime(kn.x,n),e.forwardY.linearRampToValueAtTime(kn.y,n),e.forwardZ.linearRampToValueAtTime(kn.z,n),e.upX.linearRampToValueAtTime(zn.x,n),e.upY.linearRampToValueAtTime(zn.y,n),e.upZ.linearRampToValueAtTime(zn.z,n)}else e.setPosition(Bn.x,Bn.y,Bn.z),e.setOrientation(kn.x,kn.y,kn.z,zn.x,zn.y,zn.z)}}class La extends ae{constructor(t){super(),this.type="Audio",this.listener=t,this.context=t.context,this.gain=this.context.createGain(),this.gain.connect(t.getInput()),this.autoplay=!1,this.buffer=null,this.detune=0,this.loop=!1,this.loopStart=0,this.loopEnd=0,this.offset=0,this.duration=void 0,this.playbackRate=1,this.isPlaying=!1,this.hasPlaybackControl=!0,this.source=null,this.sourceType="empty",this._startedAt=0,this._progress=0,this._connected=!1,this.filters=[]}getOutput(){return this.gain}setNodeSource(t){return this.hasPlaybackControl=!1,this.sourceType="audioNode",this.source=t,this.connect(),this}setMediaElementSource(t){return this.hasPlaybackControl=!1,this.sourceType="mediaNode",this.source=this.context.createMediaElementSource(t),this.connect(),this}setMediaStreamSource(t){return this.hasPlaybackControl=!1,this.sourceType="mediaStreamNode",this.source=this.context.createMediaStreamSource(t),this.connect(),this}setBuffer(t){return this.buffer=t,this.sourceType="buffer",this.autoplay&&this.play(),this}play(t=0){if(this.isPlaying===!0){console.warn("THREE.Audio: Audio is already playing.");return}if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}this._startedAt=this.context.currentTime+t;const e=this.context.createBufferSource();return e.buffer=this.buffer,e.loop=this.loop,e.loopStart=this.loopStart,e.loopEnd=this.loopEnd,e.onended=this.onEnded.bind(this),e.start(this._startedAt,this._progress+this.offset,this.duration),this.isPlaying=!0,this.source=e,this.setDetune(this.detune),this.setPlaybackRate(this.playbackRate),this.connect()}pause(){if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}return this.isPlaying===!0&&(this._progress+=Math.max(this.context.currentTime-this._startedAt,0)*this.playbackRate,this.loop===!0&&(this._progress=this._progress%(this.duration||this.buffer.duration)),this.source.stop(),this.source.onended=null,this.isPlaying=!1),this}stop(t=0){if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}return this._progress=0,this.source!==null&&(this.source.stop(this.context.currentTime+t),this.source.onended=null),this.isPlaying=!1,this}connect(){if(this.filters.length>0){this.source.connect(this.filters[0]);for(let t=1,e=this.filters.length;t<e;t++)this.filters[t-1].connect(this.filters[t]);this.filters[this.filters.length-1].connect(this.getOutput())}else this.source.connect(this.getOutput());return this._connected=!0,this}disconnect(){if(this._connected!==!1){if(this.filters.length>0){this.source.disconnect(this.filters[0]);for(let t=1,e=this.filters.length;t<e;t++)this.filters[t-1].disconnect(this.filters[t]);this.filters[this.filters.length-1].disconnect(this.getOutput())}else this.source.disconnect(this.getOutput());return this._connected=!1,this}}getFilters(){return this.filters}setFilters(t){return t||(t=[]),this._connected===!0?(this.disconnect(),this.filters=t.slice(),this.connect()):this.filters=t.slice(),this}setDetune(t){return this.detune=t,this.isPlaying===!0&&this.source.detune!==void 0&&this.source.detune.setTargetAtTime(this.detune,this.context.currentTime,.01),this}getDetune(){return this.detune}getFilter(){return this.getFilters()[0]}setFilter(t){return this.setFilters(t?[t]:[])}setPlaybackRate(t){if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}return this.playbackRate=t,this.isPlaying===!0&&this.source.playbackRate.setTargetAtTime(this.playbackRate,this.context.currentTime,.01),this}getPlaybackRate(){return this.playbackRate}onEnded(){this.isPlaying=!1,this._progress=0}getLoop(){return this.hasPlaybackControl===!1?(console.warn("THREE.Audio: this Audio has no playback control."),!1):this.loop}setLoop(t){if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}return this.loop=t,this.isPlaying===!0&&(this.source.loop=this.loop),this}setLoopStart(t){return this.loopStart=t,this}setLoopEnd(t){return this.loopEnd=t,this}getVolume(){return this.gain.gain.value}setVolume(t){return this.gain.gain.setTargetAtTime(t,this.context.currentTime,.01),this}copy(t,e){return super.copy(t,e),t.sourceType!=="buffer"?(console.warn("THREE.Audio: Audio source type cannot be copied."),this):(this.autoplay=t.autoplay,this.buffer=t.buffer,this.detune=t.detune,this.loop=t.loop,this.loopStart=t.loopStart,this.loopEnd=t.loopEnd,this.offset=t.offset,this.duration=t.duration,this.playbackRate=t.playbackRate,this.hasPlaybackControl=t.hasPlaybackControl,this.sourceType=t.sourceType,this.filters=t.filters.slice(),this)}clone(t){return new this.constructor(this.listener).copy(this,t)}}const Hn=new A,Ko=new tn,Ju=new A,Vn=new A;class Gn extends La{constructor(t){super(t),this.panner=this.context.createPanner(),this.panner.panningModel="HRTF",this.panner.connect(this.gain)}connect(){return super.connect(),this.panner.connect(this.gain),this}disconnect(){return super.disconnect(),this.panner.disconnect(this.gain),this}getOutput(){return this.panner}getRefDistance(){return this.panner.refDistance}setRefDistance(t){return this.panner.refDistance=t,this}getRolloffFactor(){return this.panner.rolloffFactor}setRolloffFactor(t){return this.panner.rolloffFactor=t,this}getDistanceModel(){return this.panner.distanceModel}setDistanceModel(t){return this.panner.distanceModel=t,this}getMaxDistance(){return this.panner.maxDistance}setMaxDistance(t){return this.panner.maxDistance=t,this}setDirectionalCone(t,e,n){return this.panner.coneInnerAngle=t,this.panner.coneOuterAngle=e,this.panner.coneOuterGain=n,this}updateMatrixWorld(t){if(super.updateMatrixWorld(t),this.hasPlaybackControl===!0&&this.isPlaying===!1)return;this.matrixWorld.decompose(Hn,Ko,Ju),Vn.set(0,0,1).applyQuaternion(Ko);const e=this.panner;if(e.positionX){const n=this.context.currentTime+this.listener.timeDelta;e.positionX.linearRampToValueAtTime(Hn.x,n),e.positionY.linearRampToValueAtTime(Hn.y,n),e.positionZ.linearRampToValueAtTime(Hn.z,n),e.orientationX.linearRampToValueAtTime(Vn.x,n),e.orientationY.linearRampToValueAtTime(Vn.y,n),e.orientationZ.linearRampToValueAtTime(Vn.z,n)}else e.setPosition(Hn.x,Hn.y,Hn.z),e.setOrientation(Vn.x,Vn.y,Vn.z)}}const Zo=new ce;class sc{constructor(t,e,n=0,i=1/0){this.ray=new er(t,e),this.near=n,this.far=i,this.camera=null,this.layers=new qa,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Zo.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Zo),this}intersectObject(t,e=!0,n=[]){return Ia(t,this,n,e),n.sort(jo),n}intersectObjects(t,e=!0,n=[]){for(let i=0,r=t.length;i<r;i++)Ia(t[i],this,n,e);return n.sort(jo),n}}function jo(s,t){return s.distance-t.distance}function Ia(s,t,e,n){let i=!0;if(s.layers.test(t.layers)&&s.raycast(t,e)===!1&&(i=!1),i===!0&&n===!0){const r=s.children;for(let a=0,o=r.length;a<o;a++)Ia(r[a],t,e,!0)}}class Na{constructor(t=1,e=0,n=0){this.radius=t,this.phi=e,this.theta=n}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=jt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(jt(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class Qu extends ei{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){if(t===void 0){console.warn("THREE.Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}}function $o(s,t,e,n){const i=td(n);switch(e){case Pl:return s*t;case Il:return s*t/i.components*i.byteLength;case Ha:return s*t/i.components*i.byteLength;case Nl:return s*t*2/i.components*i.byteLength;case Va:return s*t*2/i.components*i.byteLength;case Ll:return s*t*3/i.components*i.byteLength;case Je:return s*t*4/i.components*i.byteLength;case Ga:return s*t*4/i.components*i.byteLength;case Vs:case Gs:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case Ws:case Xs:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case sa:case aa:return Math.max(s,16)*Math.max(t,8)/4;case ia:case ra:return Math.max(s,8)*Math.max(t,8)/2;case oa:case la:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case ca:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case ha:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case ua:return Math.floor((s+4)/5)*Math.floor((t+3)/4)*16;case da:return Math.floor((s+4)/5)*Math.floor((t+4)/5)*16;case fa:return Math.floor((s+5)/6)*Math.floor((t+4)/5)*16;case pa:return Math.floor((s+5)/6)*Math.floor((t+5)/6)*16;case ma:return Math.floor((s+7)/8)*Math.floor((t+4)/5)*16;case ga:return Math.floor((s+7)/8)*Math.floor((t+5)/6)*16;case _a:return Math.floor((s+7)/8)*Math.floor((t+7)/8)*16;case va:return Math.floor((s+9)/10)*Math.floor((t+4)/5)*16;case xa:return Math.floor((s+9)/10)*Math.floor((t+5)/6)*16;case Ma:return Math.floor((s+9)/10)*Math.floor((t+7)/8)*16;case ya:return Math.floor((s+9)/10)*Math.floor((t+9)/10)*16;case Sa:return Math.floor((s+11)/12)*Math.floor((t+9)/10)*16;case Ta:return Math.floor((s+11)/12)*Math.floor((t+11)/12)*16;case Ys:case Ea:case ba:return Math.ceil(s/4)*Math.ceil(t/4)*16;case Ol:case wa:return Math.ceil(s/4)*Math.ceil(t/4)*8;case Ca:case Aa:return Math.ceil(s/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function td(s){switch(s){case an:case Al:return{byteLength:1,components:1};case Ji:case Rl:case cs:return{byteLength:2,components:1};case ka:case za:return{byteLength:2,components:4};case Jn:case Ba:case gn:return{byteLength:4,components:1};case Dl:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ua}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ua);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function rc(){let s=null,t=!1,e=null,n=null;function i(r,a){e(r,a),n=s.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=s.requestAnimationFrame(i),t=!0)},stop:function(){s.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){s=r}}}function ed(s){const t=new WeakMap;function e(o,l){const c=o.array,h=o.usage,u=c.byteLength,f=s.createBuffer();s.bindBuffer(l,f),s.bufferData(l,c,h),o.onUploadCallback();let d;if(c instanceof Float32Array)d=s.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?d=s.HALF_FLOAT:d=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=s.SHORT;else if(c instanceof Uint32Array)d=s.UNSIGNED_INT;else if(c instanceof Int32Array)d=s.INT;else if(c instanceof Int8Array)d=s.BYTE;else if(c instanceof Uint8Array)d=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,l,c){const h=l.array,u=l.updateRanges;if(s.bindBuffer(c,o),u.length===0)s.bufferSubData(c,0,h);else{u.sort((d,g)=>d.start-g.start);let f=0;for(let d=1;d<u.length;d++){const g=u[f],_=u[d];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++f,u[f]=_)}u.length=f+1;for(let d=0,g=u.length;d<g;d++){const _=u[d];s.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=t.get(o);l&&(s.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:i,remove:r,update:a}}var nd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,id=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,sd=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,rd=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ad=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,od=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,ld=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT )
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN )
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,cd=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,hd=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,ud=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,dd=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,fd=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,pd=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,md=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,gd=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,_d=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,vd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,xd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Md=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,yd=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Sd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Td=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Ed=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,bd=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,wd=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Cd=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Ad=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Rd=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Dd=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Pd=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Ld="gl_FragColor = linearToOutputTexel( gl_FragColor );",Id=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Nd=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Od=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif

#endif`,Ud=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Fd=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS

		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Bd=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,kd=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,zd=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Hd=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Vd=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Gd=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Wd=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Xd=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Yd=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,qd=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Kd=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Zd=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,jd=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,$d=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Jd=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Qd=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,tf=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,ef=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,nf=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,sf=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,rf=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,af=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,of=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,lf=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,cf=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,hf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,uf=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,df=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ff=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,pf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,mf=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,gf=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,_f=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,vf=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,xf=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Mf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,yf=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Sf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Tf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ef=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,bf=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,wf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Cf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Af=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Rf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Df=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Pf=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Lf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,If=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Nf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Of=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Uf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Ff=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Bf=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;

		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,kf=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,zf=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Hf=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Vf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Gf=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Wf=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Xf=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Yf=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,qf=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Kf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Zf=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,jf=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,$f=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Jf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Qf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,tp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,ep=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const np=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,ip=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,sp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,rp=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ap=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,op=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,lp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,cp=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,hp=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,up=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,dp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,fp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,pp=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,mp=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,gp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,_p=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,vp=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,xp=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Mp=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,yp=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Sp=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Tp=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Ep=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,bp=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,wp=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Cp=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ap=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Rp=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Dp=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Pp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Lp=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ip=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Np=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Op=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Zt={alphahash_fragment:nd,alphahash_pars_fragment:id,alphamap_fragment:sd,alphamap_pars_fragment:rd,alphatest_fragment:ad,alphatest_pars_fragment:od,aomap_fragment:ld,aomap_pars_fragment:cd,batching_pars_vertex:hd,batching_vertex:ud,begin_vertex:dd,beginnormal_vertex:fd,bsdfs:pd,iridescence_fragment:md,bumpmap_pars_fragment:gd,clipping_planes_fragment:_d,clipping_planes_pars_fragment:vd,clipping_planes_pars_vertex:xd,clipping_planes_vertex:Md,color_fragment:yd,color_pars_fragment:Sd,color_pars_vertex:Td,color_vertex:Ed,common:bd,cube_uv_reflection_fragment:wd,defaultnormal_vertex:Cd,displacementmap_pars_vertex:Ad,displacementmap_vertex:Rd,emissivemap_fragment:Dd,emissivemap_pars_fragment:Pd,colorspace_fragment:Ld,colorspace_pars_fragment:Id,envmap_fragment:Nd,envmap_common_pars_fragment:Od,envmap_pars_fragment:Ud,envmap_pars_vertex:Fd,envmap_physical_pars_fragment:Kd,envmap_vertex:Bd,fog_vertex:kd,fog_pars_vertex:zd,fog_fragment:Hd,fog_pars_fragment:Vd,gradientmap_pars_fragment:Gd,lightmap_pars_fragment:Wd,lights_lambert_fragment:Xd,lights_lambert_pars_fragment:Yd,lights_pars_begin:qd,lights_toon_fragment:Zd,lights_toon_pars_fragment:jd,lights_phong_fragment:$d,lights_phong_pars_fragment:Jd,lights_physical_fragment:Qd,lights_physical_pars_fragment:tf,lights_fragment_begin:ef,lights_fragment_maps:nf,lights_fragment_end:sf,logdepthbuf_fragment:rf,logdepthbuf_pars_fragment:af,logdepthbuf_pars_vertex:of,logdepthbuf_vertex:lf,map_fragment:cf,map_pars_fragment:hf,map_particle_fragment:uf,map_particle_pars_fragment:df,metalnessmap_fragment:ff,metalnessmap_pars_fragment:pf,morphinstance_vertex:mf,morphcolor_vertex:gf,morphnormal_vertex:_f,morphtarget_pars_vertex:vf,morphtarget_vertex:xf,normal_fragment_begin:Mf,normal_fragment_maps:yf,normal_pars_fragment:Sf,normal_pars_vertex:Tf,normal_vertex:Ef,normalmap_pars_fragment:bf,clearcoat_normal_fragment_begin:wf,clearcoat_normal_fragment_maps:Cf,clearcoat_pars_fragment:Af,iridescence_pars_fragment:Rf,opaque_fragment:Df,packing:Pf,premultiplied_alpha_fragment:Lf,project_vertex:If,dithering_fragment:Nf,dithering_pars_fragment:Of,roughnessmap_fragment:Uf,roughnessmap_pars_fragment:Ff,shadowmap_pars_fragment:Bf,shadowmap_pars_vertex:kf,shadowmap_vertex:zf,shadowmask_pars_fragment:Hf,skinbase_vertex:Vf,skinning_pars_vertex:Gf,skinning_vertex:Wf,skinnormal_vertex:Xf,specularmap_fragment:Yf,specularmap_pars_fragment:qf,tonemapping_fragment:Kf,tonemapping_pars_fragment:Zf,transmission_fragment:jf,transmission_pars_fragment:$f,uv_pars_fragment:Jf,uv_pars_vertex:Qf,uv_vertex:tp,worldpos_vertex:ep,background_vert:np,background_frag:ip,backgroundCube_vert:sp,backgroundCube_frag:rp,cube_vert:ap,cube_frag:op,depth_vert:lp,depth_frag:cp,distanceRGBA_vert:hp,distanceRGBA_frag:up,equirect_vert:dp,equirect_frag:fp,linedashed_vert:pp,linedashed_frag:mp,meshbasic_vert:gp,meshbasic_frag:_p,meshlambert_vert:vp,meshlambert_frag:xp,meshmatcap_vert:Mp,meshmatcap_frag:yp,meshnormal_vert:Sp,meshnormal_frag:Tp,meshphong_vert:Ep,meshphong_frag:bp,meshphysical_vert:wp,meshphysical_frag:Cp,meshtoon_vert:Ap,meshtoon_frag:Rp,points_vert:Dp,points_frag:Pp,shadow_vert:Lp,shadow_frag:Ip,sprite_vert:Np,sprite_frag:Op},mt={common:{diffuse:{value:new Kt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new qt},alphaMap:{value:null},alphaMapTransform:{value:new qt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new qt}},envmap:{envMap:{value:null},envMapRotation:{value:new qt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new qt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new qt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new qt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new qt},normalScale:{value:new dt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new qt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new qt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new qt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new qt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Kt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Kt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new qt},alphaTest:{value:0},uvTransform:{value:new qt}},sprite:{diffuse:{value:new Kt(16777215)},opacity:{value:1},center:{value:new dt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new qt},alphaMap:{value:null},alphaMapTransform:{value:new qt},alphaTest:{value:0}}},nn={basic:{uniforms:De([mt.common,mt.specularmap,mt.envmap,mt.aomap,mt.lightmap,mt.fog]),vertexShader:Zt.meshbasic_vert,fragmentShader:Zt.meshbasic_frag},lambert:{uniforms:De([mt.common,mt.specularmap,mt.envmap,mt.aomap,mt.lightmap,mt.emissivemap,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.fog,mt.lights,{emissive:{value:new Kt(0)}}]),vertexShader:Zt.meshlambert_vert,fragmentShader:Zt.meshlambert_frag},phong:{uniforms:De([mt.common,mt.specularmap,mt.envmap,mt.aomap,mt.lightmap,mt.emissivemap,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.fog,mt.lights,{emissive:{value:new Kt(0)},specular:{value:new Kt(1118481)},shininess:{value:30}}]),vertexShader:Zt.meshphong_vert,fragmentShader:Zt.meshphong_frag},standard:{uniforms:De([mt.common,mt.envmap,mt.aomap,mt.lightmap,mt.emissivemap,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.roughnessmap,mt.metalnessmap,mt.fog,mt.lights,{emissive:{value:new Kt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Zt.meshphysical_vert,fragmentShader:Zt.meshphysical_frag},toon:{uniforms:De([mt.common,mt.aomap,mt.lightmap,mt.emissivemap,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.gradientmap,mt.fog,mt.lights,{emissive:{value:new Kt(0)}}]),vertexShader:Zt.meshtoon_vert,fragmentShader:Zt.meshtoon_frag},matcap:{uniforms:De([mt.common,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.fog,{matcap:{value:null}}]),vertexShader:Zt.meshmatcap_vert,fragmentShader:Zt.meshmatcap_frag},points:{uniforms:De([mt.points,mt.fog]),vertexShader:Zt.points_vert,fragmentShader:Zt.points_frag},dashed:{uniforms:De([mt.common,mt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Zt.linedashed_vert,fragmentShader:Zt.linedashed_frag},depth:{uniforms:De([mt.common,mt.displacementmap]),vertexShader:Zt.depth_vert,fragmentShader:Zt.depth_frag},normal:{uniforms:De([mt.common,mt.bumpmap,mt.normalmap,mt.displacementmap,{opacity:{value:1}}]),vertexShader:Zt.meshnormal_vert,fragmentShader:Zt.meshnormal_frag},sprite:{uniforms:De([mt.sprite,mt.fog]),vertexShader:Zt.sprite_vert,fragmentShader:Zt.sprite_frag},background:{uniforms:{uvTransform:{value:new qt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Zt.background_vert,fragmentShader:Zt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new qt}},vertexShader:Zt.backgroundCube_vert,fragmentShader:Zt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Zt.cube_vert,fragmentShader:Zt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Zt.equirect_vert,fragmentShader:Zt.equirect_frag},distanceRGBA:{uniforms:De([mt.common,mt.displacementmap,{referencePosition:{value:new A},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Zt.distanceRGBA_vert,fragmentShader:Zt.distanceRGBA_frag},shadow:{uniforms:De([mt.lights,mt.fog,{color:{value:new Kt(0)},opacity:{value:1}}]),vertexShader:Zt.shadow_vert,fragmentShader:Zt.shadow_frag}};nn.physical={uniforms:De([nn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new qt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new qt},clearcoatNormalScale:{value:new dt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new qt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new qt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new qt},sheen:{value:0},sheenColor:{value:new Kt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new qt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new qt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new qt},transmissionSamplerSize:{value:new dt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new qt},attenuationDistance:{value:0},attenuationColor:{value:new Kt(0)},specularColor:{value:new Kt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new qt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new qt},anisotropyVector:{value:new dt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new qt}}]),vertexShader:Zt.meshphysical_vert,fragmentShader:Zt.meshphysical_frag};const Bs={r:0,b:0,g:0},Wn=new en,Up=new ce;function Fp(s,t,e,n,i,r,a){const o=new Kt(0);let l=r===!0?0:1,c,h,u=null,f=0,d=null;function g(M){let x=M.isScene===!0?M.background:null;return x&&x.isTexture&&(x=(M.backgroundBlurriness>0?e:t).get(x)),x}function _(M){let x=!1;const w=g(M);w===null?p(o,l):w&&w.isColor&&(p(w,1),x=!0);const b=s.xr.getEnvironmentBlendMode();b==="additive"?n.buffers.color.setClear(0,0,0,1,a):b==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(s.autoClear||x)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function m(M,x){const w=g(x);w&&(w.isCubeTexture||w.mapping===Qs)?(h===void 0&&(h=new Et(new Xt(1,1,1),new Pn({name:"BackgroundCubeMaterial",uniforms:Li(nn.backgroundCube.uniforms),vertexShader:nn.backgroundCube.vertexShader,fragmentShader:nn.backgroundCube.fragmentShader,side:Ce,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(b,R,L){this.matrixWorld.copyPosition(L.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),Wn.copy(x.backgroundRotation),Wn.x*=-1,Wn.y*=-1,Wn.z*=-1,w.isCubeTexture&&w.isRenderTargetTexture===!1&&(Wn.y*=-1,Wn.z*=-1),h.material.uniforms.envMap.value=w,h.material.uniforms.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Up.makeRotationFromEuler(Wn)),h.material.toneMapped=Qt.getTransfer(w.colorSpace)!==se,(u!==w||f!==w.version||d!==s.toneMapping)&&(h.material.needsUpdate=!0,u=w,f=w.version,d=s.toneMapping),h.layers.enableAll(),M.unshift(h,h.geometry,h.material,0,0,null)):w&&w.isTexture&&(c===void 0&&(c=new Et(new ze(2,2),new Pn({name:"BackgroundMaterial",uniforms:Li(nn.background.uniforms),vertexShader:nn.background.vertexShader,fragmentShader:nn.background.fragmentShader,side:Dn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=w,c.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,c.material.toneMapped=Qt.getTransfer(w.colorSpace)!==se,w.matrixAutoUpdate===!0&&w.updateMatrix(),c.material.uniforms.uvTransform.value.copy(w.matrix),(u!==w||f!==w.version||d!==s.toneMapping)&&(c.material.needsUpdate=!0,u=w,f=w.version,d=s.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null))}function p(M,x){M.getRGB(Bs,Vl(s)),n.buffers.color.setClear(Bs.r,Bs.g,Bs.b,x,a)}function E(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(M,x=1){o.set(M),l=x,p(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(M){l=M,p(o,l)},render:_,addToRenderList:m,dispose:E}}function Bp(s,t){const e=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=f(null);let r=i,a=!1;function o(y,D,B,O,H){let X=!1;const k=u(O,B,D);r!==k&&(r=k,c(r.object)),X=d(y,O,B,H),X&&g(y,O,B,H),H!==null&&t.update(H,s.ELEMENT_ARRAY_BUFFER),(X||a)&&(a=!1,x(y,D,B,O),H!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(H).buffer))}function l(){return s.createVertexArray()}function c(y){return s.bindVertexArray(y)}function h(y){return s.deleteVertexArray(y)}function u(y,D,B){const O=B.wireframe===!0;let H=n[y.id];H===void 0&&(H={},n[y.id]=H);let X=H[D.id];X===void 0&&(X={},H[D.id]=X);let k=X[O];return k===void 0&&(k=f(l()),X[O]=k),k}function f(y){const D=[],B=[],O=[];for(let H=0;H<e;H++)D[H]=0,B[H]=0,O[H]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:B,attributeDivisors:O,object:y,attributes:{},index:null}}function d(y,D,B,O){const H=r.attributes,X=D.attributes;let k=0;const Q=B.getAttributes();for(const F in Q)if(Q[F].location>=0){const ot=H[F];let ft=X[F];if(ft===void 0&&(F==="instanceMatrix"&&y.instanceMatrix&&(ft=y.instanceMatrix),F==="instanceColor"&&y.instanceColor&&(ft=y.instanceColor)),ot===void 0||ot.attribute!==ft||ft&&ot.data!==ft.data)return!0;k++}return r.attributesNum!==k||r.index!==O}function g(y,D,B,O){const H={},X=D.attributes;let k=0;const Q=B.getAttributes();for(const F in Q)if(Q[F].location>=0){let ot=X[F];ot===void 0&&(F==="instanceMatrix"&&y.instanceMatrix&&(ot=y.instanceMatrix),F==="instanceColor"&&y.instanceColor&&(ot=y.instanceColor));const ft={};ft.attribute=ot,ot&&ot.data&&(ft.data=ot.data),H[F]=ft,k++}r.attributes=H,r.attributesNum=k,r.index=O}function _(){const y=r.newAttributes;for(let D=0,B=y.length;D<B;D++)y[D]=0}function m(y){p(y,0)}function p(y,D){const B=r.newAttributes,O=r.enabledAttributes,H=r.attributeDivisors;B[y]=1,O[y]===0&&(s.enableVertexAttribArray(y),O[y]=1),H[y]!==D&&(s.vertexAttribDivisor(y,D),H[y]=D)}function E(){const y=r.newAttributes,D=r.enabledAttributes;for(let B=0,O=D.length;B<O;B++)D[B]!==y[B]&&(s.disableVertexAttribArray(B),D[B]=0)}function M(y,D,B,O,H,X,k){k===!0?s.vertexAttribIPointer(y,D,B,H,X):s.vertexAttribPointer(y,D,B,O,H,X)}function x(y,D,B,O){_();const H=O.attributes,X=B.getAttributes(),k=D.defaultAttributeValues;for(const Q in X){const F=X[Q];if(F.location>=0){let $=H[Q];if($===void 0&&(Q==="instanceMatrix"&&y.instanceMatrix&&($=y.instanceMatrix),Q==="instanceColor"&&y.instanceColor&&($=y.instanceColor)),$!==void 0){const ot=$.normalized,ft=$.itemSize,Dt=t.get($);if(Dt===void 0)continue;const Ut=Dt.buffer,W=Dt.type,tt=Dt.bytesPerElement,et=W===s.INT||W===s.UNSIGNED_INT||$.gpuType===Ba;if($.isInterleavedBufferAttribute){const K=$.data,ct=K.stride,st=$.offset;if(K.isInstancedInterleavedBuffer){for(let Z=0;Z<F.locationSize;Z++)p(F.location+Z,K.meshPerAttribute);y.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=K.meshPerAttribute*K.count)}else for(let Z=0;Z<F.locationSize;Z++)m(F.location+Z);s.bindBuffer(s.ARRAY_BUFFER,Ut);for(let Z=0;Z<F.locationSize;Z++)M(F.location+Z,ft/F.locationSize,W,ot,ct*tt,(st+ft/F.locationSize*Z)*tt,et)}else{if($.isInstancedBufferAttribute){for(let K=0;K<F.locationSize;K++)p(F.location+K,$.meshPerAttribute);y.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=$.meshPerAttribute*$.count)}else for(let K=0;K<F.locationSize;K++)m(F.location+K);s.bindBuffer(s.ARRAY_BUFFER,Ut);for(let K=0;K<F.locationSize;K++)M(F.location+K,ft/F.locationSize,W,ot,ft*tt,ft/F.locationSize*K*tt,et)}}else if(k!==void 0){const ot=k[Q];if(ot!==void 0)switch(ot.length){case 2:s.vertexAttrib2fv(F.location,ot);break;case 3:s.vertexAttrib3fv(F.location,ot);break;case 4:s.vertexAttrib4fv(F.location,ot);break;default:s.vertexAttrib1fv(F.location,ot)}}}}E()}function w(){L();for(const y in n){const D=n[y];for(const B in D){const O=D[B];for(const H in O)h(O[H].object),delete O[H];delete D[B]}delete n[y]}}function b(y){if(n[y.id]===void 0)return;const D=n[y.id];for(const B in D){const O=D[B];for(const H in O)h(O[H].object),delete O[H];delete D[B]}delete n[y.id]}function R(y){for(const D in n){const B=n[D];if(B[y.id]===void 0)continue;const O=B[y.id];for(const H in O)h(O[H].object),delete O[H];delete B[y.id]}}function L(){S(),a=!0,r!==i&&(r=i,c(r.object))}function S(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:L,resetDefaultState:S,dispose:w,releaseStatesOfGeometry:b,releaseStatesOfProgram:R,initAttributes:_,enableAttribute:m,disableUnusedAttributes:E}}function kp(s,t,e){let n;function i(c){n=c}function r(c,h){s.drawArrays(n,c,h),e.update(h,n,1)}function a(c,h,u){u!==0&&(s.drawArraysInstanced(n,c,h,u),e.update(h,n,u))}function o(c,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,u);let d=0;for(let g=0;g<u;g++)d+=h[g];e.update(d,n,1)}function l(c,h,u,f){if(u===0)return;const d=t.get("WEBGL_multi_draw");if(d===null)for(let g=0;g<c.length;g++)a(c[g],h[g],f[g]);else{d.multiDrawArraysInstancedWEBGL(n,c,0,h,0,f,0,u);let g=0;for(let _=0;_<u;_++)g+=h[_]*f[_];e.update(g,n,1)}}this.setMode=i,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function zp(s,t,e,n){let i;function r(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){const R=t.get("EXT_texture_filter_anisotropic");i=s.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(R){return!(R!==Je&&n.convert(R)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(R){const L=R===cs&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(R!==an&&n.convert(R)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==gn&&!L)}function l(R){if(R==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=e.logarithmicDepthBuffer===!0,f=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),d=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),g=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=s.getParameter(s.MAX_TEXTURE_SIZE),m=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),p=s.getParameter(s.MAX_VERTEX_ATTRIBS),E=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),M=s.getParameter(s.MAX_VARYING_VECTORS),x=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),w=g>0,b=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reverseDepthBuffer:f,maxTextures:d,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:E,maxVaryings:M,maxFragmentUniforms:x,vertexTextures:w,maxSamples:b}}function Hp(s){const t=this;let e=null,n=0,i=!1,r=!1;const a=new Ve,o=new qt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){const d=u.length!==0||f||n!==0||i;return i=f,n=u.length,d},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){e=h(u,f,0)},this.setState=function(u,f,d){const g=u.clippingPlanes,_=u.clipIntersection,m=u.clipShadows,p=s.get(u);if(!i||g===null||g.length===0||r&&!m)r?h(null):c();else{const E=r?0:n,M=E*4;let x=p.clippingState||null;l.value=x,x=h(g,f,M,d);for(let w=0;w!==M;++w)x[w]=e[w];p.clippingState=x,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=E}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,f,d,g){const _=u!==null?u.length:0;let m=null;if(_!==0){if(m=l.value,g!==!0||m===null){const p=d+_*4,E=f.matrixWorldInverse;o.getNormalMatrix(E),(m===null||m.length<p)&&(m=new Float32Array(p));for(let M=0,x=d;M!==_;++M,x+=4)a.copy(u[M]).applyMatrix4(E,o),a.normal.toArray(m,x),m[x+3]=a.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,m}}function Vp(s){let t=new WeakMap;function e(a,o){return o===ta?a.mapping=Ai:o===ea&&(a.mapping=Ri),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===ta||o===ea)if(t.has(a)){const l=t.get(a).texture;return e(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new Zh(l.height);return c.fromEquirectangularTexture(s,a),t.set(a,c),a.addEventListener("dispose",i),e(c.texture,a.mapping)}else return null}}return a}function i(a){const o=a.target;o.removeEventListener("dispose",i);const l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}const Si=4,Jo=[.125,.215,.35,.446,.526,.582],Kn=20,Ur=new nc,Qo=new Kt;let Fr=null,Br=0,kr=0,zr=!1;const Yn=(1+Math.sqrt(5))/2,xi=1/Yn,tl=[new A(-Yn,xi,0),new A(Yn,xi,0),new A(-xi,0,Yn),new A(xi,0,Yn),new A(0,Yn,-xi),new A(0,Yn,xi),new A(-1,1,-1),new A(1,1,-1),new A(-1,1,1),new A(1,1,1)],Gp=new A;class el{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100,r={}){const{size:a=256,position:o=Gp}=r;Fr=this._renderer.getRenderTarget(),Br=this._renderer.getActiveCubeFace(),kr=this._renderer.getActiveMipmapLevel(),zr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,n,i,l,o),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=sl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=il(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Fr,Br,kr),this._renderer.xr.enabled=zr,t.scissorTest=!1,ks(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Ai||t.mapping===Ri?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Fr=this._renderer.getRenderTarget(),Br=this._renderer.getActiveCubeFace(),kr=this._renderer.getActiveMipmapLevel(),zr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:rn,minFilter:rn,generateMipmaps:!1,type:cs,format:Je,colorSpace:Di,depthBuffer:!1},i=nl(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=nl(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Wp(r)),this._blurMaterial=Xp(r,t,e)}return i}_compileMaterial(t){const e=new Et(this._lodPlanes[0],t);this._renderer.compile(e,Ur)}_sceneToCubeUV(t,e,n,i,r){const l=new Ue(90,1,e,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,d=u.toneMapping;u.getClearColor(Qo),u.toneMapping=Rn,u.autoClear=!1;const g=new Oe({name:"PMREM.Background",side:Ce,depthWrite:!1,depthTest:!1}),_=new Et(new Xt,g);let m=!1;const p=t.background;p?p.isColor&&(g.color.copy(p),t.background=null,m=!0):(g.color.copy(Qo),m=!0);for(let E=0;E<6;E++){const M=E%3;M===0?(l.up.set(0,c[E],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[E],r.y,r.z)):M===1?(l.up.set(0,0,c[E]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[E],r.z)):(l.up.set(0,c[E],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[E]));const x=this._cubeSize;ks(i,M*x,E>2?x:0,x,x),u.setRenderTarget(i),m&&u.render(_,l),u.render(t,l)}_.geometry.dispose(),_.material.dispose(),u.toneMapping=d,u.autoClear=f,t.background=p}_textureToCubeUV(t,e){const n=this._renderer,i=t.mapping===Ai||t.mapping===Ri;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=sl()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=il());const r=i?this._cubemapMaterial:this._equirectMaterial,a=new Et(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=t;const l=this._cubeSize;ks(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(a,Ur)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const i=this._lodPlanes.length;for(let r=1;r<i;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=tl[(i-r-1)%tl.length];this._blur(t,r-1,r,a,o)}e.autoClear=n}_blur(t,e,n,i,r){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,i,"latitudinal",r),this._halfBlur(a,t,n,n,i,"longitudinal",r)}_halfBlur(t,e,n,i,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new Et(this._lodPlanes[i],c),f=c.uniforms,d=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*Kn-1),_=r/g,m=isFinite(r)?1+Math.floor(h*_):Kn;m>Kn&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Kn}`);const p=[];let E=0;for(let R=0;R<Kn;++R){const L=R/_,S=Math.exp(-L*L/2);p.push(S),R===0?E+=S:R<m&&(E+=2*S)}for(let R=0;R<p.length;R++)p[R]=p[R]/E;f.envMap.value=t.texture,f.samples.value=m,f.weights.value=p,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);const{_lodMax:M}=this;f.dTheta.value=g,f.mipInt.value=M-n;const x=this._sizeLods[i],w=3*x*(i>M-Si?i-M+Si:0),b=4*(this._cubeSize-x);ks(e,w,b,3*x,2*x),l.setRenderTarget(e),l.render(u,Ur)}}function Wp(s){const t=[],e=[],n=[];let i=s;const r=s-Si+1+Jo.length;for(let a=0;a<r;a++){const o=Math.pow(2,i);e.push(o);let l=1/o;a>s-Si?l=Jo[a-s+Si-1]:a===0&&(l=0),n.push(l);const c=1/(o-2),h=-c,u=1+c,f=[h,h,u,h,u,u,h,h,u,u,h,u],d=6,g=6,_=3,m=2,p=1,E=new Float32Array(_*g*d),M=new Float32Array(m*g*d),x=new Float32Array(p*g*d);for(let b=0;b<d;b++){const R=b%3*2/3-1,L=b>2?0:-1,S=[R,L,0,R+2/3,L,0,R+2/3,L+1,0,R,L,0,R+2/3,L+1,0,R,L+1,0];E.set(S,_*g*b),M.set(f,m*g*b);const y=[b,b,b,b,b,b];x.set(y,p*g*b)}const w=new Te;w.setAttribute("position",new xe(E,_)),w.setAttribute("uv",new xe(M,m)),w.setAttribute("faceIndex",new xe(x,p)),t.push(w),i>Si&&i--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function nl(s,t,e){const n=new Qn(s,t,e);return n.texture.mapping=Qs,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ks(s,t,e,n,i){s.viewport.set(t,e,n,i),s.scissor.set(t,e,n,i)}function Xp(s,t,e){const n=new Float32Array(Kn),i=new A(0,1,0);return new Pn({name:"SphericalGaussianBlur",defines:{n:Kn,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:to(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:An,depthTest:!1,depthWrite:!1})}function il(){return new Pn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:to(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:An,depthTest:!1,depthWrite:!1})}function sl(){return new Pn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:to(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:An,depthTest:!1,depthWrite:!1})}function to(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Yp(s){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===ta||l===ea,h=l===Ai||l===Ri;if(c||h){let u=t.get(o);const f=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==f)return e===null&&(e=new el(s)),u=c?e.fromEquirectangular(o,u):e.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),u.texture;if(u!==void 0)return u.texture;{const d=o.image;return c&&d&&d.height>0||h&&d&&i(d)?(e===null&&(e=new el(s)),u=c?e.fromEquirectangular(o):e.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),o.addEventListener("dispose",r),u.texture):null}}}return o}function i(o){let l=0;const c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function r(o){const l=o.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:a}}function qp(s){const t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const i=e(n);return i===null&&bi("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Kp(s,t,e,n){const i={},r=new WeakMap;function a(u){const f=u.target;f.index!==null&&t.remove(f.index);for(const g in f.attributes)t.remove(f.attributes[g]);f.removeEventListener("dispose",a),delete i[f.id];const d=r.get(f);d&&(t.remove(d),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function o(u,f){return i[f.id]===!0||(f.addEventListener("dispose",a),i[f.id]=!0,e.memory.geometries++),f}function l(u){const f=u.attributes;for(const d in f)t.update(f[d],s.ARRAY_BUFFER)}function c(u){const f=[],d=u.index,g=u.attributes.position;let _=0;if(d!==null){const E=d.array;_=d.version;for(let M=0,x=E.length;M<x;M+=3){const w=E[M+0],b=E[M+1],R=E[M+2];f.push(w,b,b,R,R,w)}}else if(g!==void 0){const E=g.array;_=g.version;for(let M=0,x=E.length/3-1;M<x;M+=3){const w=M+0,b=M+1,R=M+2;f.push(w,b,b,R,R,w)}}else return;const m=new(Fl(f)?Hl:zl)(f,1);m.version=_;const p=r.get(u);p&&t.remove(p),r.set(u,m)}function h(u){const f=r.get(u);if(f){const d=u.index;d!==null&&f.version<d.version&&c(u)}else c(u);return r.get(u)}return{get:o,update:l,getWireframeAttribute:h}}function Zp(s,t,e){let n;function i(f){n=f}let r,a;function o(f){r=f.type,a=f.bytesPerElement}function l(f,d){s.drawElements(n,d,r,f*a),e.update(d,n,1)}function c(f,d,g){g!==0&&(s.drawElementsInstanced(n,d,r,f*a,g),e.update(d,n,g))}function h(f,d,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,f,0,g);let m=0;for(let p=0;p<g;p++)m+=d[p];e.update(m,n,1)}function u(f,d,g,_){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<f.length;p++)c(f[p]/a,d[p],_[p]);else{m.multiDrawElementsInstancedWEBGL(n,d,0,r,f,0,_,0,g);let p=0;for(let E=0;E<g;E++)p+=d[E]*_[E];e.update(p,n,1)}}this.setMode=i,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function jp(s){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case s.TRIANGLES:e.triangles+=o*(r/3);break;case s.LINES:e.lines+=o*(r/2);break;case s.LINE_STRIP:e.lines+=o*(r-1);break;case s.LINE_LOOP:e.lines+=o*r;break;case s.POINTS:e.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function $p(s,t,e){const n=new WeakMap,i=new oe;function r(a,o,l){const c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0;let f=n.get(o);if(f===void 0||f.count!==u){let S=function(){R.dispose(),n.delete(o),o.removeEventListener("dispose",S)};f!==void 0&&f.texture.dispose();const d=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,_=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],E=o.morphAttributes.color||[];let M=0;d===!0&&(M=1),g===!0&&(M=2),_===!0&&(M=3);let x=o.attributes.position.count*M,w=1;x>t.maxTextureSize&&(w=Math.ceil(x/t.maxTextureSize),x=t.maxTextureSize);const b=new Float32Array(x*w*4*u),R=new Bl(b,x,w,u);R.type=gn,R.needsUpdate=!0;const L=M*4;for(let y=0;y<u;y++){const D=m[y],B=p[y],O=E[y],H=x*w*4*y;for(let X=0;X<D.count;X++){const k=X*L;d===!0&&(i.fromBufferAttribute(D,X),b[H+k+0]=i.x,b[H+k+1]=i.y,b[H+k+2]=i.z,b[H+k+3]=0),g===!0&&(i.fromBufferAttribute(B,X),b[H+k+4]=i.x,b[H+k+5]=i.y,b[H+k+6]=i.z,b[H+k+7]=0),_===!0&&(i.fromBufferAttribute(O,X),b[H+k+8]=i.x,b[H+k+9]=i.y,b[H+k+10]=i.z,b[H+k+11]=O.itemSize===4?i.w:1)}}f={count:u,texture:R,size:new dt(x,w)},n.set(o,f),o.addEventListener("dispose",S)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",a.morphTexture,e);else{let d=0;for(let _=0;_<c.length;_++)d+=c[_];const g=o.morphTargetsRelative?1:1-d;l.getUniforms().setValue(s,"morphTargetBaseInfluence",g),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",f.texture,e),l.getUniforms().setValue(s,"morphTargetsTextureSize",f.size)}return{update:r}}function Jp(s,t,e,n){let i=new WeakMap;function r(l){const c=n.render.frame,h=l.geometry,u=t.get(l,h);if(i.get(u)!==c&&(t.update(u),i.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),i.get(l)!==c&&(e.update(l.instanceMatrix,s.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,s.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;i.get(f)!==c&&(f.update(),i.set(f,c))}return u}function a(){i=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:a}}const ac=new Le,rl=new Yl(1,1),oc=new Bl,lc=new Lh,cc=new Wl,al=[],ol=[],ll=new Float32Array(16),cl=new Float32Array(9),hl=new Float32Array(4);function Ni(s,t,e){const n=s[0];if(n<=0||n>0)return s;const i=t*e;let r=al[i];if(r===void 0&&(r=new Float32Array(i),al[i]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,s[a].toArray(r,o)}return r}function Me(s,t){if(s.length!==t.length)return!1;for(let e=0,n=s.length;e<n;e++)if(s[e]!==t[e])return!1;return!0}function ye(s,t){for(let e=0,n=t.length;e<n;e++)s[e]=t[e]}function ir(s,t){let e=ol[t];e===void 0&&(e=new Int32Array(t),ol[t]=e);for(let n=0;n!==t;++n)e[n]=s.allocateTextureUnit();return e}function Qp(s,t){const e=this.cache;e[0]!==t&&(s.uniform1f(this.addr,t),e[0]=t)}function tm(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Me(e,t))return;s.uniform2fv(this.addr,t),ye(e,t)}}function em(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Me(e,t))return;s.uniform3fv(this.addr,t),ye(e,t)}}function nm(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Me(e,t))return;s.uniform4fv(this.addr,t),ye(e,t)}}function im(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Me(e,t))return;s.uniformMatrix2fv(this.addr,!1,t),ye(e,t)}else{if(Me(e,n))return;hl.set(n),s.uniformMatrix2fv(this.addr,!1,hl),ye(e,n)}}function sm(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Me(e,t))return;s.uniformMatrix3fv(this.addr,!1,t),ye(e,t)}else{if(Me(e,n))return;cl.set(n),s.uniformMatrix3fv(this.addr,!1,cl),ye(e,n)}}function rm(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Me(e,t))return;s.uniformMatrix4fv(this.addr,!1,t),ye(e,t)}else{if(Me(e,n))return;ll.set(n),s.uniformMatrix4fv(this.addr,!1,ll),ye(e,n)}}function am(s,t){const e=this.cache;e[0]!==t&&(s.uniform1i(this.addr,t),e[0]=t)}function om(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Me(e,t))return;s.uniform2iv(this.addr,t),ye(e,t)}}function lm(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Me(e,t))return;s.uniform3iv(this.addr,t),ye(e,t)}}function cm(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Me(e,t))return;s.uniform4iv(this.addr,t),ye(e,t)}}function hm(s,t){const e=this.cache;e[0]!==t&&(s.uniform1ui(this.addr,t),e[0]=t)}function um(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Me(e,t))return;s.uniform2uiv(this.addr,t),ye(e,t)}}function dm(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Me(e,t))return;s.uniform3uiv(this.addr,t),ye(e,t)}}function fm(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Me(e,t))return;s.uniform4uiv(this.addr,t),ye(e,t)}}function pm(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(rl.compareFunction=Ul,r=rl):r=ac,e.setTexture2D(t||r,i)}function mm(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||lc,i)}function gm(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||cc,i)}function _m(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||oc,i)}function vm(s){switch(s){case 5126:return Qp;case 35664:return tm;case 35665:return em;case 35666:return nm;case 35674:return im;case 35675:return sm;case 35676:return rm;case 5124:case 35670:return am;case 35667:case 35671:return om;case 35668:case 35672:return lm;case 35669:case 35673:return cm;case 5125:return hm;case 36294:return um;case 36295:return dm;case 36296:return fm;case 35678:case 36198:case 36298:case 36306:case 35682:return pm;case 35679:case 36299:case 36307:return mm;case 35680:case 36300:case 36308:case 36293:return gm;case 36289:case 36303:case 36311:case 36292:return _m}}function xm(s,t){s.uniform1fv(this.addr,t)}function Mm(s,t){const e=Ni(t,this.size,2);s.uniform2fv(this.addr,e)}function ym(s,t){const e=Ni(t,this.size,3);s.uniform3fv(this.addr,e)}function Sm(s,t){const e=Ni(t,this.size,4);s.uniform4fv(this.addr,e)}function Tm(s,t){const e=Ni(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,e)}function Em(s,t){const e=Ni(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,e)}function bm(s,t){const e=Ni(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,e)}function wm(s,t){s.uniform1iv(this.addr,t)}function Cm(s,t){s.uniform2iv(this.addr,t)}function Am(s,t){s.uniform3iv(this.addr,t)}function Rm(s,t){s.uniform4iv(this.addr,t)}function Dm(s,t){s.uniform1uiv(this.addr,t)}function Pm(s,t){s.uniform2uiv(this.addr,t)}function Lm(s,t){s.uniform3uiv(this.addr,t)}function Im(s,t){s.uniform4uiv(this.addr,t)}function Nm(s,t,e){const n=this.cache,i=t.length,r=ir(e,i);Me(n,r)||(s.uniform1iv(this.addr,r),ye(n,r));for(let a=0;a!==i;++a)e.setTexture2D(t[a]||ac,r[a])}function Om(s,t,e){const n=this.cache,i=t.length,r=ir(e,i);Me(n,r)||(s.uniform1iv(this.addr,r),ye(n,r));for(let a=0;a!==i;++a)e.setTexture3D(t[a]||lc,r[a])}function Um(s,t,e){const n=this.cache,i=t.length,r=ir(e,i);Me(n,r)||(s.uniform1iv(this.addr,r),ye(n,r));for(let a=0;a!==i;++a)e.setTextureCube(t[a]||cc,r[a])}function Fm(s,t,e){const n=this.cache,i=t.length,r=ir(e,i);Me(n,r)||(s.uniform1iv(this.addr,r),ye(n,r));for(let a=0;a!==i;++a)e.setTexture2DArray(t[a]||oc,r[a])}function Bm(s){switch(s){case 5126:return xm;case 35664:return Mm;case 35665:return ym;case 35666:return Sm;case 35674:return Tm;case 35675:return Em;case 35676:return bm;case 5124:case 35670:return wm;case 35667:case 35671:return Cm;case 35668:case 35672:return Am;case 35669:case 35673:return Rm;case 5125:return Dm;case 36294:return Pm;case 36295:return Lm;case 36296:return Im;case 35678:case 36198:case 36298:case 36306:case 35682:return Nm;case 35679:case 36299:case 36307:return Om;case 35680:case 36300:case 36308:case 36293:return Um;case 36289:case 36303:case 36311:case 36292:return Fm}}class km{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=vm(e.type)}}class zm{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Bm(e.type)}}class Hm{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const i=this.seq;for(let r=0,a=i.length;r!==a;++r){const o=i[r];o.setValue(t,e[o.id],n)}}}const Hr=/(\w+)(\])?(\[|\.)?/g;function ul(s,t){s.seq.push(t),s.map[t.id]=t}function Vm(s,t,e){const n=s.name,i=n.length;for(Hr.lastIndex=0;;){const r=Hr.exec(n),a=Hr.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===i){ul(e,c===void 0?new km(o,s,t):new zm(o,s,t));break}else{let u=e.map[o];u===void 0&&(u=new Hm(o),ul(e,u)),e=u}}}class qs{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const r=t.getActiveUniform(e,i),a=t.getUniformLocation(e,r.name);Vm(r,a,this)}}setValue(t,e,n,i){const r=this.map[e];r!==void 0&&r.setValue(t,n,i)}setOptional(t,e,n){const i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let r=0,a=e.length;r!==a;++r){const o=e[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,i)}}static seqWithValue(t,e){const n=[];for(let i=0,r=t.length;i!==r;++i){const a=t[i];a.id in e&&n.push(a)}return n}}function dl(s,t,e){const n=s.createShader(t);return s.shaderSource(n,e),s.compileShader(n),n}const Gm=37297;let Wm=0;function Xm(s,t){const e=s.split(`
`),n=[],i=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=i;a<r;a++){const o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}const fl=new qt;function Ym(s){Qt._getMatrix(fl,Qt.workingColorSpace,s);const t=`mat3( ${fl.elements.map(e=>e.toFixed(4))} )`;switch(Qt.getTransfer(s)){case Ks:return[t,"LinearTransferOETF"];case se:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",s),[t,"LinearTransferOETF"]}}function pl(s,t,e){const n=s.getShaderParameter(t,s.COMPILE_STATUS),i=s.getShaderInfoLog(t).trim();if(n&&i==="")return"";const r=/ERROR: 0:(\d+)/.exec(i);if(r){const a=parseInt(r[1]);return e.toUpperCase()+`

`+i+`

`+Xm(s.getShaderSource(t),a)}else return i}function qm(s,t){const e=Ym(t);return[`vec4 ${s}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function Km(s,t){let e;switch(t){case Gc:e="Linear";break;case Wc:e="Reinhard";break;case Xc:e="Cineon";break;case Yc:e="ACESFilmic";break;case Kc:e="AgX";break;case Zc:e="Neutral";break;case qc:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+s+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const zs=new A;function Zm(){Qt.getLuminanceCoefficients(zs);const s=zs.x.toFixed(4),t=zs.y.toFixed(4),e=zs.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function jm(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Yi).join(`
`)}function $m(s){const t=[];for(const e in s){const n=s[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Jm(s,t){const e={},n=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const r=s.getActiveAttrib(t,i),a=r.name;let o=1;r.type===s.FLOAT_MAT2&&(o=2),r.type===s.FLOAT_MAT3&&(o=3),r.type===s.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:s.getAttribLocation(t,a),locationSize:o}}return e}function Yi(s){return s!==""}function ml(s,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function gl(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Qm=/^[ \t]*#include +<([\w\d./]+)>/gm;function Oa(s){return s.replace(Qm,eg)}const tg=new Map;function eg(s,t){let e=Zt[t];if(e===void 0){const n=tg.get(t);if(n!==void 0)e=Zt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Oa(e)}const ng=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function _l(s){return s.replace(ng,ig)}function ig(s,t,e,n){let i="";for(let r=parseInt(t);r<parseInt(e);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function vl(s){let t=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?t+=`
#define HIGH_PRECISION`:s.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function sg(s){let t="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===wl?t="SHADOWMAP_TYPE_PCF":s.shadowMapType===Sc?t="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===mn&&(t="SHADOWMAP_TYPE_VSM"),t}function rg(s){let t="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case Ai:case Ri:t="ENVMAP_TYPE_CUBE";break;case Qs:t="ENVMAP_TYPE_CUBE_UV";break}return t}function ag(s){let t="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case Ri:t="ENVMAP_MODE_REFRACTION";break}return t}function og(s){let t="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case Fa:t="ENVMAP_BLENDING_MULTIPLY";break;case Hc:t="ENVMAP_BLENDING_MIX";break;case Vc:t="ENVMAP_BLENDING_ADD";break}return t}function lg(s){const t=s.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function cg(s,t,e,n){const i=s.getContext(),r=e.defines;let a=e.vertexShader,o=e.fragmentShader;const l=sg(e),c=rg(e),h=ag(e),u=og(e),f=lg(e),d=jm(e),g=$m(r),_=i.createProgram();let m,p,E=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Yi).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Yi).join(`
`),p.length>0&&(p+=`
`)):(m=[vl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Yi).join(`
`),p=[vl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Rn?"#define TONE_MAPPING":"",e.toneMapping!==Rn?Zt.tonemapping_pars_fragment:"",e.toneMapping!==Rn?Km("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Zt.colorspace_pars_fragment,qm("linearToOutputTexel",e.outputColorSpace),Zm(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Yi).join(`
`)),a=Oa(a),a=ml(a,e),a=gl(a,e),o=Oa(o),o=ml(o,e),o=gl(o,e),a=_l(a),o=_l(o),e.isRawShaderMaterial!==!0&&(E=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===_o?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===_o?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const M=E+m+a,x=E+p+o,w=dl(i,i.VERTEX_SHADER,M),b=dl(i,i.FRAGMENT_SHADER,x);i.attachShader(_,w),i.attachShader(_,b),e.index0AttributeName!==void 0?i.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_);function R(D){if(s.debug.checkShaderErrors){const B=i.getProgramInfoLog(_).trim(),O=i.getShaderInfoLog(w).trim(),H=i.getShaderInfoLog(b).trim();let X=!0,k=!0;if(i.getProgramParameter(_,i.LINK_STATUS)===!1)if(X=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,_,w,b);else{const Q=pl(i,w,"vertex"),F=pl(i,b,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,i.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+B+`
`+Q+`
`+F)}else B!==""?console.warn("THREE.WebGLProgram: Program Info Log:",B):(O===""||H==="")&&(k=!1);k&&(D.diagnostics={runnable:X,programLog:B,vertexShader:{log:O,prefix:m},fragmentShader:{log:H,prefix:p}})}i.deleteShader(w),i.deleteShader(b),L=new qs(i,_),S=Jm(i,_)}let L;this.getUniforms=function(){return L===void 0&&R(this),L};let S;this.getAttributes=function(){return S===void 0&&R(this),S};let y=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=i.getProgramParameter(_,Gm)),y},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Wm++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=w,this.fragmentShader=b,this}let hg=0;class ug{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new dg(t),e.set(t,n)),n}}class dg{constructor(t){this.id=hg++,this.code=t,this.usedTimes=0}}function fg(s,t,e,n,i,r,a){const o=new qa,l=new ug,c=new Set,h=[],u=i.logarithmicDepthBuffer,f=i.vertexTextures;let d=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(S){return c.add(S),S===0?"uv":`uv${S}`}function m(S,y,D,B,O){const H=B.fog,X=O.geometry,k=S.isMeshStandardMaterial?B.environment:null,Q=(S.isMeshStandardMaterial?e:t).get(S.envMap||k),F=Q&&Q.mapping===Qs?Q.image.height:null,$=g[S.type];S.precision!==null&&(d=i.getMaxPrecision(S.precision),d!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",d,"instead."));const ot=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,ft=ot!==void 0?ot.length:0;let Dt=0;X.morphAttributes.position!==void 0&&(Dt=1),X.morphAttributes.normal!==void 0&&(Dt=2),X.morphAttributes.color!==void 0&&(Dt=3);let Ut,W,tt,et;if($){const ne=nn[$];Ut=ne.vertexShader,W=ne.fragmentShader}else Ut=S.vertexShader,W=S.fragmentShader,l.update(S),tt=l.getVertexShaderID(S),et=l.getFragmentShaderID(S);const K=s.getRenderTarget(),ct=s.state.buffers.depth.getReversed(),st=O.isInstancedMesh===!0,Z=O.isBatchedMesh===!0,ht=!!S.map,Ft=!!S.matcap,Pt=!!Q,P=!!S.aoMap,Mt=!!S.lightMap,ut=!!S.bumpMap,Nt=!!S.normalMap,lt=!!S.displacementMap,At=!!S.emissiveMap,xt=!!S.metalnessMap,bt=!!S.roughnessMap,Ht=S.anisotropy>0,C=S.clearcoat>0,v=S.dispersion>0,z=S.iridescence>0,q=S.sheen>0,J=S.transmission>0,Y=Ht&&!!S.anisotropyMap,Lt=C&&!!S.clearcoatMap,gt=C&&!!S.clearcoatNormalMap,Rt=C&&!!S.clearcoatRoughnessMap,It=z&&!!S.iridescenceMap,nt=z&&!!S.iridescenceThicknessMap,yt=q&&!!S.sheenColorMap,zt=q&&!!S.sheenRoughnessMap,kt=!!S.specularMap,pt=!!S.specularColorMap,Wt=!!S.specularIntensityMap,I=J&&!!S.transmissionMap,_t=J&&!!S.thicknessMap,it=!!S.gradientMap,Tt=!!S.alphaMap,rt=S.alphaTest>0,j=!!S.alphaHash,wt=!!S.extensions;let Yt=Rn;S.toneMapped&&(K===null||K.isXRRenderTarget===!0)&&(Yt=s.toneMapping);const he={shaderID:$,shaderType:S.type,shaderName:S.name,vertexShader:Ut,fragmentShader:W,defines:S.defines,customVertexShaderID:tt,customFragmentShaderID:et,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:d,batching:Z,batchingColor:Z&&O._colorsTexture!==null,instancing:st,instancingColor:st&&O.instanceColor!==null,instancingMorph:st&&O.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:K===null?s.outputColorSpace:K.isXRRenderTarget===!0?K.texture.colorSpace:Di,alphaToCoverage:!!S.alphaToCoverage,map:ht,matcap:Ft,envMap:Pt,envMapMode:Pt&&Q.mapping,envMapCubeUVHeight:F,aoMap:P,lightMap:Mt,bumpMap:ut,normalMap:Nt,displacementMap:f&&lt,emissiveMap:At,normalMapObjectSpace:Nt&&S.normalMapType===Qc,normalMapTangentSpace:Nt&&S.normalMapType===Wa,metalnessMap:xt,roughnessMap:bt,anisotropy:Ht,anisotropyMap:Y,clearcoat:C,clearcoatMap:Lt,clearcoatNormalMap:gt,clearcoatRoughnessMap:Rt,dispersion:v,iridescence:z,iridescenceMap:It,iridescenceThicknessMap:nt,sheen:q,sheenColorMap:yt,sheenRoughnessMap:zt,specularMap:kt,specularColorMap:pt,specularIntensityMap:Wt,transmission:J,transmissionMap:I,thicknessMap:_t,gradientMap:it,opaque:S.transparent===!1&&S.blending===Ei&&S.alphaToCoverage===!1,alphaMap:Tt,alphaTest:rt,alphaHash:j,combine:S.combine,mapUv:ht&&_(S.map.channel),aoMapUv:P&&_(S.aoMap.channel),lightMapUv:Mt&&_(S.lightMap.channel),bumpMapUv:ut&&_(S.bumpMap.channel),normalMapUv:Nt&&_(S.normalMap.channel),displacementMapUv:lt&&_(S.displacementMap.channel),emissiveMapUv:At&&_(S.emissiveMap.channel),metalnessMapUv:xt&&_(S.metalnessMap.channel),roughnessMapUv:bt&&_(S.roughnessMap.channel),anisotropyMapUv:Y&&_(S.anisotropyMap.channel),clearcoatMapUv:Lt&&_(S.clearcoatMap.channel),clearcoatNormalMapUv:gt&&_(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Rt&&_(S.clearcoatRoughnessMap.channel),iridescenceMapUv:It&&_(S.iridescenceMap.channel),iridescenceThicknessMapUv:nt&&_(S.iridescenceThicknessMap.channel),sheenColorMapUv:yt&&_(S.sheenColorMap.channel),sheenRoughnessMapUv:zt&&_(S.sheenRoughnessMap.channel),specularMapUv:kt&&_(S.specularMap.channel),specularColorMapUv:pt&&_(S.specularColorMap.channel),specularIntensityMapUv:Wt&&_(S.specularIntensityMap.channel),transmissionMapUv:I&&_(S.transmissionMap.channel),thicknessMapUv:_t&&_(S.thicknessMap.channel),alphaMapUv:Tt&&_(S.alphaMap.channel),vertexTangents:!!X.attributes.tangent&&(Nt||Ht),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!X.attributes.uv&&(ht||Tt),fog:!!H,useFog:S.fog===!0,fogExp2:!!H&&H.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:ct,skinning:O.isSkinnedMesh===!0,morphTargets:X.morphAttributes.position!==void 0,morphNormals:X.morphAttributes.normal!==void 0,morphColors:X.morphAttributes.color!==void 0,morphTargetsCount:ft,morphTextureStride:Dt,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:S.dithering,shadowMapEnabled:s.shadowMap.enabled&&D.length>0,shadowMapType:s.shadowMap.type,toneMapping:Yt,decodeVideoTexture:ht&&S.map.isVideoTexture===!0&&Qt.getTransfer(S.map.colorSpace)===se,decodeVideoTextureEmissive:At&&S.emissiveMap.isVideoTexture===!0&&Qt.getTransfer(S.emissiveMap.colorSpace)===se,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===le,flipSided:S.side===Ce,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:wt&&S.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(wt&&S.extensions.multiDraw===!0||Z)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return he.vertexUv1s=c.has(1),he.vertexUv2s=c.has(2),he.vertexUv3s=c.has(3),c.clear(),he}function p(S){const y=[];if(S.shaderID?y.push(S.shaderID):(y.push(S.customVertexShaderID),y.push(S.customFragmentShaderID)),S.defines!==void 0)for(const D in S.defines)y.push(D),y.push(S.defines[D]);return S.isRawShaderMaterial===!1&&(E(y,S),M(y,S),y.push(s.outputColorSpace)),y.push(S.customProgramCacheKey),y.join()}function E(S,y){S.push(y.precision),S.push(y.outputColorSpace),S.push(y.envMapMode),S.push(y.envMapCubeUVHeight),S.push(y.mapUv),S.push(y.alphaMapUv),S.push(y.lightMapUv),S.push(y.aoMapUv),S.push(y.bumpMapUv),S.push(y.normalMapUv),S.push(y.displacementMapUv),S.push(y.emissiveMapUv),S.push(y.metalnessMapUv),S.push(y.roughnessMapUv),S.push(y.anisotropyMapUv),S.push(y.clearcoatMapUv),S.push(y.clearcoatNormalMapUv),S.push(y.clearcoatRoughnessMapUv),S.push(y.iridescenceMapUv),S.push(y.iridescenceThicknessMapUv),S.push(y.sheenColorMapUv),S.push(y.sheenRoughnessMapUv),S.push(y.specularMapUv),S.push(y.specularColorMapUv),S.push(y.specularIntensityMapUv),S.push(y.transmissionMapUv),S.push(y.thicknessMapUv),S.push(y.combine),S.push(y.fogExp2),S.push(y.sizeAttenuation),S.push(y.morphTargetsCount),S.push(y.morphAttributeCount),S.push(y.numDirLights),S.push(y.numPointLights),S.push(y.numSpotLights),S.push(y.numSpotLightMaps),S.push(y.numHemiLights),S.push(y.numRectAreaLights),S.push(y.numDirLightShadows),S.push(y.numPointLightShadows),S.push(y.numSpotLightShadows),S.push(y.numSpotLightShadowsWithMaps),S.push(y.numLightProbes),S.push(y.shadowMapType),S.push(y.toneMapping),S.push(y.numClippingPlanes),S.push(y.numClipIntersection),S.push(y.depthPacking)}function M(S,y){o.disableAll(),y.supportsVertexTextures&&o.enable(0),y.instancing&&o.enable(1),y.instancingColor&&o.enable(2),y.instancingMorph&&o.enable(3),y.matcap&&o.enable(4),y.envMap&&o.enable(5),y.normalMapObjectSpace&&o.enable(6),y.normalMapTangentSpace&&o.enable(7),y.clearcoat&&o.enable(8),y.iridescence&&o.enable(9),y.alphaTest&&o.enable(10),y.vertexColors&&o.enable(11),y.vertexAlphas&&o.enable(12),y.vertexUv1s&&o.enable(13),y.vertexUv2s&&o.enable(14),y.vertexUv3s&&o.enable(15),y.vertexTangents&&o.enable(16),y.anisotropy&&o.enable(17),y.alphaHash&&o.enable(18),y.batching&&o.enable(19),y.dispersion&&o.enable(20),y.batchingColor&&o.enable(21),S.push(o.mask),o.disableAll(),y.fog&&o.enable(0),y.useFog&&o.enable(1),y.flatShading&&o.enable(2),y.logarithmicDepthBuffer&&o.enable(3),y.reverseDepthBuffer&&o.enable(4),y.skinning&&o.enable(5),y.morphTargets&&o.enable(6),y.morphNormals&&o.enable(7),y.morphColors&&o.enable(8),y.premultipliedAlpha&&o.enable(9),y.shadowMapEnabled&&o.enable(10),y.doubleSided&&o.enable(11),y.flipSided&&o.enable(12),y.useDepthPacking&&o.enable(13),y.dithering&&o.enable(14),y.transmission&&o.enable(15),y.sheen&&o.enable(16),y.opaque&&o.enable(17),y.pointsUvs&&o.enable(18),y.decodeVideoTexture&&o.enable(19),y.decodeVideoTextureEmissive&&o.enable(20),y.alphaToCoverage&&o.enable(21),S.push(o.mask)}function x(S){const y=g[S.type];let D;if(y){const B=nn[y];D=Xh.clone(B.uniforms)}else D=S.uniforms;return D}function w(S,y){let D;for(let B=0,O=h.length;B<O;B++){const H=h[B];if(H.cacheKey===y){D=H,++D.usedTimes;break}}return D===void 0&&(D=new cg(s,y,S,r),h.push(D)),D}function b(S){if(--S.usedTimes===0){const y=h.indexOf(S);h[y]=h[h.length-1],h.pop(),S.destroy()}}function R(S){l.remove(S)}function L(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:x,acquireProgram:w,releaseProgram:b,releaseShaderCache:R,programs:h,dispose:L}}function pg(){let s=new WeakMap;function t(a){return s.has(a)}function e(a){let o=s.get(a);return o===void 0&&(o={},s.set(a,o)),o}function n(a){s.delete(a)}function i(a,o,l){s.get(a)[o]=l}function r(){s=new WeakMap}return{has:t,get:e,remove:n,update:i,dispose:r}}function mg(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.z!==t.z?s.z-t.z:s.id-t.id}function xl(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function Ml(){const s=[];let t=0;const e=[],n=[],i=[];function r(){t=0,e.length=0,n.length=0,i.length=0}function a(u,f,d,g,_,m){let p=s[t];return p===void 0?(p={id:u.id,object:u,geometry:f,material:d,groupOrder:g,renderOrder:u.renderOrder,z:_,group:m},s[t]=p):(p.id=u.id,p.object=u,p.geometry=f,p.material=d,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=_,p.group=m),t++,p}function o(u,f,d,g,_,m){const p=a(u,f,d,g,_,m);d.transmission>0?n.push(p):d.transparent===!0?i.push(p):e.push(p)}function l(u,f,d,g,_,m){const p=a(u,f,d,g,_,m);d.transmission>0?n.unshift(p):d.transparent===!0?i.unshift(p):e.unshift(p)}function c(u,f){e.length>1&&e.sort(u||mg),n.length>1&&n.sort(f||xl),i.length>1&&i.sort(f||xl)}function h(){for(let u=t,f=s.length;u<f;u++){const d=s[u];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:e,transmissive:n,transparent:i,init:r,push:o,unshift:l,finish:h,sort:c}}function gg(){let s=new WeakMap;function t(n,i){const r=s.get(n);let a;return r===void 0?(a=new Ml,s.set(n,[a])):i>=r.length?(a=new Ml,r.push(a)):a=r[i],a}function e(){s=new WeakMap}return{get:t,dispose:e}}function _g(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new A,color:new Kt};break;case"SpotLight":e={position:new A,direction:new A,color:new Kt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new A,color:new Kt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new A,skyColor:new Kt,groundColor:new Kt};break;case"RectAreaLight":e={color:new Kt,position:new A,halfWidth:new A,halfHeight:new A};break}return s[t.id]=e,e}}}function vg(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new dt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new dt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new dt,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=e,e}}}let xg=0;function Mg(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function yg(s){const t=new _g,e=vg(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new A);const i=new A,r=new ce,a=new ce;function o(c){let h=0,u=0,f=0;for(let S=0;S<9;S++)n.probe[S].set(0,0,0);let d=0,g=0,_=0,m=0,p=0,E=0,M=0,x=0,w=0,b=0,R=0;c.sort(Mg);for(let S=0,y=c.length;S<y;S++){const D=c[S],B=D.color,O=D.intensity,H=D.distance,X=D.shadow&&D.shadow.map?D.shadow.map.texture:null;if(D.isAmbientLight)h+=B.r*O,u+=B.g*O,f+=B.b*O;else if(D.isLightProbe){for(let k=0;k<9;k++)n.probe[k].addScaledVector(D.sh.coefficients[k],O);R++}else if(D.isDirectionalLight){const k=t.get(D);if(k.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const Q=D.shadow,F=e.get(D);F.shadowIntensity=Q.intensity,F.shadowBias=Q.bias,F.shadowNormalBias=Q.normalBias,F.shadowRadius=Q.radius,F.shadowMapSize=Q.mapSize,n.directionalShadow[d]=F,n.directionalShadowMap[d]=X,n.directionalShadowMatrix[d]=D.shadow.matrix,E++}n.directional[d]=k,d++}else if(D.isSpotLight){const k=t.get(D);k.position.setFromMatrixPosition(D.matrixWorld),k.color.copy(B).multiplyScalar(O),k.distance=H,k.coneCos=Math.cos(D.angle),k.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),k.decay=D.decay,n.spot[_]=k;const Q=D.shadow;if(D.map&&(n.spotLightMap[w]=D.map,w++,Q.updateMatrices(D),D.castShadow&&b++),n.spotLightMatrix[_]=Q.matrix,D.castShadow){const F=e.get(D);F.shadowIntensity=Q.intensity,F.shadowBias=Q.bias,F.shadowNormalBias=Q.normalBias,F.shadowRadius=Q.radius,F.shadowMapSize=Q.mapSize,n.spotShadow[_]=F,n.spotShadowMap[_]=X,x++}_++}else if(D.isRectAreaLight){const k=t.get(D);k.color.copy(B).multiplyScalar(O),k.halfWidth.set(D.width*.5,0,0),k.halfHeight.set(0,D.height*.5,0),n.rectArea[m]=k,m++}else if(D.isPointLight){const k=t.get(D);if(k.color.copy(D.color).multiplyScalar(D.intensity),k.distance=D.distance,k.decay=D.decay,D.castShadow){const Q=D.shadow,F=e.get(D);F.shadowIntensity=Q.intensity,F.shadowBias=Q.bias,F.shadowNormalBias=Q.normalBias,F.shadowRadius=Q.radius,F.shadowMapSize=Q.mapSize,F.shadowCameraNear=Q.camera.near,F.shadowCameraFar=Q.camera.far,n.pointShadow[g]=F,n.pointShadowMap[g]=X,n.pointShadowMatrix[g]=D.shadow.matrix,M++}n.point[g]=k,g++}else if(D.isHemisphereLight){const k=t.get(D);k.skyColor.copy(D.color).multiplyScalar(O),k.groundColor.copy(D.groundColor).multiplyScalar(O),n.hemi[p]=k,p++}}m>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=mt.LTC_FLOAT_1,n.rectAreaLTC2=mt.LTC_FLOAT_2):(n.rectAreaLTC1=mt.LTC_HALF_1,n.rectAreaLTC2=mt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=f;const L=n.hash;(L.directionalLength!==d||L.pointLength!==g||L.spotLength!==_||L.rectAreaLength!==m||L.hemiLength!==p||L.numDirectionalShadows!==E||L.numPointShadows!==M||L.numSpotShadows!==x||L.numSpotMaps!==w||L.numLightProbes!==R)&&(n.directional.length=d,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=E,n.directionalShadowMap.length=E,n.pointShadow.length=M,n.pointShadowMap.length=M,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=E,n.pointShadowMatrix.length=M,n.spotLightMatrix.length=x+w-b,n.spotLightMap.length=w,n.numSpotLightShadowsWithMaps=b,n.numLightProbes=R,L.directionalLength=d,L.pointLength=g,L.spotLength=_,L.rectAreaLength=m,L.hemiLength=p,L.numDirectionalShadows=E,L.numPointShadows=M,L.numSpotShadows=x,L.numSpotMaps=w,L.numLightProbes=R,n.version=xg++)}function l(c,h){let u=0,f=0,d=0,g=0,_=0;const m=h.matrixWorldInverse;for(let p=0,E=c.length;p<E;p++){const M=c[p];if(M.isDirectionalLight){const x=n.directional[u];x.direction.setFromMatrixPosition(M.matrixWorld),i.setFromMatrixPosition(M.target.matrixWorld),x.direction.sub(i),x.direction.transformDirection(m),u++}else if(M.isSpotLight){const x=n.spot[d];x.position.setFromMatrixPosition(M.matrixWorld),x.position.applyMatrix4(m),x.direction.setFromMatrixPosition(M.matrixWorld),i.setFromMatrixPosition(M.target.matrixWorld),x.direction.sub(i),x.direction.transformDirection(m),d++}else if(M.isRectAreaLight){const x=n.rectArea[g];x.position.setFromMatrixPosition(M.matrixWorld),x.position.applyMatrix4(m),a.identity(),r.copy(M.matrixWorld),r.premultiply(m),a.extractRotation(r),x.halfWidth.set(M.width*.5,0,0),x.halfHeight.set(0,M.height*.5,0),x.halfWidth.applyMatrix4(a),x.halfHeight.applyMatrix4(a),g++}else if(M.isPointLight){const x=n.point[f];x.position.setFromMatrixPosition(M.matrixWorld),x.position.applyMatrix4(m),f++}else if(M.isHemisphereLight){const x=n.hemi[_];x.direction.setFromMatrixPosition(M.matrixWorld),x.direction.transformDirection(m),_++}}}return{setup:o,setupView:l,state:n}}function yl(s){const t=new yg(s),e=[],n=[];function i(h){c.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function a(h){n.push(h)}function o(){t.setup(e)}function l(h){t.setupView(e,h)}const c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function Sg(s){let t=new WeakMap;function e(i,r=0){const a=t.get(i);let o;return a===void 0?(o=new yl(s),t.set(i,[o])):r>=a.length?(o=new yl(s),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}const Tg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Eg=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function bg(s,t,e){let n=new Ka;const i=new dt,r=new dt,a=new oe,o=new Iu({depthPacking:Jc}),l=new Nu,c={},h=e.maxTextureSize,u={[Dn]:Ce,[Ce]:Dn,[le]:le},f=new Pn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new dt},radius:{value:4}},vertexShader:Tg,fragmentShader:Eg}),d=f.clone();d.defines.HORIZONTAL_PASS=1;const g=new Te;g.setAttribute("position",new xe(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Et(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=wl;let p=this.type;this.render=function(b,R,L){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||b.length===0)return;const S=s.getRenderTarget(),y=s.getActiveCubeFace(),D=s.getActiveMipmapLevel(),B=s.state;B.setBlending(An),B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);const O=p!==mn&&this.type===mn,H=p===mn&&this.type!==mn;for(let X=0,k=b.length;X<k;X++){const Q=b[X],F=Q.shadow;if(F===void 0){console.warn("THREE.WebGLShadowMap:",Q,"has no shadow.");continue}if(F.autoUpdate===!1&&F.needsUpdate===!1)continue;i.copy(F.mapSize);const $=F.getFrameExtents();if(i.multiply($),r.copy(F.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/$.x),i.x=r.x*$.x,F.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/$.y),i.y=r.y*$.y,F.mapSize.y=r.y)),F.map===null||O===!0||H===!0){const ft=this.type!==mn?{minFilter:Qe,magFilter:Qe}:{};F.map!==null&&F.map.dispose(),F.map=new Qn(i.x,i.y,ft),F.map.texture.name=Q.name+".shadowMap",F.camera.updateProjectionMatrix()}s.setRenderTarget(F.map),s.clear();const ot=F.getViewportCount();for(let ft=0;ft<ot;ft++){const Dt=F.getViewport(ft);a.set(r.x*Dt.x,r.y*Dt.y,r.x*Dt.z,r.y*Dt.w),B.viewport(a),F.updateMatrices(Q,ft),n=F.getFrustum(),x(R,L,F.camera,Q,this.type)}F.isPointLightShadow!==!0&&this.type===mn&&E(F,L),F.needsUpdate=!1}p=this.type,m.needsUpdate=!1,s.setRenderTarget(S,y,D)};function E(b,R){const L=t.update(_);f.defines.VSM_SAMPLES!==b.blurSamples&&(f.defines.VSM_SAMPLES=b.blurSamples,d.defines.VSM_SAMPLES=b.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),b.mapPass===null&&(b.mapPass=new Qn(i.x,i.y)),f.uniforms.shadow_pass.value=b.map.texture,f.uniforms.resolution.value=b.mapSize,f.uniforms.radius.value=b.radius,s.setRenderTarget(b.mapPass),s.clear(),s.renderBufferDirect(R,null,L,f,_,null),d.uniforms.shadow_pass.value=b.mapPass.texture,d.uniforms.resolution.value=b.mapSize,d.uniforms.radius.value=b.radius,s.setRenderTarget(b.map),s.clear(),s.renderBufferDirect(R,null,L,d,_,null)}function M(b,R,L,S){let y=null;const D=L.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(D!==void 0)y=D;else if(y=L.isPointLight===!0?l:o,s.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){const B=y.uuid,O=R.uuid;let H=c[B];H===void 0&&(H={},c[B]=H);let X=H[O];X===void 0&&(X=y.clone(),H[O]=X,R.addEventListener("dispose",w)),y=X}if(y.visible=R.visible,y.wireframe=R.wireframe,S===mn?y.side=R.shadowSide!==null?R.shadowSide:R.side:y.side=R.shadowSide!==null?R.shadowSide:u[R.side],y.alphaMap=R.alphaMap,y.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,y.map=R.map,y.clipShadows=R.clipShadows,y.clippingPlanes=R.clippingPlanes,y.clipIntersection=R.clipIntersection,y.displacementMap=R.displacementMap,y.displacementScale=R.displacementScale,y.displacementBias=R.displacementBias,y.wireframeLinewidth=R.wireframeLinewidth,y.linewidth=R.linewidth,L.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const B=s.properties.get(y);B.light=L}return y}function x(b,R,L,S,y){if(b.visible===!1)return;if(b.layers.test(R.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&y===mn)&&(!b.frustumCulled||n.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(L.matrixWorldInverse,b.matrixWorld);const O=t.update(b),H=b.material;if(Array.isArray(H)){const X=O.groups;for(let k=0,Q=X.length;k<Q;k++){const F=X[k],$=H[F.materialIndex];if($&&$.visible){const ot=M(b,$,S,y);b.onBeforeShadow(s,b,R,L,O,ot,F),s.renderBufferDirect(L,null,O,ot,b,F),b.onAfterShadow(s,b,R,L,O,ot,F)}}}else if(H.visible){const X=M(b,H,S,y);b.onBeforeShadow(s,b,R,L,O,X,null),s.renderBufferDirect(L,null,O,X,b,null),b.onAfterShadow(s,b,R,L,O,X,null)}}const B=b.children;for(let O=0,H=B.length;O<H;O++)x(B[O],R,L,S,y)}function w(b){b.target.removeEventListener("dispose",w);for(const L in c){const S=c[L],y=b.target.uuid;y in S&&(S[y].dispose(),delete S[y])}}}const wg={[qr]:Kr,[Zr]:Jr,[jr]:Qr,[Ci]:$r,[Kr]:qr,[Jr]:Zr,[Qr]:jr,[$r]:Ci};function Cg(s,t){function e(){let I=!1;const _t=new oe;let it=null;const Tt=new oe(0,0,0,0);return{setMask:function(rt){it!==rt&&!I&&(s.colorMask(rt,rt,rt,rt),it=rt)},setLocked:function(rt){I=rt},setClear:function(rt,j,wt,Yt,he){he===!0&&(rt*=Yt,j*=Yt,wt*=Yt),_t.set(rt,j,wt,Yt),Tt.equals(_t)===!1&&(s.clearColor(rt,j,wt,Yt),Tt.copy(_t))},reset:function(){I=!1,it=null,Tt.set(-1,0,0,0)}}}function n(){let I=!1,_t=!1,it=null,Tt=null,rt=null;return{setReversed:function(j){if(_t!==j){const wt=t.get("EXT_clip_control");j?wt.clipControlEXT(wt.LOWER_LEFT_EXT,wt.ZERO_TO_ONE_EXT):wt.clipControlEXT(wt.LOWER_LEFT_EXT,wt.NEGATIVE_ONE_TO_ONE_EXT),_t=j;const Yt=rt;rt=null,this.setClear(Yt)}},getReversed:function(){return _t},setTest:function(j){j?K(s.DEPTH_TEST):ct(s.DEPTH_TEST)},setMask:function(j){it!==j&&!I&&(s.depthMask(j),it=j)},setFunc:function(j){if(_t&&(j=wg[j]),Tt!==j){switch(j){case qr:s.depthFunc(s.NEVER);break;case Kr:s.depthFunc(s.ALWAYS);break;case Zr:s.depthFunc(s.LESS);break;case Ci:s.depthFunc(s.LEQUAL);break;case jr:s.depthFunc(s.EQUAL);break;case $r:s.depthFunc(s.GEQUAL);break;case Jr:s.depthFunc(s.GREATER);break;case Qr:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}Tt=j}},setLocked:function(j){I=j},setClear:function(j){rt!==j&&(_t&&(j=1-j),s.clearDepth(j),rt=j)},reset:function(){I=!1,it=null,Tt=null,rt=null,_t=!1}}}function i(){let I=!1,_t=null,it=null,Tt=null,rt=null,j=null,wt=null,Yt=null,he=null;return{setTest:function(ne){I||(ne?K(s.STENCIL_TEST):ct(s.STENCIL_TEST))},setMask:function(ne){_t!==ne&&!I&&(s.stencilMask(ne),_t=ne)},setFunc:function(ne,Ye,ln){(it!==ne||Tt!==Ye||rt!==ln)&&(s.stencilFunc(ne,Ye,ln),it=ne,Tt=Ye,rt=ln)},setOp:function(ne,Ye,ln){(j!==ne||wt!==Ye||Yt!==ln)&&(s.stencilOp(ne,Ye,ln),j=ne,wt=Ye,Yt=ln)},setLocked:function(ne){I=ne},setClear:function(ne){he!==ne&&(s.clearStencil(ne),he=ne)},reset:function(){I=!1,_t=null,it=null,Tt=null,rt=null,j=null,wt=null,Yt=null,he=null}}}const r=new e,a=new n,o=new i,l=new WeakMap,c=new WeakMap;let h={},u={},f=new WeakMap,d=[],g=null,_=!1,m=null,p=null,E=null,M=null,x=null,w=null,b=null,R=new Kt(0,0,0),L=0,S=!1,y=null,D=null,B=null,O=null,H=null;const X=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let k=!1,Q=0;const F=s.getParameter(s.VERSION);F.indexOf("WebGL")!==-1?(Q=parseFloat(/^WebGL (\d)/.exec(F)[1]),k=Q>=1):F.indexOf("OpenGL ES")!==-1&&(Q=parseFloat(/^OpenGL ES (\d)/.exec(F)[1]),k=Q>=2);let $=null,ot={};const ft=s.getParameter(s.SCISSOR_BOX),Dt=s.getParameter(s.VIEWPORT),Ut=new oe().fromArray(ft),W=new oe().fromArray(Dt);function tt(I,_t,it,Tt){const rt=new Uint8Array(4),j=s.createTexture();s.bindTexture(I,j),s.texParameteri(I,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(I,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let wt=0;wt<it;wt++)I===s.TEXTURE_3D||I===s.TEXTURE_2D_ARRAY?s.texImage3D(_t,0,s.RGBA,1,1,Tt,0,s.RGBA,s.UNSIGNED_BYTE,rt):s.texImage2D(_t+wt,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,rt);return j}const et={};et[s.TEXTURE_2D]=tt(s.TEXTURE_2D,s.TEXTURE_2D,1),et[s.TEXTURE_CUBE_MAP]=tt(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),et[s.TEXTURE_2D_ARRAY]=tt(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),et[s.TEXTURE_3D]=tt(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),K(s.DEPTH_TEST),a.setFunc(Ci),ut(!1),Nt(ho),K(s.CULL_FACE),P(An);function K(I){h[I]!==!0&&(s.enable(I),h[I]=!0)}function ct(I){h[I]!==!1&&(s.disable(I),h[I]=!1)}function st(I,_t){return u[I]!==_t?(s.bindFramebuffer(I,_t),u[I]=_t,I===s.DRAW_FRAMEBUFFER&&(u[s.FRAMEBUFFER]=_t),I===s.FRAMEBUFFER&&(u[s.DRAW_FRAMEBUFFER]=_t),!0):!1}function Z(I,_t){let it=d,Tt=!1;if(I){it=f.get(_t),it===void 0&&(it=[],f.set(_t,it));const rt=I.textures;if(it.length!==rt.length||it[0]!==s.COLOR_ATTACHMENT0){for(let j=0,wt=rt.length;j<wt;j++)it[j]=s.COLOR_ATTACHMENT0+j;it.length=rt.length,Tt=!0}}else it[0]!==s.BACK&&(it[0]=s.BACK,Tt=!0);Tt&&s.drawBuffers(it)}function ht(I){return g!==I?(s.useProgram(I),g=I,!0):!1}const Ft={[qn]:s.FUNC_ADD,[Ec]:s.FUNC_SUBTRACT,[bc]:s.FUNC_REVERSE_SUBTRACT};Ft[wc]=s.MIN,Ft[Cc]=s.MAX;const Pt={[Ac]:s.ZERO,[Rc]:s.ONE,[Dc]:s.SRC_COLOR,[Xr]:s.SRC_ALPHA,[Uc]:s.SRC_ALPHA_SATURATE,[Nc]:s.DST_COLOR,[Lc]:s.DST_ALPHA,[Pc]:s.ONE_MINUS_SRC_COLOR,[Yr]:s.ONE_MINUS_SRC_ALPHA,[Oc]:s.ONE_MINUS_DST_COLOR,[Ic]:s.ONE_MINUS_DST_ALPHA,[Fc]:s.CONSTANT_COLOR,[Bc]:s.ONE_MINUS_CONSTANT_COLOR,[kc]:s.CONSTANT_ALPHA,[zc]:s.ONE_MINUS_CONSTANT_ALPHA};function P(I,_t,it,Tt,rt,j,wt,Yt,he,ne){if(I===An){_===!0&&(ct(s.BLEND),_=!1);return}if(_===!1&&(K(s.BLEND),_=!0),I!==Tc){if(I!==m||ne!==S){if((p!==qn||x!==qn)&&(s.blendEquation(s.FUNC_ADD),p=qn,x=qn),ne)switch(I){case Ei:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case uo:s.blendFunc(s.ONE,s.ONE);break;case fo:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case po:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}else switch(I){case Ei:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case uo:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case fo:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case po:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}E=null,M=null,w=null,b=null,R.set(0,0,0),L=0,m=I,S=ne}return}rt=rt||_t,j=j||it,wt=wt||Tt,(_t!==p||rt!==x)&&(s.blendEquationSeparate(Ft[_t],Ft[rt]),p=_t,x=rt),(it!==E||Tt!==M||j!==w||wt!==b)&&(s.blendFuncSeparate(Pt[it],Pt[Tt],Pt[j],Pt[wt]),E=it,M=Tt,w=j,b=wt),(Yt.equals(R)===!1||he!==L)&&(s.blendColor(Yt.r,Yt.g,Yt.b,he),R.copy(Yt),L=he),m=I,S=!1}function Mt(I,_t){I.side===le?ct(s.CULL_FACE):K(s.CULL_FACE);let it=I.side===Ce;_t&&(it=!it),ut(it),I.blending===Ei&&I.transparent===!1?P(An):P(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),a.setFunc(I.depthFunc),a.setTest(I.depthTest),a.setMask(I.depthWrite),r.setMask(I.colorWrite);const Tt=I.stencilWrite;o.setTest(Tt),Tt&&(o.setMask(I.stencilWriteMask),o.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),o.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),At(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?K(s.SAMPLE_ALPHA_TO_COVERAGE):ct(s.SAMPLE_ALPHA_TO_COVERAGE)}function ut(I){y!==I&&(I?s.frontFace(s.CW):s.frontFace(s.CCW),y=I)}function Nt(I){I!==Mc?(K(s.CULL_FACE),I!==D&&(I===ho?s.cullFace(s.BACK):I===yc?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):ct(s.CULL_FACE),D=I}function lt(I){I!==B&&(k&&s.lineWidth(I),B=I)}function At(I,_t,it){I?(K(s.POLYGON_OFFSET_FILL),(O!==_t||H!==it)&&(s.polygonOffset(_t,it),O=_t,H=it)):ct(s.POLYGON_OFFSET_FILL)}function xt(I){I?K(s.SCISSOR_TEST):ct(s.SCISSOR_TEST)}function bt(I){I===void 0&&(I=s.TEXTURE0+X-1),$!==I&&(s.activeTexture(I),$=I)}function Ht(I,_t,it){it===void 0&&($===null?it=s.TEXTURE0+X-1:it=$);let Tt=ot[it];Tt===void 0&&(Tt={type:void 0,texture:void 0},ot[it]=Tt),(Tt.type!==I||Tt.texture!==_t)&&($!==it&&(s.activeTexture(it),$=it),s.bindTexture(I,_t||et[I]),Tt.type=I,Tt.texture=_t)}function C(){const I=ot[$];I!==void 0&&I.type!==void 0&&(s.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function v(){try{s.compressedTexImage2D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function z(){try{s.compressedTexImage3D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function q(){try{s.texSubImage2D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function J(){try{s.texSubImage3D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Y(){try{s.compressedTexSubImage2D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Lt(){try{s.compressedTexSubImage3D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function gt(){try{s.texStorage2D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Rt(){try{s.texStorage3D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function It(){try{s.texImage2D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function nt(){try{s.texImage3D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function yt(I){Ut.equals(I)===!1&&(s.scissor(I.x,I.y,I.z,I.w),Ut.copy(I))}function zt(I){W.equals(I)===!1&&(s.viewport(I.x,I.y,I.z,I.w),W.copy(I))}function kt(I,_t){let it=c.get(_t);it===void 0&&(it=new WeakMap,c.set(_t,it));let Tt=it.get(I);Tt===void 0&&(Tt=s.getUniformBlockIndex(_t,I.name),it.set(I,Tt))}function pt(I,_t){const Tt=c.get(_t).get(I);l.get(_t)!==Tt&&(s.uniformBlockBinding(_t,Tt,I.__bindingPointIndex),l.set(_t,Tt))}function Wt(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),a.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),h={},$=null,ot={},u={},f=new WeakMap,d=[],g=null,_=!1,m=null,p=null,E=null,M=null,x=null,w=null,b=null,R=new Kt(0,0,0),L=0,S=!1,y=null,D=null,B=null,O=null,H=null,Ut.set(0,0,s.canvas.width,s.canvas.height),W.set(0,0,s.canvas.width,s.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:K,disable:ct,bindFramebuffer:st,drawBuffers:Z,useProgram:ht,setBlending:P,setMaterial:Mt,setFlipSided:ut,setCullFace:Nt,setLineWidth:lt,setPolygonOffset:At,setScissorTest:xt,activeTexture:bt,bindTexture:Ht,unbindTexture:C,compressedTexImage2D:v,compressedTexImage3D:z,texImage2D:It,texImage3D:nt,updateUBOMapping:kt,uniformBlockBinding:pt,texStorage2D:gt,texStorage3D:Rt,texSubImage2D:q,texSubImage3D:J,compressedTexSubImage2D:Y,compressedTexSubImage3D:Lt,scissor:yt,viewport:zt,reset:Wt}}function Ag(s,t,e,n,i,r,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new dt,h=new WeakMap;let u;const f=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(C,v){return d?new OffscreenCanvas(C,v):ns("canvas")}function _(C,v,z){let q=1;const J=Ht(C);if((J.width>z||J.height>z)&&(q=z/Math.max(J.width,J.height)),q<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){const Y=Math.floor(q*J.width),Lt=Math.floor(q*J.height);u===void 0&&(u=g(Y,Lt));const gt=v?g(Y,Lt):u;return gt.width=Y,gt.height=Lt,gt.getContext("2d").drawImage(C,0,0,Y,Lt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+J.width+"x"+J.height+") to ("+Y+"x"+Lt+")."),gt}else return"data"in C&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+J.width+"x"+J.height+")."),C;return C}function m(C){return C.generateMipmaps}function p(C){s.generateMipmap(C)}function E(C){return C.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?s.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function M(C,v,z,q,J=!1){if(C!==null){if(s[C]!==void 0)return s[C];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let Y=v;if(v===s.RED&&(z===s.FLOAT&&(Y=s.R32F),z===s.HALF_FLOAT&&(Y=s.R16F),z===s.UNSIGNED_BYTE&&(Y=s.R8)),v===s.RED_INTEGER&&(z===s.UNSIGNED_BYTE&&(Y=s.R8UI),z===s.UNSIGNED_SHORT&&(Y=s.R16UI),z===s.UNSIGNED_INT&&(Y=s.R32UI),z===s.BYTE&&(Y=s.R8I),z===s.SHORT&&(Y=s.R16I),z===s.INT&&(Y=s.R32I)),v===s.RG&&(z===s.FLOAT&&(Y=s.RG32F),z===s.HALF_FLOAT&&(Y=s.RG16F),z===s.UNSIGNED_BYTE&&(Y=s.RG8)),v===s.RG_INTEGER&&(z===s.UNSIGNED_BYTE&&(Y=s.RG8UI),z===s.UNSIGNED_SHORT&&(Y=s.RG16UI),z===s.UNSIGNED_INT&&(Y=s.RG32UI),z===s.BYTE&&(Y=s.RG8I),z===s.SHORT&&(Y=s.RG16I),z===s.INT&&(Y=s.RG32I)),v===s.RGB_INTEGER&&(z===s.UNSIGNED_BYTE&&(Y=s.RGB8UI),z===s.UNSIGNED_SHORT&&(Y=s.RGB16UI),z===s.UNSIGNED_INT&&(Y=s.RGB32UI),z===s.BYTE&&(Y=s.RGB8I),z===s.SHORT&&(Y=s.RGB16I),z===s.INT&&(Y=s.RGB32I)),v===s.RGBA_INTEGER&&(z===s.UNSIGNED_BYTE&&(Y=s.RGBA8UI),z===s.UNSIGNED_SHORT&&(Y=s.RGBA16UI),z===s.UNSIGNED_INT&&(Y=s.RGBA32UI),z===s.BYTE&&(Y=s.RGBA8I),z===s.SHORT&&(Y=s.RGBA16I),z===s.INT&&(Y=s.RGBA32I)),v===s.RGB&&z===s.UNSIGNED_INT_5_9_9_9_REV&&(Y=s.RGB9_E5),v===s.RGBA){const Lt=J?Ks:Qt.getTransfer(q);z===s.FLOAT&&(Y=s.RGBA32F),z===s.HALF_FLOAT&&(Y=s.RGBA16F),z===s.UNSIGNED_BYTE&&(Y=Lt===se?s.SRGB8_ALPHA8:s.RGBA8),z===s.UNSIGNED_SHORT_4_4_4_4&&(Y=s.RGBA4),z===s.UNSIGNED_SHORT_5_5_5_1&&(Y=s.RGB5_A1)}return(Y===s.R16F||Y===s.R32F||Y===s.RG16F||Y===s.RG32F||Y===s.RGBA16F||Y===s.RGBA32F)&&t.get("EXT_color_buffer_float"),Y}function x(C,v){let z;return C?v===null||v===Jn||v===Qi?z=s.DEPTH24_STENCIL8:v===gn?z=s.DEPTH32F_STENCIL8:v===Ji&&(z=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===Jn||v===Qi?z=s.DEPTH_COMPONENT24:v===gn?z=s.DEPTH_COMPONENT32F:v===Ji&&(z=s.DEPTH_COMPONENT16),z}function w(C,v){return m(C)===!0||C.isFramebufferTexture&&C.minFilter!==Qe&&C.minFilter!==rn?Math.log2(Math.max(v.width,v.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?v.mipmaps.length:1}function b(C){const v=C.target;v.removeEventListener("dispose",b),L(v),v.isVideoTexture&&h.delete(v)}function R(C){const v=C.target;v.removeEventListener("dispose",R),y(v)}function L(C){const v=n.get(C);if(v.__webglInit===void 0)return;const z=C.source,q=f.get(z);if(q){const J=q[v.__cacheKey];J.usedTimes--,J.usedTimes===0&&S(C),Object.keys(q).length===0&&f.delete(z)}n.remove(C)}function S(C){const v=n.get(C);s.deleteTexture(v.__webglTexture);const z=C.source,q=f.get(z);delete q[v.__cacheKey],a.memory.textures--}function y(C){const v=n.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),n.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let q=0;q<6;q++){if(Array.isArray(v.__webglFramebuffer[q]))for(let J=0;J<v.__webglFramebuffer[q].length;J++)s.deleteFramebuffer(v.__webglFramebuffer[q][J]);else s.deleteFramebuffer(v.__webglFramebuffer[q]);v.__webglDepthbuffer&&s.deleteRenderbuffer(v.__webglDepthbuffer[q])}else{if(Array.isArray(v.__webglFramebuffer))for(let q=0;q<v.__webglFramebuffer.length;q++)s.deleteFramebuffer(v.__webglFramebuffer[q]);else s.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&s.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&s.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let q=0;q<v.__webglColorRenderbuffer.length;q++)v.__webglColorRenderbuffer[q]&&s.deleteRenderbuffer(v.__webglColorRenderbuffer[q]);v.__webglDepthRenderbuffer&&s.deleteRenderbuffer(v.__webglDepthRenderbuffer)}const z=C.textures;for(let q=0,J=z.length;q<J;q++){const Y=n.get(z[q]);Y.__webglTexture&&(s.deleteTexture(Y.__webglTexture),a.memory.textures--),n.remove(z[q])}n.remove(C)}let D=0;function B(){D=0}function O(){const C=D;return C>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+i.maxTextures),D+=1,C}function H(C){const v=[];return v.push(C.wrapS),v.push(C.wrapT),v.push(C.wrapR||0),v.push(C.magFilter),v.push(C.minFilter),v.push(C.anisotropy),v.push(C.internalFormat),v.push(C.format),v.push(C.type),v.push(C.generateMipmaps),v.push(C.premultiplyAlpha),v.push(C.flipY),v.push(C.unpackAlignment),v.push(C.colorSpace),v.join()}function X(C,v){const z=n.get(C);if(C.isVideoTexture&&xt(C),C.isRenderTargetTexture===!1&&C.version>0&&z.__version!==C.version){const q=C.image;if(q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{et(z,C,v);return}}e.bindTexture(s.TEXTURE_2D,z.__webglTexture,s.TEXTURE0+v)}function k(C,v){const z=n.get(C);if(C.version>0&&z.__version!==C.version){et(z,C,v);return}e.bindTexture(s.TEXTURE_2D_ARRAY,z.__webglTexture,s.TEXTURE0+v)}function Q(C,v){const z=n.get(C);if(C.version>0&&z.__version!==C.version){et(z,C,v);return}e.bindTexture(s.TEXTURE_3D,z.__webglTexture,s.TEXTURE0+v)}function F(C,v){const z=n.get(C);if(C.version>0&&z.__version!==C.version){K(z,C,v);return}e.bindTexture(s.TEXTURE_CUBE_MAP,z.__webglTexture,s.TEXTURE0+v)}const $={[te]:s.REPEAT,[jn]:s.CLAMP_TO_EDGE,[na]:s.MIRRORED_REPEAT},ot={[Qe]:s.NEAREST,[jc]:s.NEAREST_MIPMAP_NEAREST,[fs]:s.NEAREST_MIPMAP_LINEAR,[rn]:s.LINEAR,[ar]:s.LINEAR_MIPMAP_NEAREST,[$n]:s.LINEAR_MIPMAP_LINEAR},ft={[th]:s.NEVER,[ah]:s.ALWAYS,[eh]:s.LESS,[Ul]:s.LEQUAL,[nh]:s.EQUAL,[rh]:s.GEQUAL,[ih]:s.GREATER,[sh]:s.NOTEQUAL};function Dt(C,v){if(v.type===gn&&t.has("OES_texture_float_linear")===!1&&(v.magFilter===rn||v.magFilter===ar||v.magFilter===fs||v.magFilter===$n||v.minFilter===rn||v.minFilter===ar||v.minFilter===fs||v.minFilter===$n)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(C,s.TEXTURE_WRAP_S,$[v.wrapS]),s.texParameteri(C,s.TEXTURE_WRAP_T,$[v.wrapT]),(C===s.TEXTURE_3D||C===s.TEXTURE_2D_ARRAY)&&s.texParameteri(C,s.TEXTURE_WRAP_R,$[v.wrapR]),s.texParameteri(C,s.TEXTURE_MAG_FILTER,ot[v.magFilter]),s.texParameteri(C,s.TEXTURE_MIN_FILTER,ot[v.minFilter]),v.compareFunction&&(s.texParameteri(C,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(C,s.TEXTURE_COMPARE_FUNC,ft[v.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===Qe||v.minFilter!==fs&&v.minFilter!==$n||v.type===gn&&t.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||n.get(v).__currentAnisotropy){const z=t.get("EXT_texture_filter_anisotropic");s.texParameterf(C,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,i.getMaxAnisotropy())),n.get(v).__currentAnisotropy=v.anisotropy}}}function Ut(C,v){let z=!1;C.__webglInit===void 0&&(C.__webglInit=!0,v.addEventListener("dispose",b));const q=v.source;let J=f.get(q);J===void 0&&(J={},f.set(q,J));const Y=H(v);if(Y!==C.__cacheKey){J[Y]===void 0&&(J[Y]={texture:s.createTexture(),usedTimes:0},a.memory.textures++,z=!0),J[Y].usedTimes++;const Lt=J[C.__cacheKey];Lt!==void 0&&(J[C.__cacheKey].usedTimes--,Lt.usedTimes===0&&S(v)),C.__cacheKey=Y,C.__webglTexture=J[Y].texture}return z}function W(C,v,z){return Math.floor(Math.floor(C/z)/v)}function tt(C,v,z,q){const Y=C.updateRanges;if(Y.length===0)e.texSubImage2D(s.TEXTURE_2D,0,0,0,v.width,v.height,z,q,v.data);else{Y.sort((nt,yt)=>nt.start-yt.start);let Lt=0;for(let nt=1;nt<Y.length;nt++){const yt=Y[Lt],zt=Y[nt],kt=yt.start+yt.count,pt=W(zt.start,v.width,4),Wt=W(yt.start,v.width,4);zt.start<=kt+1&&pt===Wt&&W(zt.start+zt.count-1,v.width,4)===pt?yt.count=Math.max(yt.count,zt.start+zt.count-yt.start):(++Lt,Y[Lt]=zt)}Y.length=Lt+1;const gt=s.getParameter(s.UNPACK_ROW_LENGTH),Rt=s.getParameter(s.UNPACK_SKIP_PIXELS),It=s.getParameter(s.UNPACK_SKIP_ROWS);s.pixelStorei(s.UNPACK_ROW_LENGTH,v.width);for(let nt=0,yt=Y.length;nt<yt;nt++){const zt=Y[nt],kt=Math.floor(zt.start/4),pt=Math.ceil(zt.count/4),Wt=kt%v.width,I=Math.floor(kt/v.width),_t=pt,it=1;s.pixelStorei(s.UNPACK_SKIP_PIXELS,Wt),s.pixelStorei(s.UNPACK_SKIP_ROWS,I),e.texSubImage2D(s.TEXTURE_2D,0,Wt,I,_t,it,z,q,v.data)}C.clearUpdateRanges(),s.pixelStorei(s.UNPACK_ROW_LENGTH,gt),s.pixelStorei(s.UNPACK_SKIP_PIXELS,Rt),s.pixelStorei(s.UNPACK_SKIP_ROWS,It)}}function et(C,v,z){let q=s.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(q=s.TEXTURE_2D_ARRAY),v.isData3DTexture&&(q=s.TEXTURE_3D);const J=Ut(C,v),Y=v.source;e.bindTexture(q,C.__webglTexture,s.TEXTURE0+z);const Lt=n.get(Y);if(Y.version!==Lt.__version||J===!0){e.activeTexture(s.TEXTURE0+z);const gt=Qt.getPrimaries(Qt.workingColorSpace),Rt=v.colorSpace===Cn?null:Qt.getPrimaries(v.colorSpace),It=v.colorSpace===Cn||gt===Rt?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,v.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,v.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,It);let nt=_(v.image,!1,i.maxTextureSize);nt=bt(v,nt);const yt=r.convert(v.format,v.colorSpace),zt=r.convert(v.type);let kt=M(v.internalFormat,yt,zt,v.colorSpace,v.isVideoTexture);Dt(q,v);let pt;const Wt=v.mipmaps,I=v.isVideoTexture!==!0,_t=Lt.__version===void 0||J===!0,it=Y.dataReady,Tt=w(v,nt);if(v.isDepthTexture)kt=x(v.format===es,v.type),_t&&(I?e.texStorage2D(s.TEXTURE_2D,1,kt,nt.width,nt.height):e.texImage2D(s.TEXTURE_2D,0,kt,nt.width,nt.height,0,yt,zt,null));else if(v.isDataTexture)if(Wt.length>0){I&&_t&&e.texStorage2D(s.TEXTURE_2D,Tt,kt,Wt[0].width,Wt[0].height);for(let rt=0,j=Wt.length;rt<j;rt++)pt=Wt[rt],I?it&&e.texSubImage2D(s.TEXTURE_2D,rt,0,0,pt.width,pt.height,yt,zt,pt.data):e.texImage2D(s.TEXTURE_2D,rt,kt,pt.width,pt.height,0,yt,zt,pt.data);v.generateMipmaps=!1}else I?(_t&&e.texStorage2D(s.TEXTURE_2D,Tt,kt,nt.width,nt.height),it&&tt(v,nt,yt,zt)):e.texImage2D(s.TEXTURE_2D,0,kt,nt.width,nt.height,0,yt,zt,nt.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){I&&_t&&e.texStorage3D(s.TEXTURE_2D_ARRAY,Tt,kt,Wt[0].width,Wt[0].height,nt.depth);for(let rt=0,j=Wt.length;rt<j;rt++)if(pt=Wt[rt],v.format!==Je)if(yt!==null)if(I){if(it)if(v.layerUpdates.size>0){const wt=$o(pt.width,pt.height,v.format,v.type);for(const Yt of v.layerUpdates){const he=pt.data.subarray(Yt*wt/pt.data.BYTES_PER_ELEMENT,(Yt+1)*wt/pt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,rt,0,0,Yt,pt.width,pt.height,1,yt,he)}v.clearLayerUpdates()}else e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,rt,0,0,0,pt.width,pt.height,nt.depth,yt,pt.data)}else e.compressedTexImage3D(s.TEXTURE_2D_ARRAY,rt,kt,pt.width,pt.height,nt.depth,0,pt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else I?it&&e.texSubImage3D(s.TEXTURE_2D_ARRAY,rt,0,0,0,pt.width,pt.height,nt.depth,yt,zt,pt.data):e.texImage3D(s.TEXTURE_2D_ARRAY,rt,kt,pt.width,pt.height,nt.depth,0,yt,zt,pt.data)}else{I&&_t&&e.texStorage2D(s.TEXTURE_2D,Tt,kt,Wt[0].width,Wt[0].height);for(let rt=0,j=Wt.length;rt<j;rt++)pt=Wt[rt],v.format!==Je?yt!==null?I?it&&e.compressedTexSubImage2D(s.TEXTURE_2D,rt,0,0,pt.width,pt.height,yt,pt.data):e.compressedTexImage2D(s.TEXTURE_2D,rt,kt,pt.width,pt.height,0,pt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):I?it&&e.texSubImage2D(s.TEXTURE_2D,rt,0,0,pt.width,pt.height,yt,zt,pt.data):e.texImage2D(s.TEXTURE_2D,rt,kt,pt.width,pt.height,0,yt,zt,pt.data)}else if(v.isDataArrayTexture)if(I){if(_t&&e.texStorage3D(s.TEXTURE_2D_ARRAY,Tt,kt,nt.width,nt.height,nt.depth),it)if(v.layerUpdates.size>0){const rt=$o(nt.width,nt.height,v.format,v.type);for(const j of v.layerUpdates){const wt=nt.data.subarray(j*rt/nt.data.BYTES_PER_ELEMENT,(j+1)*rt/nt.data.BYTES_PER_ELEMENT);e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,j,nt.width,nt.height,1,yt,zt,wt)}v.clearLayerUpdates()}else e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,nt.width,nt.height,nt.depth,yt,zt,nt.data)}else e.texImage3D(s.TEXTURE_2D_ARRAY,0,kt,nt.width,nt.height,nt.depth,0,yt,zt,nt.data);else if(v.isData3DTexture)I?(_t&&e.texStorage3D(s.TEXTURE_3D,Tt,kt,nt.width,nt.height,nt.depth),it&&e.texSubImage3D(s.TEXTURE_3D,0,0,0,0,nt.width,nt.height,nt.depth,yt,zt,nt.data)):e.texImage3D(s.TEXTURE_3D,0,kt,nt.width,nt.height,nt.depth,0,yt,zt,nt.data);else if(v.isFramebufferTexture){if(_t)if(I)e.texStorage2D(s.TEXTURE_2D,Tt,kt,nt.width,nt.height);else{let rt=nt.width,j=nt.height;for(let wt=0;wt<Tt;wt++)e.texImage2D(s.TEXTURE_2D,wt,kt,rt,j,0,yt,zt,null),rt>>=1,j>>=1}}else if(Wt.length>0){if(I&&_t){const rt=Ht(Wt[0]);e.texStorage2D(s.TEXTURE_2D,Tt,kt,rt.width,rt.height)}for(let rt=0,j=Wt.length;rt<j;rt++)pt=Wt[rt],I?it&&e.texSubImage2D(s.TEXTURE_2D,rt,0,0,yt,zt,pt):e.texImage2D(s.TEXTURE_2D,rt,kt,yt,zt,pt);v.generateMipmaps=!1}else if(I){if(_t){const rt=Ht(nt);e.texStorage2D(s.TEXTURE_2D,Tt,kt,rt.width,rt.height)}it&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,yt,zt,nt)}else e.texImage2D(s.TEXTURE_2D,0,kt,yt,zt,nt);m(v)&&p(q),Lt.__version=Y.version,v.onUpdate&&v.onUpdate(v)}C.__version=v.version}function K(C,v,z){if(v.image.length!==6)return;const q=Ut(C,v),J=v.source;e.bindTexture(s.TEXTURE_CUBE_MAP,C.__webglTexture,s.TEXTURE0+z);const Y=n.get(J);if(J.version!==Y.__version||q===!0){e.activeTexture(s.TEXTURE0+z);const Lt=Qt.getPrimaries(Qt.workingColorSpace),gt=v.colorSpace===Cn?null:Qt.getPrimaries(v.colorSpace),Rt=v.colorSpace===Cn||Lt===gt?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,v.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,v.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Rt);const It=v.isCompressedTexture||v.image[0].isCompressedTexture,nt=v.image[0]&&v.image[0].isDataTexture,yt=[];for(let j=0;j<6;j++)!It&&!nt?yt[j]=_(v.image[j],!0,i.maxCubemapSize):yt[j]=nt?v.image[j].image:v.image[j],yt[j]=bt(v,yt[j]);const zt=yt[0],kt=r.convert(v.format,v.colorSpace),pt=r.convert(v.type),Wt=M(v.internalFormat,kt,pt,v.colorSpace),I=v.isVideoTexture!==!0,_t=Y.__version===void 0||q===!0,it=J.dataReady;let Tt=w(v,zt);Dt(s.TEXTURE_CUBE_MAP,v);let rt;if(It){I&&_t&&e.texStorage2D(s.TEXTURE_CUBE_MAP,Tt,Wt,zt.width,zt.height);for(let j=0;j<6;j++){rt=yt[j].mipmaps;for(let wt=0;wt<rt.length;wt++){const Yt=rt[wt];v.format!==Je?kt!==null?I?it&&e.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,wt,0,0,Yt.width,Yt.height,kt,Yt.data):e.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,wt,Wt,Yt.width,Yt.height,0,Yt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):I?it&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,wt,0,0,Yt.width,Yt.height,kt,pt,Yt.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,wt,Wt,Yt.width,Yt.height,0,kt,pt,Yt.data)}}}else{if(rt=v.mipmaps,I&&_t){rt.length>0&&Tt++;const j=Ht(yt[0]);e.texStorage2D(s.TEXTURE_CUBE_MAP,Tt,Wt,j.width,j.height)}for(let j=0;j<6;j++)if(nt){I?it&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,yt[j].width,yt[j].height,kt,pt,yt[j].data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,Wt,yt[j].width,yt[j].height,0,kt,pt,yt[j].data);for(let wt=0;wt<rt.length;wt++){const he=rt[wt].image[j].image;I?it&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,wt+1,0,0,he.width,he.height,kt,pt,he.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,wt+1,Wt,he.width,he.height,0,kt,pt,he.data)}}else{I?it&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,kt,pt,yt[j]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,Wt,kt,pt,yt[j]);for(let wt=0;wt<rt.length;wt++){const Yt=rt[wt];I?it&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,wt+1,0,0,kt,pt,Yt.image[j]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,wt+1,Wt,kt,pt,Yt.image[j])}}}m(v)&&p(s.TEXTURE_CUBE_MAP),Y.__version=J.version,v.onUpdate&&v.onUpdate(v)}C.__version=v.version}function ct(C,v,z,q,J,Y){const Lt=r.convert(z.format,z.colorSpace),gt=r.convert(z.type),Rt=M(z.internalFormat,Lt,gt,z.colorSpace),It=n.get(v),nt=n.get(z);if(nt.__renderTarget=v,!It.__hasExternalTextures){const yt=Math.max(1,v.width>>Y),zt=Math.max(1,v.height>>Y);J===s.TEXTURE_3D||J===s.TEXTURE_2D_ARRAY?e.texImage3D(J,Y,Rt,yt,zt,v.depth,0,Lt,gt,null):e.texImage2D(J,Y,Rt,yt,zt,0,Lt,gt,null)}e.bindFramebuffer(s.FRAMEBUFFER,C),At(v)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,q,J,nt.__webglTexture,0,lt(v)):(J===s.TEXTURE_2D||J>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&J<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,q,J,nt.__webglTexture,Y),e.bindFramebuffer(s.FRAMEBUFFER,null)}function st(C,v,z){if(s.bindRenderbuffer(s.RENDERBUFFER,C),v.depthBuffer){const q=v.depthTexture,J=q&&q.isDepthTexture?q.type:null,Y=x(v.stencilBuffer,J),Lt=v.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,gt=lt(v);At(v)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,gt,Y,v.width,v.height):z?s.renderbufferStorageMultisample(s.RENDERBUFFER,gt,Y,v.width,v.height):s.renderbufferStorage(s.RENDERBUFFER,Y,v.width,v.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,Lt,s.RENDERBUFFER,C)}else{const q=v.textures;for(let J=0;J<q.length;J++){const Y=q[J],Lt=r.convert(Y.format,Y.colorSpace),gt=r.convert(Y.type),Rt=M(Y.internalFormat,Lt,gt,Y.colorSpace),It=lt(v);z&&At(v)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,It,Rt,v.width,v.height):At(v)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,It,Rt,v.width,v.height):s.renderbufferStorage(s.RENDERBUFFER,Rt,v.width,v.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function Z(C,v){if(v&&v.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(s.FRAMEBUFFER,C),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const q=n.get(v.depthTexture);q.__renderTarget=v,(!q.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),X(v.depthTexture,0);const J=q.__webglTexture,Y=lt(v);if(v.depthTexture.format===ts)At(v)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,J,0,Y):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,J,0);else if(v.depthTexture.format===es)At(v)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,J,0,Y):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,J,0);else throw new Error("Unknown depthTexture format")}function ht(C){const v=n.get(C),z=C.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==C.depthTexture){const q=C.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),q){const J=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,q.removeEventListener("dispose",J)};q.addEventListener("dispose",J),v.__depthDisposeCallback=J}v.__boundDepthTexture=q}if(C.depthTexture&&!v.__autoAllocateDepthBuffer){if(z)throw new Error("target.depthTexture not supported in Cube render targets");const q=C.texture.mipmaps;q&&q.length>0?Z(v.__webglFramebuffer[0],C):Z(v.__webglFramebuffer,C)}else if(z){v.__webglDepthbuffer=[];for(let q=0;q<6;q++)if(e.bindFramebuffer(s.FRAMEBUFFER,v.__webglFramebuffer[q]),v.__webglDepthbuffer[q]===void 0)v.__webglDepthbuffer[q]=s.createRenderbuffer(),st(v.__webglDepthbuffer[q],C,!1);else{const J=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Y=v.__webglDepthbuffer[q];s.bindRenderbuffer(s.RENDERBUFFER,Y),s.framebufferRenderbuffer(s.FRAMEBUFFER,J,s.RENDERBUFFER,Y)}}else{const q=C.texture.mipmaps;if(q&&q.length>0?e.bindFramebuffer(s.FRAMEBUFFER,v.__webglFramebuffer[0]):e.bindFramebuffer(s.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=s.createRenderbuffer(),st(v.__webglDepthbuffer,C,!1);else{const J=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Y=v.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,Y),s.framebufferRenderbuffer(s.FRAMEBUFFER,J,s.RENDERBUFFER,Y)}}e.bindFramebuffer(s.FRAMEBUFFER,null)}function Ft(C,v,z){const q=n.get(C);v!==void 0&&ct(q.__webglFramebuffer,C,C.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),z!==void 0&&ht(C)}function Pt(C){const v=C.texture,z=n.get(C),q=n.get(v);C.addEventListener("dispose",R);const J=C.textures,Y=C.isWebGLCubeRenderTarget===!0,Lt=J.length>1;if(Lt||(q.__webglTexture===void 0&&(q.__webglTexture=s.createTexture()),q.__version=v.version,a.memory.textures++),Y){z.__webglFramebuffer=[];for(let gt=0;gt<6;gt++)if(v.mipmaps&&v.mipmaps.length>0){z.__webglFramebuffer[gt]=[];for(let Rt=0;Rt<v.mipmaps.length;Rt++)z.__webglFramebuffer[gt][Rt]=s.createFramebuffer()}else z.__webglFramebuffer[gt]=s.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){z.__webglFramebuffer=[];for(let gt=0;gt<v.mipmaps.length;gt++)z.__webglFramebuffer[gt]=s.createFramebuffer()}else z.__webglFramebuffer=s.createFramebuffer();if(Lt)for(let gt=0,Rt=J.length;gt<Rt;gt++){const It=n.get(J[gt]);It.__webglTexture===void 0&&(It.__webglTexture=s.createTexture(),a.memory.textures++)}if(C.samples>0&&At(C)===!1){z.__webglMultisampledFramebuffer=s.createFramebuffer(),z.__webglColorRenderbuffer=[],e.bindFramebuffer(s.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let gt=0;gt<J.length;gt++){const Rt=J[gt];z.__webglColorRenderbuffer[gt]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,z.__webglColorRenderbuffer[gt]);const It=r.convert(Rt.format,Rt.colorSpace),nt=r.convert(Rt.type),yt=M(Rt.internalFormat,It,nt,Rt.colorSpace,C.isXRRenderTarget===!0),zt=lt(C);s.renderbufferStorageMultisample(s.RENDERBUFFER,zt,yt,C.width,C.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+gt,s.RENDERBUFFER,z.__webglColorRenderbuffer[gt])}s.bindRenderbuffer(s.RENDERBUFFER,null),C.depthBuffer&&(z.__webglDepthRenderbuffer=s.createRenderbuffer(),st(z.__webglDepthRenderbuffer,C,!0)),e.bindFramebuffer(s.FRAMEBUFFER,null)}}if(Y){e.bindTexture(s.TEXTURE_CUBE_MAP,q.__webglTexture),Dt(s.TEXTURE_CUBE_MAP,v);for(let gt=0;gt<6;gt++)if(v.mipmaps&&v.mipmaps.length>0)for(let Rt=0;Rt<v.mipmaps.length;Rt++)ct(z.__webglFramebuffer[gt][Rt],C,v,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+gt,Rt);else ct(z.__webglFramebuffer[gt],C,v,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+gt,0);m(v)&&p(s.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Lt){for(let gt=0,Rt=J.length;gt<Rt;gt++){const It=J[gt],nt=n.get(It);e.bindTexture(s.TEXTURE_2D,nt.__webglTexture),Dt(s.TEXTURE_2D,It),ct(z.__webglFramebuffer,C,It,s.COLOR_ATTACHMENT0+gt,s.TEXTURE_2D,0),m(It)&&p(s.TEXTURE_2D)}e.unbindTexture()}else{let gt=s.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(gt=C.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(gt,q.__webglTexture),Dt(gt,v),v.mipmaps&&v.mipmaps.length>0)for(let Rt=0;Rt<v.mipmaps.length;Rt++)ct(z.__webglFramebuffer[Rt],C,v,s.COLOR_ATTACHMENT0,gt,Rt);else ct(z.__webglFramebuffer,C,v,s.COLOR_ATTACHMENT0,gt,0);m(v)&&p(gt),e.unbindTexture()}C.depthBuffer&&ht(C)}function P(C){const v=C.textures;for(let z=0,q=v.length;z<q;z++){const J=v[z];if(m(J)){const Y=E(C),Lt=n.get(J).__webglTexture;e.bindTexture(Y,Lt),p(Y),e.unbindTexture()}}}const Mt=[],ut=[];function Nt(C){if(C.samples>0){if(At(C)===!1){const v=C.textures,z=C.width,q=C.height;let J=s.COLOR_BUFFER_BIT;const Y=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Lt=n.get(C),gt=v.length>1;if(gt)for(let It=0;It<v.length;It++)e.bindFramebuffer(s.FRAMEBUFFER,Lt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+It,s.RENDERBUFFER,null),e.bindFramebuffer(s.FRAMEBUFFER,Lt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+It,s.TEXTURE_2D,null,0);e.bindFramebuffer(s.READ_FRAMEBUFFER,Lt.__webglMultisampledFramebuffer);const Rt=C.texture.mipmaps;Rt&&Rt.length>0?e.bindFramebuffer(s.DRAW_FRAMEBUFFER,Lt.__webglFramebuffer[0]):e.bindFramebuffer(s.DRAW_FRAMEBUFFER,Lt.__webglFramebuffer);for(let It=0;It<v.length;It++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(J|=s.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(J|=s.STENCIL_BUFFER_BIT)),gt){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,Lt.__webglColorRenderbuffer[It]);const nt=n.get(v[It]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,nt,0)}s.blitFramebuffer(0,0,z,q,0,0,z,q,J,s.NEAREST),l===!0&&(Mt.length=0,ut.length=0,Mt.push(s.COLOR_ATTACHMENT0+It),C.depthBuffer&&C.resolveDepthBuffer===!1&&(Mt.push(Y),ut.push(Y),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,ut)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,Mt))}if(e.bindFramebuffer(s.READ_FRAMEBUFFER,null),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),gt)for(let It=0;It<v.length;It++){e.bindFramebuffer(s.FRAMEBUFFER,Lt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+It,s.RENDERBUFFER,Lt.__webglColorRenderbuffer[It]);const nt=n.get(v[It]).__webglTexture;e.bindFramebuffer(s.FRAMEBUFFER,Lt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+It,s.TEXTURE_2D,nt,0)}e.bindFramebuffer(s.DRAW_FRAMEBUFFER,Lt.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&l){const v=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[v])}}}function lt(C){return Math.min(i.maxSamples,C.samples)}function At(C){const v=n.get(C);return C.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function xt(C){const v=a.render.frame;h.get(C)!==v&&(h.set(C,v),C.update())}function bt(C,v){const z=C.colorSpace,q=C.format,J=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||z!==Di&&z!==Cn&&(Qt.getTransfer(z)===se?(q!==Je||J!==an)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",z)),v}function Ht(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(c.width=C.naturalWidth||C.width,c.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(c.width=C.displayWidth,c.height=C.displayHeight):(c.width=C.width,c.height=C.height),c}this.allocateTextureUnit=O,this.resetTextureUnits=B,this.setTexture2D=X,this.setTexture2DArray=k,this.setTexture3D=Q,this.setTextureCube=F,this.rebindTextures=Ft,this.setupRenderTarget=Pt,this.updateRenderTargetMipmap=P,this.updateMultisampleRenderTarget=Nt,this.setupDepthRenderbuffer=ht,this.setupFrameBufferTexture=ct,this.useMultisampledRTT=At}function Rg(s,t){function e(n,i=Cn){let r;const a=Qt.getTransfer(i);if(n===an)return s.UNSIGNED_BYTE;if(n===ka)return s.UNSIGNED_SHORT_4_4_4_4;if(n===za)return s.UNSIGNED_SHORT_5_5_5_1;if(n===Dl)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===Al)return s.BYTE;if(n===Rl)return s.SHORT;if(n===Ji)return s.UNSIGNED_SHORT;if(n===Ba)return s.INT;if(n===Jn)return s.UNSIGNED_INT;if(n===gn)return s.FLOAT;if(n===cs)return s.HALF_FLOAT;if(n===Pl)return s.ALPHA;if(n===Ll)return s.RGB;if(n===Je)return s.RGBA;if(n===ts)return s.DEPTH_COMPONENT;if(n===es)return s.DEPTH_STENCIL;if(n===Il)return s.RED;if(n===Ha)return s.RED_INTEGER;if(n===Nl)return s.RG;if(n===Va)return s.RG_INTEGER;if(n===Ga)return s.RGBA_INTEGER;if(n===Vs||n===Gs||n===Ws||n===Xs)if(a===se)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Vs)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Gs)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Ws)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Xs)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Vs)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Gs)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Ws)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Xs)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===ia||n===sa||n===ra||n===aa)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===ia)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===sa)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===ra)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===aa)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===oa||n===la||n===ca)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===oa||n===la)return a===se?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===ca)return a===se?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===ha||n===ua||n===da||n===fa||n===pa||n===ma||n===ga||n===_a||n===va||n===xa||n===Ma||n===ya||n===Sa||n===Ta)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===ha)return a===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===ua)return a===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===da)return a===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===fa)return a===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===pa)return a===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===ma)return a===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===ga)return a===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===_a)return a===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===va)return a===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===xa)return a===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Ma)return a===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===ya)return a===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Sa)return a===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Ta)return a===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ys||n===Ea||n===ba)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Ys)return a===se?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Ea)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===ba)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Ol||n===wa||n===Ca||n===Aa)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Ys)return r.COMPRESSED_RED_RGTC1_EXT;if(n===wa)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ca)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Aa)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Qi?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:e}}const Dg=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Pg=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Lg{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const i=new Le,r=t.properties.get(i);r.__webglTexture=e.texture,(e.depthNear!==n.depthNear||e.depthFar!==n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Pn({vertexShader:Dg,fragmentShader:Pg,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Et(new ze(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Ig extends ei{constructor(t,e){super();const n=this;let i=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,u=null,f=null,d=null,g=null;const _=new Lg,m=e.getContextAttributes();let p=null,E=null;const M=[],x=[],w=new dt;let b=null;const R=new Ue;R.viewport=new oe;const L=new Ue;L.viewport=new oe;const S=[R,L],y=new Ku;let D=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(W){let tt=M[W];return tt===void 0&&(tt=new Cr,M[W]=tt),tt.getTargetRaySpace()},this.getControllerGrip=function(W){let tt=M[W];return tt===void 0&&(tt=new Cr,M[W]=tt),tt.getGripSpace()},this.getHand=function(W){let tt=M[W];return tt===void 0&&(tt=new Cr,M[W]=tt),tt.getHandSpace()};function O(W){const tt=x.indexOf(W.inputSource);if(tt===-1)return;const et=M[tt];et!==void 0&&(et.update(W.inputSource,W.frame,c||a),et.dispatchEvent({type:W.type,data:W.inputSource}))}function H(){i.removeEventListener("select",O),i.removeEventListener("selectstart",O),i.removeEventListener("selectend",O),i.removeEventListener("squeeze",O),i.removeEventListener("squeezestart",O),i.removeEventListener("squeezeend",O),i.removeEventListener("end",H),i.removeEventListener("inputsourceschange",X);for(let W=0;W<M.length;W++){const tt=x[W];tt!==null&&(x[W]=null,M[W].disconnect(tt))}D=null,B=null,_.reset(),t.setRenderTarget(p),d=null,f=null,u=null,i=null,E=null,Ut.stop(),n.isPresenting=!1,t.setPixelRatio(b),t.setSize(w.width,w.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(W){r=W,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(W){o=W,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(W){c=W},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(W){if(i=W,i!==null){if(p=t.getRenderTarget(),i.addEventListener("select",O),i.addEventListener("selectstart",O),i.addEventListener("selectend",O),i.addEventListener("squeeze",O),i.addEventListener("squeezestart",O),i.addEventListener("squeezeend",O),i.addEventListener("end",H),i.addEventListener("inputsourceschange",X),m.xrCompatible!==!0&&await e.makeXRCompatible(),b=t.getPixelRatio(),t.getSize(w),typeof XRWebGLBinding<"u"&&"createProjectionLayer"in XRWebGLBinding.prototype){let et=null,K=null,ct=null;m.depth&&(ct=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,et=m.stencil?es:ts,K=m.stencil?Qi:Jn);const st={colorFormat:e.RGBA8,depthFormat:ct,scaleFactor:r};u=new XRWebGLBinding(i,e),f=u.createProjectionLayer(st),i.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),E=new Qn(f.textureWidth,f.textureHeight,{format:Je,type:an,depthTexture:new Yl(f.textureWidth,f.textureHeight,K,void 0,void 0,void 0,void 0,void 0,void 0,et),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{const et={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(i,e,et),i.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),E=new Qn(d.framebufferWidth,d.framebufferHeight,{format:Je,type:an,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}E.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await i.requestReferenceSpace(o),Ut.setContext(i),Ut.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function X(W){for(let tt=0;tt<W.removed.length;tt++){const et=W.removed[tt],K=x.indexOf(et);K>=0&&(x[K]=null,M[K].disconnect(et))}for(let tt=0;tt<W.added.length;tt++){const et=W.added[tt];let K=x.indexOf(et);if(K===-1){for(let st=0;st<M.length;st++)if(st>=x.length){x.push(et),K=st;break}else if(x[st]===null){x[st]=et,K=st;break}if(K===-1)break}const ct=M[K];ct&&ct.connect(et)}}const k=new A,Q=new A;function F(W,tt,et){k.setFromMatrixPosition(tt.matrixWorld),Q.setFromMatrixPosition(et.matrixWorld);const K=k.distanceTo(Q),ct=tt.projectionMatrix.elements,st=et.projectionMatrix.elements,Z=ct[14]/(ct[10]-1),ht=ct[14]/(ct[10]+1),Ft=(ct[9]+1)/ct[5],Pt=(ct[9]-1)/ct[5],P=(ct[8]-1)/ct[0],Mt=(st[8]+1)/st[0],ut=Z*P,Nt=Z*Mt,lt=K/(-P+Mt),At=lt*-P;if(tt.matrixWorld.decompose(W.position,W.quaternion,W.scale),W.translateX(At),W.translateZ(lt),W.matrixWorld.compose(W.position,W.quaternion,W.scale),W.matrixWorldInverse.copy(W.matrixWorld).invert(),ct[10]===-1)W.projectionMatrix.copy(tt.projectionMatrix),W.projectionMatrixInverse.copy(tt.projectionMatrixInverse);else{const xt=Z+lt,bt=ht+lt,Ht=ut-At,C=Nt+(K-At),v=Ft*ht/bt*xt,z=Pt*ht/bt*xt;W.projectionMatrix.makePerspective(Ht,C,v,z,xt,bt),W.projectionMatrixInverse.copy(W.projectionMatrix).invert()}}function $(W,tt){tt===null?W.matrixWorld.copy(W.matrix):W.matrixWorld.multiplyMatrices(tt.matrixWorld,W.matrix),W.matrixWorldInverse.copy(W.matrixWorld).invert()}this.updateCamera=function(W){if(i===null)return;let tt=W.near,et=W.far;_.texture!==null&&(_.depthNear>0&&(tt=_.depthNear),_.depthFar>0&&(et=_.depthFar)),y.near=L.near=R.near=tt,y.far=L.far=R.far=et,(D!==y.near||B!==y.far)&&(i.updateRenderState({depthNear:y.near,depthFar:y.far}),D=y.near,B=y.far),R.layers.mask=W.layers.mask|2,L.layers.mask=W.layers.mask|4,y.layers.mask=R.layers.mask|L.layers.mask;const K=W.parent,ct=y.cameras;$(y,K);for(let st=0;st<ct.length;st++)$(ct[st],K);ct.length===2?F(y,R,L):y.projectionMatrix.copy(R.projectionMatrix),ot(W,y,K)};function ot(W,tt,et){et===null?W.matrix.copy(tt.matrixWorld):(W.matrix.copy(et.matrixWorld),W.matrix.invert(),W.matrix.multiply(tt.matrixWorld)),W.matrix.decompose(W.position,W.quaternion,W.scale),W.updateMatrixWorld(!0),W.projectionMatrix.copy(tt.projectionMatrix),W.projectionMatrixInverse.copy(tt.projectionMatrixInverse),W.isPerspectiveCamera&&(W.fov=Pi*2*Math.atan(1/W.projectionMatrix.elements[5]),W.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(f===null&&d===null))return l},this.setFoveation=function(W){l=W,f!==null&&(f.fixedFoveation=W),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=W)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(y)};let ft=null;function Dt(W,tt){if(h=tt.getViewerPose(c||a),g=tt,h!==null){const et=h.views;d!==null&&(t.setRenderTargetFramebuffer(E,d.framebuffer),t.setRenderTarget(E));let K=!1;et.length!==y.cameras.length&&(y.cameras.length=0,K=!0);for(let Z=0;Z<et.length;Z++){const ht=et[Z];let Ft=null;if(d!==null)Ft=d.getViewport(ht);else{const P=u.getViewSubImage(f,ht);Ft=P.viewport,Z===0&&(t.setRenderTargetTextures(E,P.colorTexture,P.depthStencilTexture),t.setRenderTarget(E))}let Pt=S[Z];Pt===void 0&&(Pt=new Ue,Pt.layers.enable(Z),Pt.viewport=new oe,S[Z]=Pt),Pt.matrix.fromArray(ht.transform.matrix),Pt.matrix.decompose(Pt.position,Pt.quaternion,Pt.scale),Pt.projectionMatrix.fromArray(ht.projectionMatrix),Pt.projectionMatrixInverse.copy(Pt.projectionMatrix).invert(),Pt.viewport.set(Ft.x,Ft.y,Ft.width,Ft.height),Z===0&&(y.matrix.copy(Pt.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),K===!0&&y.cameras.push(Pt)}const ct=i.enabledFeatures;if(ct&&ct.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&u){const Z=u.getDepthInformation(et[0]);Z&&Z.isValid&&Z.texture&&_.init(t,Z,i.renderState)}}for(let et=0;et<M.length;et++){const K=x[et],ct=M[et];K!==null&&ct!==void 0&&ct.update(K,tt,c||a)}ft&&ft(W,tt),tt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:tt}),g=null}const Ut=new rc;Ut.setAnimationLoop(Dt),this.setAnimationLoop=function(W){ft=W},this.dispose=function(){}}}const Xn=new en,Ng=new ce;function Og(s,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Vl(s)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function i(m,p,E,M,x){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p)):p.isMeshStandardMaterial?(r(m,p),f(m,p),p.isMeshPhysicalMaterial&&d(m,p,x)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),_(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?l(m,p,E,M):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Ce&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Ce&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const E=t.get(p),M=E.envMap,x=E.envMapRotation;M&&(m.envMap.value=M,Xn.copy(x),Xn.x*=-1,Xn.y*=-1,Xn.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(Xn.y*=-1,Xn.z*=-1),m.envMapRotation.value.setFromMatrix4(Ng.makeRotationFromEuler(Xn)),m.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,E,M){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*E,m.scale.value=M*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,E){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Ce&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=E.texture,m.transmissionSamplerSize.value.set(E.width,E.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){const E=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(E.matrixWorld),m.nearDistance.value=E.shadow.camera.near,m.farDistance.value=E.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function Ug(s,t,e,n){let i={},r={},a=[];const o=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function l(E,M){const x=M.program;n.uniformBlockBinding(E,x)}function c(E,M){let x=i[E.id];x===void 0&&(g(E),x=h(E),i[E.id]=x,E.addEventListener("dispose",m));const w=M.program;n.updateUBOMapping(E,w);const b=t.render.frame;r[E.id]!==b&&(f(E),r[E.id]=b)}function h(E){const M=u();E.__bindingPointIndex=M;const x=s.createBuffer(),w=E.__size,b=E.usage;return s.bindBuffer(s.UNIFORM_BUFFER,x),s.bufferData(s.UNIFORM_BUFFER,w,b),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,M,x),x}function u(){for(let E=0;E<o;E++)if(a.indexOf(E)===-1)return a.push(E),E;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(E){const M=i[E.id],x=E.uniforms,w=E.__cache;s.bindBuffer(s.UNIFORM_BUFFER,M);for(let b=0,R=x.length;b<R;b++){const L=Array.isArray(x[b])?x[b]:[x[b]];for(let S=0,y=L.length;S<y;S++){const D=L[S];if(d(D,b,S,w)===!0){const B=D.__offset,O=Array.isArray(D.value)?D.value:[D.value];let H=0;for(let X=0;X<O.length;X++){const k=O[X],Q=_(k);typeof k=="number"||typeof k=="boolean"?(D.__data[0]=k,s.bufferSubData(s.UNIFORM_BUFFER,B+H,D.__data)):k.isMatrix3?(D.__data[0]=k.elements[0],D.__data[1]=k.elements[1],D.__data[2]=k.elements[2],D.__data[3]=0,D.__data[4]=k.elements[3],D.__data[5]=k.elements[4],D.__data[6]=k.elements[5],D.__data[7]=0,D.__data[8]=k.elements[6],D.__data[9]=k.elements[7],D.__data[10]=k.elements[8],D.__data[11]=0):(k.toArray(D.__data,H),H+=Q.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,B,D.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function d(E,M,x,w){const b=E.value,R=M+"_"+x;if(w[R]===void 0)return typeof b=="number"||typeof b=="boolean"?w[R]=b:w[R]=b.clone(),!0;{const L=w[R];if(typeof b=="number"||typeof b=="boolean"){if(L!==b)return w[R]=b,!0}else if(L.equals(b)===!1)return L.copy(b),!0}return!1}function g(E){const M=E.uniforms;let x=0;const w=16;for(let R=0,L=M.length;R<L;R++){const S=Array.isArray(M[R])?M[R]:[M[R]];for(let y=0,D=S.length;y<D;y++){const B=S[y],O=Array.isArray(B.value)?B.value:[B.value];for(let H=0,X=O.length;H<X;H++){const k=O[H],Q=_(k),F=x%w,$=F%Q.boundary,ot=F+$;x+=$,ot!==0&&w-ot<Q.storage&&(x+=w-ot),B.__data=new Float32Array(Q.storage/Float32Array.BYTES_PER_ELEMENT),B.__offset=x,x+=Q.storage}}}const b=x%w;return b>0&&(x+=w-b),E.__size=x,E.__cache={},this}function _(E){const M={boundary:0,storage:0};return typeof E=="number"||typeof E=="boolean"?(M.boundary=4,M.storage=4):E.isVector2?(M.boundary=8,M.storage=8):E.isVector3||E.isColor?(M.boundary=16,M.storage=12):E.isVector4?(M.boundary=16,M.storage=16):E.isMatrix3?(M.boundary=48,M.storage=48):E.isMatrix4?(M.boundary=64,M.storage=64):E.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",E),M}function m(E){const M=E.target;M.removeEventListener("dispose",m);const x=a.indexOf(M.__bindingPointIndex);a.splice(x,1),s.deleteBuffer(i[M.id]),delete i[M.id],delete r[M.id]}function p(){for(const E in i)s.deleteBuffer(i[E]);a=[],i={},r={}}return{bind:l,update:c,dispose:p}}class Fg{constructor(t={}){const{canvas:e=Th(),context:n=null,depth:i=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:f=!1}=t;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=a;const g=new Uint32Array(4),_=new Int32Array(4);let m=null,p=null;const E=[],M=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Rn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const x=this;let w=!1;this._outputColorSpace=He;let b=0,R=0,L=null,S=-1,y=null;const D=new oe,B=new oe;let O=null;const H=new Kt(0);let X=0,k=e.width,Q=e.height,F=1,$=null,ot=null;const ft=new oe(0,0,k,Q),Dt=new oe(0,0,k,Q);let Ut=!1;const W=new Ka;let tt=!1,et=!1;const K=new ce,ct=new ce,st=new A,Z=new oe,ht={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ft=!1;function Pt(){return L===null?F:1}let P=n;function Mt(T,N){return e.getContext(T,N)}try{const T={alpha:!0,depth:i,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Ua}`),e.addEventListener("webglcontextlost",Tt,!1),e.addEventListener("webglcontextrestored",rt,!1),e.addEventListener("webglcontextcreationerror",j,!1),P===null){const N="webgl2";if(P=Mt(N,T),P===null)throw Mt(N)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let ut,Nt,lt,At,xt,bt,Ht,C,v,z,q,J,Y,Lt,gt,Rt,It,nt,yt,zt,kt,pt,Wt,I;function _t(){ut=new qp(P),ut.init(),pt=new Rg(P,ut),Nt=new zp(P,ut,t,pt),lt=new Cg(P,ut),Nt.reverseDepthBuffer&&f&&lt.buffers.depth.setReversed(!0),At=new jp(P),xt=new pg,bt=new Ag(P,ut,lt,xt,Nt,pt,At),Ht=new Vp(x),C=new Yp(x),v=new ed(P),Wt=new Bp(P,v),z=new Kp(P,v,At,Wt),q=new Jp(P,z,v,At),yt=new $p(P,Nt,bt),Rt=new Hp(xt),J=new fg(x,Ht,C,ut,Nt,Wt,Rt),Y=new Og(x,xt),Lt=new gg,gt=new Sg(ut),nt=new Fp(x,Ht,C,lt,q,d,l),It=new bg(x,q,Nt),I=new Ug(P,At,Nt,lt),zt=new kp(P,ut,At),kt=new Zp(P,ut,At),At.programs=J.programs,x.capabilities=Nt,x.extensions=ut,x.properties=xt,x.renderLists=Lt,x.shadowMap=It,x.state=lt,x.info=At}_t();const it=new Ig(x,P);this.xr=it,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){const T=ut.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=ut.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return F},this.setPixelRatio=function(T){T!==void 0&&(F=T,this.setSize(k,Q,!1))},this.getSize=function(T){return T.set(k,Q)},this.setSize=function(T,N,V=!0){if(it.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}k=T,Q=N,e.width=Math.floor(T*F),e.height=Math.floor(N*F),V===!0&&(e.style.width=T+"px",e.style.height=N+"px"),this.setViewport(0,0,T,N)},this.getDrawingBufferSize=function(T){return T.set(k*F,Q*F).floor()},this.setDrawingBufferSize=function(T,N,V){k=T,Q=N,F=V,e.width=Math.floor(T*V),e.height=Math.floor(N*V),this.setViewport(0,0,T,N)},this.getCurrentViewport=function(T){return T.copy(D)},this.getViewport=function(T){return T.copy(ft)},this.setViewport=function(T,N,V,G){T.isVector4?ft.set(T.x,T.y,T.z,T.w):ft.set(T,N,V,G),lt.viewport(D.copy(ft).multiplyScalar(F).round())},this.getScissor=function(T){return T.copy(Dt)},this.setScissor=function(T,N,V,G){T.isVector4?Dt.set(T.x,T.y,T.z,T.w):Dt.set(T,N,V,G),lt.scissor(B.copy(Dt).multiplyScalar(F).round())},this.getScissorTest=function(){return Ut},this.setScissorTest=function(T){lt.setScissorTest(Ut=T)},this.setOpaqueSort=function(T){$=T},this.setTransparentSort=function(T){ot=T},this.getClearColor=function(T){return T.copy(nt.getClearColor())},this.setClearColor=function(){nt.setClearColor(...arguments)},this.getClearAlpha=function(){return nt.getClearAlpha()},this.setClearAlpha=function(){nt.setClearAlpha(...arguments)},this.clear=function(T=!0,N=!0,V=!0){let G=0;if(T){let U=!1;if(L!==null){const at=L.texture.format;U=at===Ga||at===Va||at===Ha}if(U){const at=L.texture.type,vt=at===an||at===Jn||at===Ji||at===Qi||at===ka||at===za,Ct=nt.getClearColor(),St=nt.getClearAlpha(),Vt=Ct.r,Gt=Ct.g,Ot=Ct.b;vt?(g[0]=Vt,g[1]=Gt,g[2]=Ot,g[3]=St,P.clearBufferuiv(P.COLOR,0,g)):(_[0]=Vt,_[1]=Gt,_[2]=Ot,_[3]=St,P.clearBufferiv(P.COLOR,0,_))}else G|=P.COLOR_BUFFER_BIT}N&&(G|=P.DEPTH_BUFFER_BIT),V&&(G|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),P.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",Tt,!1),e.removeEventListener("webglcontextrestored",rt,!1),e.removeEventListener("webglcontextcreationerror",j,!1),nt.dispose(),Lt.dispose(),gt.dispose(),xt.dispose(),Ht.dispose(),C.dispose(),q.dispose(),Wt.dispose(),I.dispose(),J.dispose(),it.dispose(),it.removeEventListener("sessionstart",no),it.removeEventListener("sessionend",io),Ln.stop()};function Tt(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),w=!0}function rt(){console.log("THREE.WebGLRenderer: Context Restored."),w=!1;const T=At.autoReset,N=It.enabled,V=It.autoUpdate,G=It.needsUpdate,U=It.type;_t(),At.autoReset=T,It.enabled=N,It.autoUpdate=V,It.needsUpdate=G,It.type=U}function j(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function wt(T){const N=T.target;N.removeEventListener("dispose",wt),Yt(N)}function Yt(T){he(T),xt.remove(T)}function he(T){const N=xt.get(T).programs;N!==void 0&&(N.forEach(function(V){J.releaseProgram(V)}),T.isShaderMaterial&&J.releaseShaderCache(T))}this.renderBufferDirect=function(T,N,V,G,U,at){N===null&&(N=ht);const vt=U.isMesh&&U.matrixWorld.determinant()<0,Ct=dc(T,N,V,G,U);lt.setMaterial(G,vt);let St=V.index,Vt=1;if(G.wireframe===!0){if(St=z.getWireframeAttribute(V),St===void 0)return;Vt=2}const Gt=V.drawRange,Ot=V.attributes.position;let $t=Gt.start*Vt,ie=(Gt.start+Gt.count)*Vt;at!==null&&($t=Math.max($t,at.start*Vt),ie=Math.min(ie,(at.start+at.count)*Vt)),St!==null?($t=Math.max($t,0),ie=Math.min(ie,St.count)):Ot!=null&&($t=Math.max($t,0),ie=Math.min(ie,Ot.count));const de=ie-$t;if(de<0||de===1/0)return;Wt.setup(U,G,Ct,V,St);let me,Jt=zt;if(St!==null&&(me=v.get(St),Jt=kt,Jt.setIndex(me)),U.isMesh)G.wireframe===!0?(lt.setLineWidth(G.wireframeLinewidth*Pt()),Jt.setMode(P.LINES)):Jt.setMode(P.TRIANGLES);else if(U.isLine){let Bt=G.linewidth;Bt===void 0&&(Bt=1),lt.setLineWidth(Bt*Pt()),U.isLineSegments?Jt.setMode(P.LINES):U.isLineLoop?Jt.setMode(P.LINE_LOOP):Jt.setMode(P.LINE_STRIP)}else U.isPoints?Jt.setMode(P.POINTS):U.isSprite&&Jt.setMode(P.TRIANGLES);if(U.isBatchedMesh)if(U._multiDrawInstances!==null)bi("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),Jt.renderMultiDrawInstances(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount,U._multiDrawInstances);else if(ut.get("WEBGL_multi_draw"))Jt.renderMultiDraw(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount);else{const Bt=U._multiDrawStarts,Ee=U._multiDrawCounts,ee=U._multiDrawCount,qe=St?v.get(St).bytesPerElement:1,ri=xt.get(G).currentProgram.getUniforms();for(let Fe=0;Fe<ee;Fe++)ri.setValue(P,"_gl_DrawID",Fe),Jt.render(Bt[Fe]/qe,Ee[Fe])}else if(U.isInstancedMesh)Jt.renderInstances($t,de,U.count);else if(V.isInstancedBufferGeometry){const Bt=V._maxInstanceCount!==void 0?V._maxInstanceCount:1/0,Ee=Math.min(V.instanceCount,Bt);Jt.renderInstances($t,de,Ee)}else Jt.render($t,de)};function ne(T,N,V){T.transparent===!0&&T.side===le&&T.forceSinglePass===!1?(T.side=Ce,T.needsUpdate=!0,ds(T,N,V),T.side=Dn,T.needsUpdate=!0,ds(T,N,V),T.side=le):ds(T,N,V)}this.compile=function(T,N,V=null){V===null&&(V=T),p=gt.get(V),p.init(N),M.push(p),V.traverseVisible(function(U){U.isLight&&U.layers.test(N.layers)&&(p.pushLight(U),U.castShadow&&p.pushShadow(U))}),T!==V&&T.traverseVisible(function(U){U.isLight&&U.layers.test(N.layers)&&(p.pushLight(U),U.castShadow&&p.pushShadow(U))}),p.setupLights();const G=new Set;return T.traverse(function(U){if(!(U.isMesh||U.isPoints||U.isLine||U.isSprite))return;const at=U.material;if(at)if(Array.isArray(at))for(let vt=0;vt<at.length;vt++){const Ct=at[vt];ne(Ct,V,U),G.add(Ct)}else ne(at,V,U),G.add(at)}),p=M.pop(),G},this.compileAsync=function(T,N,V=null){const G=this.compile(T,N,V);return new Promise(U=>{function at(){if(G.forEach(function(vt){xt.get(vt).currentProgram.isReady()&&G.delete(vt)}),G.size===0){U(T);return}setTimeout(at,10)}ut.get("KHR_parallel_shader_compile")!==null?at():setTimeout(at,10)})};let Ye=null;function ln(T){Ye&&Ye(T)}function no(){Ln.stop()}function io(){Ln.start()}const Ln=new rc;Ln.setAnimationLoop(ln),typeof self<"u"&&Ln.setContext(self),this.setAnimationLoop=function(T){Ye=T,it.setAnimationLoop(T),T===null?Ln.stop():Ln.start()},it.addEventListener("sessionstart",no),it.addEventListener("sessionend",io),this.render=function(T,N){if(N!==void 0&&N.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(w===!0)return;if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),it.enabled===!0&&it.isPresenting===!0&&(it.cameraAutoUpdate===!0&&it.updateCamera(N),N=it.getCamera()),T.isScene===!0&&T.onBeforeRender(x,T,N,L),p=gt.get(T,M.length),p.init(N),M.push(p),ct.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),W.setFromProjectionMatrix(ct),et=this.localClippingEnabled,tt=Rt.init(this.clippingPlanes,et),m=Lt.get(T,E.length),m.init(),E.push(m),it.enabled===!0&&it.isPresenting===!0){const at=x.xr.getDepthSensingMesh();at!==null&&sr(at,N,-1/0,x.sortObjects)}sr(T,N,0,x.sortObjects),m.finish(),x.sortObjects===!0&&m.sort($,ot),Ft=it.enabled===!1||it.isPresenting===!1||it.hasDepthSensing()===!1,Ft&&nt.addToRenderList(m,T),this.info.render.frame++,tt===!0&&Rt.beginShadows();const V=p.state.shadowsArray;It.render(V,T,N),tt===!0&&Rt.endShadows(),this.info.autoReset===!0&&this.info.reset();const G=m.opaque,U=m.transmissive;if(p.setupLights(),N.isArrayCamera){const at=N.cameras;if(U.length>0)for(let vt=0,Ct=at.length;vt<Ct;vt++){const St=at[vt];ro(G,U,T,St)}Ft&&nt.render(T);for(let vt=0,Ct=at.length;vt<Ct;vt++){const St=at[vt];so(m,T,St,St.viewport)}}else U.length>0&&ro(G,U,T,N),Ft&&nt.render(T),so(m,T,N);L!==null&&R===0&&(bt.updateMultisampleRenderTarget(L),bt.updateRenderTargetMipmap(L)),T.isScene===!0&&T.onAfterRender(x,T,N),Wt.resetDefaultState(),S=-1,y=null,M.pop(),M.length>0?(p=M[M.length-1],tt===!0&&Rt.setGlobalState(x.clippingPlanes,p.state.camera)):p=null,E.pop(),E.length>0?m=E[E.length-1]:m=null};function sr(T,N,V,G){if(T.visible===!1)return;if(T.layers.test(N.layers)){if(T.isGroup)V=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(N);else if(T.isLight)p.pushLight(T),T.castShadow&&p.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||W.intersectsSprite(T)){G&&Z.setFromMatrixPosition(T.matrixWorld).applyMatrix4(ct);const vt=q.update(T),Ct=T.material;Ct.visible&&m.push(T,vt,Ct,V,Z.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||W.intersectsObject(T))){const vt=q.update(T),Ct=T.material;if(G&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),Z.copy(T.boundingSphere.center)):(vt.boundingSphere===null&&vt.computeBoundingSphere(),Z.copy(vt.boundingSphere.center)),Z.applyMatrix4(T.matrixWorld).applyMatrix4(ct)),Array.isArray(Ct)){const St=vt.groups;for(let Vt=0,Gt=St.length;Vt<Gt;Vt++){const Ot=St[Vt],$t=Ct[Ot.materialIndex];$t&&$t.visible&&m.push(T,vt,$t,V,Z.z,Ot)}}else Ct.visible&&m.push(T,vt,Ct,V,Z.z,null)}}const at=T.children;for(let vt=0,Ct=at.length;vt<Ct;vt++)sr(at[vt],N,V,G)}function so(T,N,V,G){const U=T.opaque,at=T.transmissive,vt=T.transparent;p.setupLightsView(V),tt===!0&&Rt.setGlobalState(x.clippingPlanes,V),G&&lt.viewport(D.copy(G)),U.length>0&&us(U,N,V),at.length>0&&us(at,N,V),vt.length>0&&us(vt,N,V),lt.buffers.depth.setTest(!0),lt.buffers.depth.setMask(!0),lt.buffers.color.setMask(!0),lt.setPolygonOffset(!1)}function ro(T,N,V,G){if((V.isScene===!0?V.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[G.id]===void 0&&(p.state.transmissionRenderTarget[G.id]=new Qn(1,1,{generateMipmaps:!0,type:ut.has("EXT_color_buffer_half_float")||ut.has("EXT_color_buffer_float")?cs:an,minFilter:$n,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Qt.workingColorSpace}));const at=p.state.transmissionRenderTarget[G.id],vt=G.viewport||D;at.setSize(vt.z*x.transmissionResolutionScale,vt.w*x.transmissionResolutionScale);const Ct=x.getRenderTarget();x.setRenderTarget(at),x.getClearColor(H),X=x.getClearAlpha(),X<1&&x.setClearColor(16777215,.5),x.clear(),Ft&&nt.render(V);const St=x.toneMapping;x.toneMapping=Rn;const Vt=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),p.setupLightsView(G),tt===!0&&Rt.setGlobalState(x.clippingPlanes,G),us(T,V,G),bt.updateMultisampleRenderTarget(at),bt.updateRenderTargetMipmap(at),ut.has("WEBGL_multisampled_render_to_texture")===!1){let Gt=!1;for(let Ot=0,$t=N.length;Ot<$t;Ot++){const ie=N[Ot],de=ie.object,me=ie.geometry,Jt=ie.material,Bt=ie.group;if(Jt.side===le&&de.layers.test(G.layers)){const Ee=Jt.side;Jt.side=Ce,Jt.needsUpdate=!0,ao(de,V,G,me,Jt,Bt),Jt.side=Ee,Jt.needsUpdate=!0,Gt=!0}}Gt===!0&&(bt.updateMultisampleRenderTarget(at),bt.updateRenderTargetMipmap(at))}x.setRenderTarget(Ct),x.setClearColor(H,X),Vt!==void 0&&(G.viewport=Vt),x.toneMapping=St}function us(T,N,V){const G=N.isScene===!0?N.overrideMaterial:null;for(let U=0,at=T.length;U<at;U++){const vt=T[U],Ct=vt.object,St=vt.geometry,Vt=vt.group;let Gt=vt.material;Gt.allowOverride===!0&&G!==null&&(Gt=G),Ct.layers.test(V.layers)&&ao(Ct,N,V,St,Gt,Vt)}}function ao(T,N,V,G,U,at){T.onBeforeRender(x,N,V,G,U,at),T.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),U.onBeforeRender(x,N,V,G,T,at),U.transparent===!0&&U.side===le&&U.forceSinglePass===!1?(U.side=Ce,U.needsUpdate=!0,x.renderBufferDirect(V,N,G,U,T,at),U.side=Dn,U.needsUpdate=!0,x.renderBufferDirect(V,N,G,U,T,at),U.side=le):x.renderBufferDirect(V,N,G,U,T,at),T.onAfterRender(x,N,V,G,U,at)}function ds(T,N,V){N.isScene!==!0&&(N=ht);const G=xt.get(T),U=p.state.lights,at=p.state.shadowsArray,vt=U.state.version,Ct=J.getParameters(T,U.state,at,N,V),St=J.getProgramCacheKey(Ct);let Vt=G.programs;G.environment=T.isMeshStandardMaterial?N.environment:null,G.fog=N.fog,G.envMap=(T.isMeshStandardMaterial?C:Ht).get(T.envMap||G.environment),G.envMapRotation=G.environment!==null&&T.envMap===null?N.environmentRotation:T.envMapRotation,Vt===void 0&&(T.addEventListener("dispose",wt),Vt=new Map,G.programs=Vt);let Gt=Vt.get(St);if(Gt!==void 0){if(G.currentProgram===Gt&&G.lightsStateVersion===vt)return lo(T,Ct),Gt}else Ct.uniforms=J.getUniforms(T),T.onBeforeCompile(Ct,x),Gt=J.acquireProgram(Ct,St),Vt.set(St,Gt),G.uniforms=Ct.uniforms;const Ot=G.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Ot.clippingPlanes=Rt.uniform),lo(T,Ct),G.needsLights=pc(T),G.lightsStateVersion=vt,G.needsLights&&(Ot.ambientLightColor.value=U.state.ambient,Ot.lightProbe.value=U.state.probe,Ot.directionalLights.value=U.state.directional,Ot.directionalLightShadows.value=U.state.directionalShadow,Ot.spotLights.value=U.state.spot,Ot.spotLightShadows.value=U.state.spotShadow,Ot.rectAreaLights.value=U.state.rectArea,Ot.ltc_1.value=U.state.rectAreaLTC1,Ot.ltc_2.value=U.state.rectAreaLTC2,Ot.pointLights.value=U.state.point,Ot.pointLightShadows.value=U.state.pointShadow,Ot.hemisphereLights.value=U.state.hemi,Ot.directionalShadowMap.value=U.state.directionalShadowMap,Ot.directionalShadowMatrix.value=U.state.directionalShadowMatrix,Ot.spotShadowMap.value=U.state.spotShadowMap,Ot.spotLightMatrix.value=U.state.spotLightMatrix,Ot.spotLightMap.value=U.state.spotLightMap,Ot.pointShadowMap.value=U.state.pointShadowMap,Ot.pointShadowMatrix.value=U.state.pointShadowMatrix),G.currentProgram=Gt,G.uniformsList=null,Gt}function oo(T){if(T.uniformsList===null){const N=T.currentProgram.getUniforms();T.uniformsList=qs.seqWithValue(N.seq,T.uniforms)}return T.uniformsList}function lo(T,N){const V=xt.get(T);V.outputColorSpace=N.outputColorSpace,V.batching=N.batching,V.batchingColor=N.batchingColor,V.instancing=N.instancing,V.instancingColor=N.instancingColor,V.instancingMorph=N.instancingMorph,V.skinning=N.skinning,V.morphTargets=N.morphTargets,V.morphNormals=N.morphNormals,V.morphColors=N.morphColors,V.morphTargetsCount=N.morphTargetsCount,V.numClippingPlanes=N.numClippingPlanes,V.numIntersection=N.numClipIntersection,V.vertexAlphas=N.vertexAlphas,V.vertexTangents=N.vertexTangents,V.toneMapping=N.toneMapping}function dc(T,N,V,G,U){N.isScene!==!0&&(N=ht),bt.resetTextureUnits();const at=N.fog,vt=G.isMeshStandardMaterial?N.environment:null,Ct=L===null?x.outputColorSpace:L.isXRRenderTarget===!0?L.texture.colorSpace:Di,St=(G.isMeshStandardMaterial?C:Ht).get(G.envMap||vt),Vt=G.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,Gt=!!V.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),Ot=!!V.morphAttributes.position,$t=!!V.morphAttributes.normal,ie=!!V.morphAttributes.color;let de=Rn;G.toneMapped&&(L===null||L.isXRRenderTarget===!0)&&(de=x.toneMapping);const me=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,Jt=me!==void 0?me.length:0,Bt=xt.get(G),Ee=p.state.lights;if(tt===!0&&(et===!0||T!==y)){const Ae=T===y&&G.id===S;Rt.setState(G,T,Ae)}let ee=!1;G.version===Bt.__version?(Bt.needsLights&&Bt.lightsStateVersion!==Ee.state.version||Bt.outputColorSpace!==Ct||U.isBatchedMesh&&Bt.batching===!1||!U.isBatchedMesh&&Bt.batching===!0||U.isBatchedMesh&&Bt.batchingColor===!0&&U.colorTexture===null||U.isBatchedMesh&&Bt.batchingColor===!1&&U.colorTexture!==null||U.isInstancedMesh&&Bt.instancing===!1||!U.isInstancedMesh&&Bt.instancing===!0||U.isSkinnedMesh&&Bt.skinning===!1||!U.isSkinnedMesh&&Bt.skinning===!0||U.isInstancedMesh&&Bt.instancingColor===!0&&U.instanceColor===null||U.isInstancedMesh&&Bt.instancingColor===!1&&U.instanceColor!==null||U.isInstancedMesh&&Bt.instancingMorph===!0&&U.morphTexture===null||U.isInstancedMesh&&Bt.instancingMorph===!1&&U.morphTexture!==null||Bt.envMap!==St||G.fog===!0&&Bt.fog!==at||Bt.numClippingPlanes!==void 0&&(Bt.numClippingPlanes!==Rt.numPlanes||Bt.numIntersection!==Rt.numIntersection)||Bt.vertexAlphas!==Vt||Bt.vertexTangents!==Gt||Bt.morphTargets!==Ot||Bt.morphNormals!==$t||Bt.morphColors!==ie||Bt.toneMapping!==de||Bt.morphTargetsCount!==Jt)&&(ee=!0):(ee=!0,Bt.__version=G.version);let qe=Bt.currentProgram;ee===!0&&(qe=ds(G,N,U));let ri=!1,Fe=!1,Oi=!1;const ue=qe.getUniforms(),Ge=Bt.uniforms;if(lt.useProgram(qe.program)&&(ri=!0,Fe=!0,Oi=!0),G.id!==S&&(S=G.id,Fe=!0),ri||y!==T){lt.buffers.depth.getReversed()?(K.copy(T.projectionMatrix),bh(K),wh(K),ue.setValue(P,"projectionMatrix",K)):ue.setValue(P,"projectionMatrix",T.projectionMatrix),ue.setValue(P,"viewMatrix",T.matrixWorldInverse);const Ie=ue.map.cameraPosition;Ie!==void 0&&Ie.setValue(P,st.setFromMatrixPosition(T.matrixWorld)),Nt.logarithmicDepthBuffer&&ue.setValue(P,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&ue.setValue(P,"isOrthographic",T.isOrthographicCamera===!0),y!==T&&(y=T,Fe=!0,Oi=!0)}if(U.isSkinnedMesh){ue.setOptional(P,U,"bindMatrix"),ue.setOptional(P,U,"bindMatrixInverse");const Ae=U.skeleton;Ae&&(Ae.boneTexture===null&&Ae.computeBoneTexture(),ue.setValue(P,"boneTexture",Ae.boneTexture,bt))}U.isBatchedMesh&&(ue.setOptional(P,U,"batchingTexture"),ue.setValue(P,"batchingTexture",U._matricesTexture,bt),ue.setOptional(P,U,"batchingIdTexture"),ue.setValue(P,"batchingIdTexture",U._indirectTexture,bt),ue.setOptional(P,U,"batchingColorTexture"),U._colorsTexture!==null&&ue.setValue(P,"batchingColorTexture",U._colorsTexture,bt));const We=V.morphAttributes;if((We.position!==void 0||We.normal!==void 0||We.color!==void 0)&&yt.update(U,V,qe),(Fe||Bt.receiveShadow!==U.receiveShadow)&&(Bt.receiveShadow=U.receiveShadow,ue.setValue(P,"receiveShadow",U.receiveShadow)),G.isMeshGouraudMaterial&&G.envMap!==null&&(Ge.envMap.value=St,Ge.flipEnvMap.value=St.isCubeTexture&&St.isRenderTargetTexture===!1?-1:1),G.isMeshStandardMaterial&&G.envMap===null&&N.environment!==null&&(Ge.envMapIntensity.value=N.environmentIntensity),Fe&&(ue.setValue(P,"toneMappingExposure",x.toneMappingExposure),Bt.needsLights&&fc(Ge,Oi),at&&G.fog===!0&&Y.refreshFogUniforms(Ge,at),Y.refreshMaterialUniforms(Ge,G,F,Q,p.state.transmissionRenderTarget[T.id]),qs.upload(P,oo(Bt),Ge,bt)),G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(qs.upload(P,oo(Bt),Ge,bt),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&ue.setValue(P,"center",U.center),ue.setValue(P,"modelViewMatrix",U.modelViewMatrix),ue.setValue(P,"normalMatrix",U.normalMatrix),ue.setValue(P,"modelMatrix",U.matrixWorld),G.isShaderMaterial||G.isRawShaderMaterial){const Ae=G.uniformsGroups;for(let Ie=0,rr=Ae.length;Ie<rr;Ie++){const In=Ae[Ie];I.update(In,qe),I.bind(In,qe)}}return qe}function fc(T,N){T.ambientLightColor.needsUpdate=N,T.lightProbe.needsUpdate=N,T.directionalLights.needsUpdate=N,T.directionalLightShadows.needsUpdate=N,T.pointLights.needsUpdate=N,T.pointLightShadows.needsUpdate=N,T.spotLights.needsUpdate=N,T.spotLightShadows.needsUpdate=N,T.rectAreaLights.needsUpdate=N,T.hemisphereLights.needsUpdate=N}function pc(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return b},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return L},this.setRenderTargetTextures=function(T,N,V){const G=xt.get(T);G.__autoAllocateDepthBuffer=T.resolveDepthBuffer===!1,G.__autoAllocateDepthBuffer===!1&&(G.__useRenderToTexture=!1),xt.get(T.texture).__webglTexture=N,xt.get(T.depthTexture).__webglTexture=G.__autoAllocateDepthBuffer?void 0:V,G.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(T,N){const V=xt.get(T);V.__webglFramebuffer=N,V.__useDefaultFramebuffer=N===void 0};const mc=P.createFramebuffer();this.setRenderTarget=function(T,N=0,V=0){L=T,b=N,R=V;let G=!0,U=null,at=!1,vt=!1;if(T){const St=xt.get(T);if(St.__useDefaultFramebuffer!==void 0)lt.bindFramebuffer(P.FRAMEBUFFER,null),G=!1;else if(St.__webglFramebuffer===void 0)bt.setupRenderTarget(T);else if(St.__hasExternalTextures)bt.rebindTextures(T,xt.get(T.texture).__webglTexture,xt.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const Ot=T.depthTexture;if(St.__boundDepthTexture!==Ot){if(Ot!==null&&xt.has(Ot)&&(T.width!==Ot.image.width||T.height!==Ot.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");bt.setupDepthRenderbuffer(T)}}const Vt=T.texture;(Vt.isData3DTexture||Vt.isDataArrayTexture||Vt.isCompressedArrayTexture)&&(vt=!0);const Gt=xt.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(Gt[N])?U=Gt[N][V]:U=Gt[N],at=!0):T.samples>0&&bt.useMultisampledRTT(T)===!1?U=xt.get(T).__webglMultisampledFramebuffer:Array.isArray(Gt)?U=Gt[V]:U=Gt,D.copy(T.viewport),B.copy(T.scissor),O=T.scissorTest}else D.copy(ft).multiplyScalar(F).floor(),B.copy(Dt).multiplyScalar(F).floor(),O=Ut;if(V!==0&&(U=mc),lt.bindFramebuffer(P.FRAMEBUFFER,U)&&G&&lt.drawBuffers(T,U),lt.viewport(D),lt.scissor(B),lt.setScissorTest(O),at){const St=xt.get(T.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+N,St.__webglTexture,V)}else if(vt){const St=xt.get(T.texture),Vt=N;P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,St.__webglTexture,V,Vt)}else if(T!==null&&V!==0){const St=xt.get(T.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,St.__webglTexture,V)}S=-1},this.readRenderTargetPixels=function(T,N,V,G,U,at,vt,Ct=0){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let St=xt.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&vt!==void 0&&(St=St[vt]),St){lt.bindFramebuffer(P.FRAMEBUFFER,St);try{const Vt=T.textures[Ct],Gt=Vt.format,Ot=Vt.type;if(!Nt.textureFormatReadable(Gt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Nt.textureTypeReadable(Ot)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=T.width-G&&V>=0&&V<=T.height-U&&(T.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+Ct),P.readPixels(N,V,G,U,pt.convert(Gt),pt.convert(Ot),at))}finally{const Vt=L!==null?xt.get(L).__webglFramebuffer:null;lt.bindFramebuffer(P.FRAMEBUFFER,Vt)}}},this.readRenderTargetPixelsAsync=async function(T,N,V,G,U,at,vt,Ct=0){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let St=xt.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&vt!==void 0&&(St=St[vt]),St)if(N>=0&&N<=T.width-G&&V>=0&&V<=T.height-U){lt.bindFramebuffer(P.FRAMEBUFFER,St);const Vt=T.textures[Ct],Gt=Vt.format,Ot=Vt.type;if(!Nt.textureFormatReadable(Gt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Nt.textureTypeReadable(Ot))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const $t=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,$t),P.bufferData(P.PIXEL_PACK_BUFFER,at.byteLength,P.STREAM_READ),T.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+Ct),P.readPixels(N,V,G,U,pt.convert(Gt),pt.convert(Ot),0);const ie=L!==null?xt.get(L).__webglFramebuffer:null;lt.bindFramebuffer(P.FRAMEBUFFER,ie);const de=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);return P.flush(),await Eh(P,de,4),P.bindBuffer(P.PIXEL_PACK_BUFFER,$t),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,at),P.deleteBuffer($t),P.deleteSync(de),at}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(T,N=null,V=0){const G=Math.pow(2,-V),U=Math.floor(T.image.width*G),at=Math.floor(T.image.height*G),vt=N!==null?N.x:0,Ct=N!==null?N.y:0;bt.setTexture2D(T,0),P.copyTexSubImage2D(P.TEXTURE_2D,V,0,0,vt,Ct,U,at),lt.unbindTexture()};const gc=P.createFramebuffer(),_c=P.createFramebuffer();this.copyTextureToTexture=function(T,N,V=null,G=null,U=0,at=null){at===null&&(U!==0?(bi("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),at=U,U=0):at=0);let vt,Ct,St,Vt,Gt,Ot,$t,ie,de;const me=T.isCompressedTexture?T.mipmaps[at]:T.image;if(V!==null)vt=V.max.x-V.min.x,Ct=V.max.y-V.min.y,St=V.isBox3?V.max.z-V.min.z:1,Vt=V.min.x,Gt=V.min.y,Ot=V.isBox3?V.min.z:0;else{const We=Math.pow(2,-U);vt=Math.floor(me.width*We),Ct=Math.floor(me.height*We),T.isDataArrayTexture?St=me.depth:T.isData3DTexture?St=Math.floor(me.depth*We):St=1,Vt=0,Gt=0,Ot=0}G!==null?($t=G.x,ie=G.y,de=G.z):($t=0,ie=0,de=0);const Jt=pt.convert(N.format),Bt=pt.convert(N.type);let Ee;N.isData3DTexture?(bt.setTexture3D(N,0),Ee=P.TEXTURE_3D):N.isDataArrayTexture||N.isCompressedArrayTexture?(bt.setTexture2DArray(N,0),Ee=P.TEXTURE_2D_ARRAY):(bt.setTexture2D(N,0),Ee=P.TEXTURE_2D),P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,N.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,N.unpackAlignment);const ee=P.getParameter(P.UNPACK_ROW_LENGTH),qe=P.getParameter(P.UNPACK_IMAGE_HEIGHT),ri=P.getParameter(P.UNPACK_SKIP_PIXELS),Fe=P.getParameter(P.UNPACK_SKIP_ROWS),Oi=P.getParameter(P.UNPACK_SKIP_IMAGES);P.pixelStorei(P.UNPACK_ROW_LENGTH,me.width),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,me.height),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Vt),P.pixelStorei(P.UNPACK_SKIP_ROWS,Gt),P.pixelStorei(P.UNPACK_SKIP_IMAGES,Ot);const ue=T.isDataArrayTexture||T.isData3DTexture,Ge=N.isDataArrayTexture||N.isData3DTexture;if(T.isDepthTexture){const We=xt.get(T),Ae=xt.get(N),Ie=xt.get(We.__renderTarget),rr=xt.get(Ae.__renderTarget);lt.bindFramebuffer(P.READ_FRAMEBUFFER,Ie.__webglFramebuffer),lt.bindFramebuffer(P.DRAW_FRAMEBUFFER,rr.__webglFramebuffer);for(let In=0;In<St;In++)ue&&(P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,xt.get(T).__webglTexture,U,Ot+In),P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,xt.get(N).__webglTexture,at,de+In)),P.blitFramebuffer(Vt,Gt,vt,Ct,$t,ie,vt,Ct,P.DEPTH_BUFFER_BIT,P.NEAREST);lt.bindFramebuffer(P.READ_FRAMEBUFFER,null),lt.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else if(U!==0||T.isRenderTargetTexture||xt.has(T)){const We=xt.get(T),Ae=xt.get(N);lt.bindFramebuffer(P.READ_FRAMEBUFFER,gc),lt.bindFramebuffer(P.DRAW_FRAMEBUFFER,_c);for(let Ie=0;Ie<St;Ie++)ue?P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,We.__webglTexture,U,Ot+Ie):P.framebufferTexture2D(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,We.__webglTexture,U),Ge?P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,Ae.__webglTexture,at,de+Ie):P.framebufferTexture2D(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,Ae.__webglTexture,at),U!==0?P.blitFramebuffer(Vt,Gt,vt,Ct,$t,ie,vt,Ct,P.COLOR_BUFFER_BIT,P.NEAREST):Ge?P.copyTexSubImage3D(Ee,at,$t,ie,de+Ie,Vt,Gt,vt,Ct):P.copyTexSubImage2D(Ee,at,$t,ie,Vt,Gt,vt,Ct);lt.bindFramebuffer(P.READ_FRAMEBUFFER,null),lt.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else Ge?T.isDataTexture||T.isData3DTexture?P.texSubImage3D(Ee,at,$t,ie,de,vt,Ct,St,Jt,Bt,me.data):N.isCompressedArrayTexture?P.compressedTexSubImage3D(Ee,at,$t,ie,de,vt,Ct,St,Jt,me.data):P.texSubImage3D(Ee,at,$t,ie,de,vt,Ct,St,Jt,Bt,me):T.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,at,$t,ie,vt,Ct,Jt,Bt,me.data):T.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,at,$t,ie,me.width,me.height,Jt,me.data):P.texSubImage2D(P.TEXTURE_2D,at,$t,ie,vt,Ct,Jt,Bt,me);P.pixelStorei(P.UNPACK_ROW_LENGTH,ee),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,qe),P.pixelStorei(P.UNPACK_SKIP_PIXELS,ri),P.pixelStorei(P.UNPACK_SKIP_ROWS,Fe),P.pixelStorei(P.UNPACK_SKIP_IMAGES,Oi),at===0&&N.generateMipmaps&&P.generateMipmap(Ee),lt.unbindTexture()},this.copyTextureToTexture3D=function(T,N,V=null,G=null,U=0){return bi('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(T,N,V,G,U)},this.initRenderTarget=function(T){xt.get(T).__webglFramebuffer===void 0&&bt.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?bt.setTextureCube(T,0):T.isData3DTexture?bt.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?bt.setTexture2DArray(T,0):bt.setTexture2D(T,0),lt.unbindTexture()},this.resetState=function(){b=0,R=0,L=null,lt.reset(),Wt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return _n}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=Qt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Qt._getUnpackColorSpace()}}class Bg{constructor(t){this.scene=t,this.fieldWidth=32*1.5,this.fieldDepth=24*1.5,this.wallHeight=8,this.walls={},this.floor=null,this.textureLoader=new Ja,this.wallMaterial=null,this.obstacles=[],this.portals=[],this.portalLights=[],this.DOOR_WIDTH=4,this.DOOR_HEIGHT=5.2,this.doorWall=null,this.doorSlab=null,this.doorFrameMeshes=[],this._frameMat=null,this._slabMat=null,this._voidMesh=null,this._doorHovered=!1,this._doorOutlineTime=0,this._doorLight=null,this._doorLightTime=0,this.doorIsOpen=!1,this._doorAnimating=!1,this._doorAnimProgress=0,this._doorSlabStartY=0,this._doorSlabEndY=0,this._doorOpeningCenter=null,this._doorIsNS=!0,this.circleRadius=null,this._circularWalls=null,this.nextShape=null,this.hexRings=null,this._hexFloorMeshes=[],this._hexFloorMat=null,this._hexPitMat=null,this._hexOuterWalls=[],this.bullseyeRings=null,this._bullseyeColumnMeshes=[],this.donutInnerRadius=null,this.donutRings=null}applyWallUVs(t,e,n,i){const r=t.attributes.uv,a=t.attributes.normal;for(let o=0;o<r.count;o++){let l=r.getX(o),c=r.getY(o);const h=Math.abs(a.getX(o)),u=Math.abs(a.getY(o));h>.5?(l*=i/6,c*=n/6):u>.5?(l*=e/6,c*=i/6):(l*=e/6,c*=n/6),r.setXY(o,l,c)}r.needsUpdate=!0}applyCylinderUVs(t,e,n){const i=t.attributes.uv,r=t.attributes.normal,a=2*Math.PI*e;for(let o=0;o<i.count;o++){let l=i.getX(o),c=i.getY(o);Math.abs(r.getY(o))<.5?(l*=a/6,c*=n/6):(l*=e*2/6,c*=e*2/6),i.setXY(o,l,c)}i.needsUpdate=!0}getAllWalls(){const t=Object.entries(this.walls).filter(([e,n])=>n!==void 0&&!(this.bullseyeRings&&e.startsWith("poly_"))).map(([,e])=>e);return this.doorSlab&&!this.doorIsOpen&&t.push(this.doorSlab),this._bullseyeColumnMeshes&&this._bullseyeColumnMeshes.length&&t.push(...this._bullseyeColumnMeshes),t}getVisualWalls(){const t=[];for(const e of Object.values(this.walls))e&&e.material instanceof ve&&t.push(e);for(const e of this.doorFrameMeshes)e.material instanceof ve&&t.push(e);this.doorSlab&&t.push(this.doorSlab);for(const e of this._hexOuterWalls||[])e.material instanceof ve&&t.push(e);for(const e of this._bullseyeColumnMeshes||[])e.material instanceof ve&&t.push(e);return t}_initTransparency(){for(const t of this.getVisualWalls()){const e=t.material.clone();e.transparent=!0,e.opacity=1,t.material=e}}load(){const t=this.nextShape||(Math.random()<.4?"circle":"rect");this.nextShape=null,t==="circle"?this._loadCircular():t==="hexagon"?this._loadHexagon():t==="bullseye"?this._loadBullseye():t==="donut"?this._loadDonut():this._loadRectangular()}_loadRectangular(){this.circleRadius=null,this._circularWalls=null,this.fieldWidth=32*1.5,this.fieldDepth=24*1.5;const t=new ze(this.fieldWidth,this.fieldDepth),e=this.textureLoader.load("images/tile-stone-1.png");e.wrapS=te,e.wrapT=te,e.repeat.set(this.fieldWidth/6,this.fieldDepth/6);const n=new ve({map:e,roughness:.6,metalness:.2,side:le}),i=this.textureLoader.load("images/tile-stone-1.png");i.wrapS=te,i.wrapT=te,this.wallMaterial=new ve({map:i,roughness:.6,metalness:.2}),this.floor=new Et(t,n),this.floor.rotation.x=-Math.PI/2,this.floor.receiveShadow=!0,this.scene.add(this.floor);const r=new Xt(this.fieldWidth,this.wallHeight,.5);this.applyWallUVs(r,this.fieldWidth,this.wallHeight,.5),this.walls.north=new Et(r,this.wallMaterial),this.walls.north.position.set(0,this.wallHeight/2,-this.fieldDepth/2),this.walls.north.castShadow=!0,this.walls.north.receiveShadow=!0,this.scene.add(this.walls.north);const a=new Xt(this.fieldWidth,this.wallHeight,.5);this.applyWallUVs(a,this.fieldWidth,this.wallHeight,.5),this.walls.south=new Et(a,this.wallMaterial),this.walls.south.position.set(0,this.wallHeight/2,this.fieldDepth/2),this.walls.south.castShadow=!0,this.walls.south.receiveShadow=!0,this.scene.add(this.walls.south);const o=new Xt(.5,this.wallHeight,this.fieldDepth);this.applyWallUVs(o,.5,this.wallHeight,this.fieldDepth),this.walls.east=new Et(o,this.wallMaterial),this.walls.east.position.set(this.fieldWidth/2,this.wallHeight/2,0),this.walls.east.castShadow=!0,this.walls.east.receiveShadow=!0,this.scene.add(this.walls.east);const l=new Xt(.5,this.wallHeight,this.fieldDepth);this.applyWallUVs(l,.5,this.wallHeight,this.fieldDepth),this.walls.west=new Et(l,this.wallMaterial),this.walls.west.position.set(-this.fieldWidth/2,this.wallHeight/2,0),this.walls.west.castShadow=!0,this.walls.west.receiveShadow=!0,this.scene.add(this.walls.west),this.generateRandomObstacles(),this._createDoor(),this._initTransparency(),this._scatterVineTilesOnWalls(),this._addLighting()}_loadCircular(){const i=this.wallHeight,r=this.DOOR_WIDTH,a=this.DOOR_HEIGHT;this.circleRadius=24,this._circularWalls=[],this.fieldWidth=24*4,this.fieldDepth=24*4;const o=this.textureLoader.load("images/tile-stone-1.png");o.wrapS=te,o.wrapT=te,o.repeat.set(24*2/6,24*2/6),this.floor=new Et(new is(24,48),new ve({map:o,roughness:.6,metalness:.2,side:le})),this.floor.rotation.x=-Math.PI/2,this.floor.receiveShadow=!0,this.scene.add(this.floor);const l=this.textureLoader.load("images/tile-stone-1.png");l.wrapS=te,l.wrapT=te,this.wallMaterial=new ve({map:l,roughness:.6,metalness:.2});const c=2*24*Math.tan(Math.PI/12),h=(D,B,O,H,X=0)=>{const k=new Et(D,this.wallMaterial);return k.position.set(B,O,H),X!==0&&(k.rotation.y=X),k.castShadow=!0,k.receiveShadow=!0,this.scene.add(k),k},u=12/2,f=u*(2*Math.PI/12),d=Math.cos(f)*24;this.doorWall="north",this._doorIsNS=!0,this._doorOpeningCenter={x:0,z:d},this._doorSlabStartY=a/2,this._doorSlabEndY=i+a,this._frameMat=this.wallMaterial.clone(),this._frameMat.color.setHex(10066329),this._frameMat.emissive=new Kt(0),this._frameMat.emissiveIntensity=0,this._slabMat=this.wallMaterial.clone(),this._slabMat.color.setHex(10066329),this._slabMat.clippingPlanes=[new Ve(new A(0,-1,0),i)],this._slabMat.clipShadows=!0;const g=(D,B,O,H)=>{const X=new Et(D,this._frameMat);return X.position.set(B,O,H),this.scene.add(X),this.doorFrameMeshes.push(X),X},_=.7,m=.5,p=m,E=i-a-p,M=(c-r)/2,x=M/2+r/2;for(const D of[-1,1]){const B=new Xt(M,i,.5);this.applyWallUVs(B,M,i,.5);const O=h(B,D*x,i/2,d);this.walls[`north_${D>0?"right":"left"}`]=O}for(const D of[-1,1]){const B=new Xt(m,a,_);this.applyWallUVs(B,m,a,_),g(B,D*(r/2+m/2),a/2,d)}const w=r+m*2,b=new Xt(w,p,_);if(this.applyWallUVs(b,w,p,_),g(b,0,a+p/2,d),E>0){const D=new Xt(r,E,.5);this.applyWallUVs(D,r,E,.5),this.walls.north_above=h(D,0,a+p+E/2,d)}const R=new ze(r,a),L=new Oe({color:0,side:le}),S=new Et(R,L);S.position.set(0,a/2,d-.4),this.scene.add(S),this.doorFrameMeshes.push(S),this._voidMesh=S;const y=new Xt(r,a,.5);this.applyWallUVs(y,r,a,.5),this.doorSlab=new Et(y,this._slabMat),this.doorSlab.position.set(0,a/2,d),this.scene.add(this.doorSlab),this._circularWalls.push({theta:f,sideLen:c,isDoor:!0});for(let D=0;D<12;D++){if(D===u)continue;const B=D*(2*Math.PI/12),O=Math.sin(B)*24,H=Math.cos(B)*24,X=new Xt(c,i,.5);this.applyWallUVs(X,c,i,.5);const k=new Et(X,this.wallMaterial);k.position.set(O,i/2,H),k.rotation.y=B,k.castShadow=!0,k.receiveShadow=!0,this.scene.add(k),this.walls[`poly_${D}`]=k,this._circularWalls.push({theta:B,sideLen:c,isDoor:!1})}this.generateRandomObstacles(),this._initTransparency(),this._scatterVineTilesOnWalls(),this._addLighting()}_loadHexagon(){const i=Math.PI/6,r=Math.sqrt(3)/2,a=this.wallHeight+1,o=.5,l=27,c=23,h=8,u=6.5,f=5,d=l*r,g=c*r,_=h*r,m=u*r,p=f*r;this.hexRings={HIGH_Y:2,MED_Y:1,LOW_Y:-1,RA_in:d,RB_in:g,RC_in:_,RD_in:m,RE_in:p},this._hexFloorMat=null,this.fieldWidth=l*4,this.fieldDepth=l*4,this.circleRadius=d,this._circularWalls=[];const E=this.textureLoader.load("images/tile-stone-1.png");E.wrapS=te,E.wrapT=te;const M=this.textureLoader.load("images/tile-stone-1.png");M.wrapS=te,M.wrapT=te,this.wallMaterial=new ve({map:M,roughness:.6,metalness:.2});const x=new ve({map:E,roughness:.6,metalness:.2,side:le});this._hexFloorMat=x;const w=this.textureLoader.load("images/tile-stone-red-1.png");w.wrapS=te,w.wrapT=te;const b=new ve({map:w,roughness:.6,metalness:.2,side:le});this._hexPitMat=b;const R=(Mt,ut)=>{const Nt=[];for(let lt=0;lt<6;lt++){const At=lt*Math.PI/3+i;Nt.push(new A(Math.sin(At)*Mt,ut,Math.cos(At)*Mt))}return Nt},L=(Mt,ut,Nt,lt,At=x)=>{const xt=new Float32Array([Mt.x,Mt.y,Mt.z,ut.x,ut.y,ut.z,Nt.x,Nt.y,Nt.z,lt.x,lt.y,lt.z]),bt=new Float32Array([Mt.x/6,Mt.z/6,ut.x/6,ut.z/6,Nt.x/6,Nt.z/6,lt.x/6,lt.z/6]),Ht=new Te;Ht.setAttribute("position",new xe(xt,3)),Ht.setAttribute("uv",new xe(bt,2)),Ht.setIndex([0,1,2,0,2,3]),Ht.computeVertexNormals();const C=new Et(Ht,At);C.receiveShadow=!0,this.scene.add(C),this._hexFloorMeshes.push(C)},S=(Mt,ut,Nt,lt,At=x)=>{const xt=R(Mt,ut),bt=R(Nt,lt);for(let Ht=0;Ht<6;Ht++){const C=(Ht+1)%6;L(xt[Ht],xt[C],bt[C],bt[Ht],At)}},y=(Mt,ut,Nt=x)=>{const lt=R(Mt,ut),At=[0,ut,0],xt=[0,0];for(let v=0;v<6;v++)At.push(lt[v].x,ut,lt[v].z),xt.push(lt[v].x/6,lt[v].z/6);const bt=[];for(let v=0;v<6;v++)bt.push(0,v+1,(v+1)%6+1);const Ht=new Te;Ht.setAttribute("position",new xe(new Float32Array(At),3)),Ht.setAttribute("uv",new xe(new Float32Array(xt),2)),Ht.setIndex(bt),Ht.computeVertexNormals();const C=new Et(Ht,Nt);C.receiveShadow=!0,this.scene.add(C),this._hexFloorMeshes.push(C)};S(l,1,h,1),S(h,1,f,-1,b),y(f,-1,b);const D=2,B=(D+.5)*Math.PI/3+i,O=Math.cos(B)*d,H=l,X=this.DOOR_WIDTH,k=this.DOOR_HEIGHT;this.doorWall="north",this._doorIsNS=!0,this._doorOpeningCenter={x:0,z:O},this._doorSlabStartY=1+k/2,this._doorSlabEndY=a+k,this._frameMat=this.wallMaterial.clone(),this._frameMat.color.setHex(10066329),this._frameMat.emissive=new Kt(0),this._frameMat.emissiveIntensity=0,this._slabMat=this.wallMaterial.clone(),this._slabMat.color.setHex(10066329),this._slabMat.clippingPlanes=[new Ve(new A(0,-1,0),a)],this._slabMat.clipShadows=!0;const Q=(Mt,ut,Nt,lt,At=0,xt=null)=>{const bt=new Et(Mt,this.wallMaterial);return bt.position.set(ut,Nt,lt),At!==0&&(bt.rotation.y=At),bt.castShadow=!0,bt.receiveShadow=!0,this.scene.add(bt),xt&&(this.walls[xt]=bt),bt},F=(Mt,ut,Nt,lt)=>{const At=new Et(Mt,this._frameMat);return At.position.set(ut,Nt,lt),this.scene.add(At),this.doorFrameMeshes.push(At),At},$=.7,ot=.5,ft=ot,Dt=a-1-k-ft,Ut=(H-X)/2,W=Ut/2+X/2;for(const Mt of[-1,1]){const ut=new Xt(Ut,a,o);this.applyWallUVs(ut,Ut,a,o),Q(ut,Mt*W,a/2,O,0,`north_${Mt>0?"right":"left"}`)}for(const Mt of[-1,1]){const ut=new Xt(ot,k,$);this.applyWallUVs(ut,ot,k,$),F(ut,Mt*(X/2+ot/2),1+k/2,O)}const tt=X+ot*2,et=new Xt(tt,ft,$);if(this.applyWallUVs(et,tt,ft,$),F(et,0,1+k+ft/2,O),Dt>.01){const Mt=new Xt(X,Dt,o);this.applyWallUVs(Mt,X,Dt,o),Q(Mt,0,1+k+ft+Dt/2,O,0,"north_above")}const K=new ze(X,k),ct=new Oe({color:0,side:le}),st=new Et(K,ct);st.position.set(0,1+k/2,O-.4),this.scene.add(st),this.doorFrameMeshes.push(st),this._voidMesh=st;const Z=new Xt(X,k,o);this.applyWallUVs(Z,X,k,o),this.doorSlab=new Et(Z,this._slabMat),this.doorSlab.position.set(0,1+k/2,O),this.scene.add(this.doorSlab),this._circularWalls.push({theta:B,sideLen:H,isDoor:!0});for(let Mt=0;Mt<6;Mt++){if(Mt===D)continue;const ut=(Mt+.5)*Math.PI/3+i,Nt=Math.sin(ut)*d,lt=Math.cos(ut)*d,At=new Xt(H,a,o);this.applyWallUVs(At,H,a,o);const xt=Q(At,Nt,a/2,lt,ut);this._hexOuterWalls.push(xt),this._circularWalls.push({theta:ut,sideLen:H,isDoor:!1})}const ht=17,Ft=3,Pt=6,P=Math.PI/6;for(let Mt=0;Mt<Pt;Mt++){const ut=P+Mt*(2*Math.PI/Pt),Nt=Math.sin(ut)*ht,lt=Math.cos(ut)*ht,At=ut+Math.PI,xt={x:Nt,z:lt,width:Ft,depth:Ft,type:"triangle",rotY:At};this.obstacles.push(xt);const bt=new sn(Ft/2,Ft/2,this.wallHeight,3);this.applyCylinderUVs(bt,Ft/2,this.wallHeight);const Ht=new Et(bt,this.wallMaterial);Ht.position.set(Nt,1+this.wallHeight/2,lt),Ht.rotation.y=At,Ht.castShadow=!0,Ht.receiveShadow=!0,this.scene.add(Ht),this.walls[`hex_col_${Mt}`]=Ht}this._initTransparency(),this._addLighting()}_loadBullseye(){const u=this.wallHeight,f=.5;this.circleRadius=22,this._circularWalls=[],this.fieldWidth=22*4,this.fieldDepth=22*4,this.obstacles=[],this._bullseyeColumnMeshes=[];const d=this.textureLoader.load("images/tile-stone-1.png");d.wrapS=te,d.wrapT=te,this.wallMaterial=new ve({map:d,roughness:.6,metalness:.2});const g=et=>{const K=this.textureLoader.load("images/tile-stone-1.png");return K.wrapS=te,K.wrapT=te,K.repeat.set(et*2/6,et*2/6),new ve({map:K,roughness:.6,metalness:.2,side:le})},_=new vn,m=new vn,p=new vn;this.scene.add(_,m,p);const E=new Et(new is(8,64),g(8));E.rotation.x=-Math.PI/2,E.receiveShadow=!0,_.add(E);const M=et=>{const K=this.textureLoader.load("images/tile-stone-red-1.png");return K.wrapS=te,K.wrapT=te,K.repeat.set(et*2/6,et*2/6),new ve({map:K,roughness:.6,metalness:.2,side:le})},x=new Et(new os(8,16,64),M(16));x.rotation.x=-Math.PI/2,x.receiveShadow=!0,m.add(x);const w=new Et(new os(16,22,64),g(22));w.rotation.x=-Math.PI/2,w.receiveShadow=!0,p.add(w);const b=(et,K,ct,st)=>{for(let Z=0;Z<K;Z++){const ht=Z/K*Math.PI*2,Ft=Math.sin(ht)*ct,Pt=Math.cos(ht)*ct,P=new sn(.8,.8,u,16);this.applyCylinderUVs(P,.8,u);const Mt=new Et(P,this.wallMaterial);Mt.position.set(Ft,u/2,Pt),Mt.castShadow=!0,Mt.receiveShadow=!0,et.add(Mt),this._bullseyeColumnMeshes.push(Mt);const ut={type:"pillar",x:Ft,z:Pt,width:.8*2,depth:.8*2};this.obstacles.push(ut),st.push({baseAngle:ht,r:ct,obsRef:ut})}},R=[];b(m,5,12,R);const L=[],S=2*22*Math.tan(Math.PI/12),y=12/2,D=y*(2*Math.PI/12),B=Math.cos(D)*22;this.doorWall="north",this._doorIsNS=!0,this._doorOpeningCenter={x:0,z:B},this._doorSlabStartY=this.DOOR_HEIGHT/2,this._doorSlabEndY=u+this.DOOR_HEIGHT,this._frameMat=this.wallMaterial.clone(),this._frameMat.color.setHex(10066329),this._frameMat.emissive=new Kt(0),this._frameMat.emissiveIntensity=0,this._slabMat=this.wallMaterial.clone(),this._slabMat.color.setHex(10066329),this._slabMat.clippingPlanes=[new Ve(new A(0,-1,0),u)],this._slabMat.clipShadows=!0;const O=(et,K,ct,st,Z=0)=>{const ht=new Et(et,this.wallMaterial);return ht.position.set(K,ct,st),Z!==0&&(ht.rotation.y=Z),ht.castShadow=!0,ht.receiveShadow=!0,this.scene.add(ht),ht},H=(et,K,ct,st)=>{const Z=new Et(et,this._frameMat);return Z.position.set(K,ct,st),this.scene.add(Z),this.doorFrameMeshes.push(Z),Z},X=.7,k=.5,Q=k,F=u-this.DOOR_HEIGHT-Q,$=(S-this.DOOR_WIDTH)/2,ot=$/2+this.DOOR_WIDTH/2;for(const et of[-1,1]){const K=new Xt($,u,f);this.applyWallUVs(K,$,u,f);const ct=O(K,et*ot,u/2,B);this.walls[`north_${et>0?"right":"left"}`]=ct}for(const et of[-1,1]){const K=new Xt(k,this.DOOR_HEIGHT,X);this.applyWallUVs(K,k,this.DOOR_HEIGHT,X),H(K,et*(this.DOOR_WIDTH/2+k/2),this.DOOR_HEIGHT/2,B)}const ft=new Xt(this.DOOR_WIDTH+k*2,Q,X);if(this.applyWallUVs(ft,this.DOOR_WIDTH+k*2,Q,X),H(ft,0,this.DOOR_HEIGHT+Q/2,B),F>0){const et=new Xt(this.DOOR_WIDTH,F,f);this.applyWallUVs(et,this.DOOR_WIDTH,F,f),this.walls.north_above=O(et,0,this.DOOR_HEIGHT+Q+F/2,B)}const Dt=new ze(this.DOOR_WIDTH,this.DOOR_HEIGHT),Ut=new Oe({color:0,side:le}),W=new Et(Dt,Ut);W.position.set(0,this.DOOR_HEIGHT/2,B-.4),this.scene.add(W),this.doorFrameMeshes.push(W),this._voidMesh=W;const tt=new Xt(this.DOOR_WIDTH,this.DOOR_HEIGHT,f);this.applyWallUVs(tt,this.DOOR_WIDTH,this.DOOR_HEIGHT,f),this.doorSlab=new Et(tt,this._slabMat),this.doorSlab.position.set(0,this.DOOR_HEIGHT/2,B),this.scene.add(this.doorSlab),this._circularWalls.push({theta:D,sideLen:S,isDoor:!0});for(let et=0;et<12;et++){if(et===y)continue;const K=et*(2*Math.PI/12),ct=Math.sin(K)*22,st=Math.cos(K)*22,Z=new Xt(S,u,f);this.applyWallUVs(Z,S,u,f);const ht=new Et(Z,this.wallMaterial);ht.position.set(ct,u/2,st),ht.rotation.y=K,ht.castShadow=!0,ht.receiveShadow=!0,this.scene.add(ht),this.walls[`poly_${et}`]=ht,this._circularWalls.push({theta:K,sideLen:S,isDoor:!1})}this.bullseyeRings={RING_R1:8,RING_R2:16,inner:{group:_,rotDir:-1,speed:.03,cols:[]},middle:{group:m,rotDir:1,speed:.15,cols:R},outer:{group:p,rotDir:-1,speed:.1,cols:L}},this._initTransparency(),this._addLighting()}_loadDonut(){const l=this.wallHeight,c=this.DOOR_WIDTH,h=this.DOOR_HEIGHT,u=Math.cos(Math.PI/12),f=(24.2-.5/2)/u,d=11/u,g=6/u,_=11,m=6;this.circleRadius=24.2,this.donutInnerRadius=11,this.donutRings={MED_Y:0,PIT_Y:-2.5,RING_INNER_R:_,PIT_R:m,OUTER_R:24.2},this._circularWalls=[],this.fieldWidth=24.2*4,this.fieldDepth=24.2*4,this.obstacles=[];const p=this.textureLoader.load("images/tile-stone-1.png");p.wrapS=te,p.wrapT=te,this.wallMaterial=new ve({map:p,roughness:.6,metalness:.2});const E=this.textureLoader.load("images/tile-stone-1.png");E.wrapS=te,E.wrapT=te;const M=new ve({map:E,roughness:.6,metalness:.2,side:le});this._hexFloorMat=M;const x=this.textureLoader.load("images/tile-stone-red-1.png");x.wrapS=te,x.wrapT=te;const w=new ve({map:x,roughness:.6,metalness:.2,side:le});this._hexPitMat=w;const b=(st,Z,ht,Ft,Pt)=>{const P=new Float32Array([st.x,st.y,st.z,Z.x,Z.y,Z.z,ht.x,ht.y,ht.z,Ft.x,Ft.y,Ft.z]),Mt=new Float32Array([st.x/6,st.z/6,Z.x/6,Z.z/6,ht.x/6,ht.z/6,Ft.x/6,Ft.z/6]),ut=new Te;ut.setAttribute("position",new xe(P,3)),ut.setAttribute("uv",new xe(Mt,2)),ut.setIndex([0,1,2,0,2,3]),ut.computeVertexNormals();const Nt=new Et(ut,Pt);Nt.receiveShadow=!0,this.scene.add(Nt),this._hexFloorMeshes.push(Nt)},R=(st,Z,ht,Ft)=>{const Pt=new Float32Array([st.x,st.y,st.z,Z.x,Z.y,Z.z,ht.x,ht.y,ht.z]),P=new Float32Array([st.x/6,st.z/6,Z.x/6,Z.z/6,ht.x/6,ht.z/6]),Mt=new Te;Mt.setAttribute("position",new xe(Pt,3)),Mt.setAttribute("uv",new xe(P,2)),Mt.setIndex([0,1,2]),Mt.computeVertexNormals();const ut=new Et(Mt,Ft);ut.receiveShadow=!0,this.scene.add(ut),this._hexFloorMeshes.push(ut)};for(let st=0;st<12;st++){const Z=(st-.5)*(Math.PI*2/12),ht=(st+.5)*(Math.PI*2/12),Ft=Math.sin(Z)*f,Pt=Math.cos(Z)*f,P=Math.sin(ht)*f,Mt=Math.cos(ht)*f,ut=Math.sin(Z)*d,Nt=Math.cos(Z)*d,lt=Math.sin(ht)*d,At=Math.cos(ht)*d,xt=Math.sin(Z)*g,bt=Math.cos(Z)*g,Ht=Math.sin(ht)*g,C=Math.cos(ht)*g;b(new A(Ft,0,Pt),new A(P,0,Mt),new A(lt,0,At),new A(ut,0,Nt),M),b(new A(ut,0,Nt),new A(lt,0,At),new A(Ht,-2.5,C),new A(xt,-2.5,bt),w),R(new A(0,-2.5,0),new A(xt,-2.5,bt),new A(Ht,-2.5,C),w)}const L=2*24.2*Math.tan(Math.PI/12),S=12/2,y=S*(2*Math.PI/12),D=Math.cos(y)*24.2;this.doorWall="north",this._doorIsNS=!0,this._doorOpeningCenter={x:0,z:D},this._doorSlabStartY=h/2,this._doorSlabEndY=l+h,this._frameMat=this.wallMaterial.clone(),this._frameMat.color.setHex(10066329),this._frameMat.emissive=new Kt(0),this._frameMat.emissiveIntensity=0,this._slabMat=this.wallMaterial.clone(),this._slabMat.color.setHex(10066329),this._slabMat.clippingPlanes=[new Ve(new A(0,-1,0),l)],this._slabMat.clipShadows=!0;const B=(st,Z,ht,Ft,Pt=0)=>{const P=new Et(st,this.wallMaterial);return P.position.set(Z,ht,Ft),Pt!==0&&(P.rotation.y=Pt),P.castShadow=!0,P.receiveShadow=!0,this.scene.add(P),P},O=(st,Z,ht,Ft)=>{const Pt=new Et(st,this._frameMat);return Pt.position.set(Z,ht,Ft),this.scene.add(Pt),this.doorFrameMeshes.push(Pt),Pt},H=.7,X=.5,k=X,Q=l-h-k,F=(L-c)/2,$=F/2+c/2;for(const st of[-1,1]){const Z=new Xt(F,l,.5);this.applyWallUVs(Z,F,l,.5);const ht=B(Z,st*$,l/2,D);this.walls[`north_${st>0?"right":"left"}`]=ht}for(const st of[-1,1]){const Z=new Xt(X,h,H);this.applyWallUVs(Z,X,h,H),O(Z,st*(c/2+X/2),h/2,D)}const ot=c+X*2,ft=new Xt(ot,k,H);if(this.applyWallUVs(ft,ot,k,H),O(ft,0,h+k/2,D),Q>0){const st=new Xt(c,Q,.5);this.applyWallUVs(st,c,Q,.5),this.walls.north_above=B(st,0,h+k+Q/2,D)}const Dt=new ze(c,h),Ut=new Oe({color:0,side:le}),W=new Et(Dt,Ut);W.position.set(0,h/2,D-.4),this.scene.add(W),this.doorFrameMeshes.push(W),this._voidMesh=W;const tt=new Xt(c,h,.5);this.applyWallUVs(tt,c,h,.5),this.doorSlab=new Et(tt,this._slabMat),this.doorSlab.position.set(0,h/2,D),this.scene.add(this.doorSlab),this._circularWalls.push({theta:y,sideLen:L,isDoor:!0});for(let st=0;st<12;st++){if(st===S)continue;const Z=st*(2*Math.PI/12),ht=Math.sin(Z)*24.2,Ft=Math.cos(Z)*24.2,Pt=new Xt(L,l,.5);this.applyWallUVs(Pt,L,l,.5);const P=new Et(Pt,this.wallMaterial);P.position.set(ht,l/2,Ft),P.rotation.y=Z,P.castShadow=!0,P.receiveShadow=!0,this.scene.add(P),this._hexOuterWalls.push(P),this._circularWalls.push({theta:Z,sideLen:L,isDoor:!1})}const et=17,K=4,ct=1.2;for(let st=0;st<K;st++){const Z=Math.PI/4+st*(2*Math.PI/K),ht=Math.sin(Z)*et,Ft=Math.cos(Z)*et;this.obstacles.push({x:ht,z:Ft,width:ct*2,depth:ct*2,type:"pillar"});const Pt=new sn(ct,ct,l,12);this.applyCylinderUVs(Pt,ct,l);const P=new Et(Pt,this.wallMaterial);P.position.set(ht,0+l/2,Ft),P.castShadow=!0,P.receiveShadow=!0,this.scene.add(P),this.walls[`donut_col_${st}`]=P}this._initTransparency(),this._addLighting()}getTerrainHeightAt(t,e){if(this.donutRings){const{MED_Y:l,PIT_Y:c,RING_INNER_R:h,PIT_R:u}=this.donutRings,f=Math.sqrt(t*t+e*e);if(f<=u)return c;if(f<=h){const d=(f-u)/(h-u);return c+d*(l-c)}return l}if(!this.hexRings)return 0;const{MED_Y:n,LOW_Y:i,RC_in:r,RE_in:a}=this.hexRings,o=Math.sqrt(t*t+e*e);if(o<=a)return i;if(o<=r){const l=(o-a)/(r-a);return i+l*(n-i)}return n}getTerrainSlopeForce(t,e){if(this.donutRings){const{RING_INNER_R:a,PIT_R:o}=this.donutRings,l=Math.sqrt(t*t+e*e);return l<.01?{fx:0,fz:0}:l>o&&l<=a?{fx:-(t/l)*.007,fz:-(e/l)*.007}:{fx:0,fz:0}}if(!this.hexRings)return{fx:0,fz:0};const{RC_in:n,RE_in:i}=this.hexRings,r=Math.sqrt(t*t+e*e);if(r<.01)return{fx:0,fz:0};if(r>i&&r<=n){const a=-(t/r)*.007,o=-(e/r)*.007;return{fx:a,fz:o}}return{fx:0,fz:0}}_addLighting(){const t=new Yu(16777215,0);this.scene.add(t);const e=new Xu(16777215,.2);e.position.set(10,20,10),e.castShadow=!0,e.shadow.mapSize.width=512,e.shadow.mapSize.height=512,e.shadow.camera.left=-40,e.shadow.camera.right=40,e.shadow.camera.top=40,e.shadow.camera.bottom=-40,e.shadow.camera.near=.1,e.shadow.camera.far=100,this.scene.add(e)}_createDoor(){this.doorWall="north";const t=this.DOOR_WIDTH,e=this.DOOR_HEIGHT,n=this.wallHeight,i=.5,r=.7,a=.5,o=a,l=n-e-o,c=this.doorWall==="north"||this.doorWall==="south";this._doorIsNS=c;const h={x:this.doorWall==="east"?this.fieldWidth/2:this.doorWall==="west"?-this.fieldWidth/2:0,z:this.doorWall==="north"?-this.fieldDepth/2:this.doorWall==="south"?this.fieldDepth/2:0},u=this.walls[this.doorWall];u&&(this.scene.remove(u),u.geometry.dispose(),delete this.walls[this.doorWall]),this._frameMat=this.wallMaterial.clone(),this._frameMat.color.setHex(10066329),this._frameMat.emissive=new Kt(0),this._frameMat.emissiveIntensity=0,this._slabMat=this.wallMaterial.clone(),this._slabMat.color.setHex(10066329),this._slabMat.clippingPlanes=[new Ve(new A(0,-1,0),n)],this._slabMat.clipShadows=!0;const f=(p,E,M,x)=>{const w=new Et(p,this.wallMaterial);return w.position.set(E,M,x),w.castShadow=!0,w.receiveShadow=!0,this.scene.add(w),w},d=(p,E,M,x)=>{const w=new Et(p,this._frameMat);return w.position.set(E,M,x),this.scene.add(w),this.doorFrameMeshes.push(w),w},_=((c?this.fieldWidth:this.fieldDepth)-t)/2,m=_/2+t/2;if(c){for(const L of[-1,1]){const S=new Xt(_,n,i);this.applyWallUVs(S,_,n,i);const y=f(S,L*m,n/2,h.z);this.walls[`${this.doorWall}_${L>0?"right":"left"}`]=y}for(const L of[-1,1]){const S=new Xt(a,e,r);this.applyWallUVs(S,a,e,r),d(S,L*(t/2+a/2),e/2,h.z)}const p=t+a*2,E=new Xt(p,o,r);if(this.applyWallUVs(E,p,o,r),d(E,0,e+o/2,h.z),l>0){const L=new Xt(t,l,i);this.applyWallUVs(L,t,l,i);const S=f(L,0,e+o+l/2,h.z);this.walls[`${this.doorWall}_above`]=S}const M=new ze(t,e),x=new Oe({color:0,side:le}),w=new Et(M,x),b=this.doorWall==="north"?-1:1;w.position.set(0,e/2,h.z+b*.4),this.scene.add(w),this.doorFrameMeshes.push(w),this._voidMesh=w;const R=new Xt(t,e,i);this.applyWallUVs(R,t,e,i),this.doorSlab=new Et(R,this._slabMat),this.doorSlab.position.set(0,e/2,h.z),this.scene.add(this.doorSlab)}else{for(const L of[-1,1]){const S=new Xt(i,n,_);this.applyWallUVs(S,i,n,_);const y=f(S,h.x,n/2,L*m);this.walls[`${this.doorWall}_${L>0?"pos":"neg"}`]=y}for(const L of[-1,1]){const S=new Xt(r,e,a);this.applyWallUVs(S,r,e,a),d(S,h.x,e/2,L*(t/2+a/2))}const p=t+a*2,E=new Xt(r,o,p);if(this.applyWallUVs(E,r,o,p),d(E,h.x,e+o/2,0),l>0){const L=new Xt(i,l,t);this.applyWallUVs(L,i,l,t);const S=f(L,h.x,e+o+l/2,0);this.walls[`${this.doorWall}_above`]=S}const M=new ze(t,e),x=new Oe({color:0,side:le}),w=new Et(M,x);w.rotation.y=Math.PI/2;const b=this.doorWall==="east"?1:-1;w.position.set(h.x+b*.4,e/2,0),this.scene.add(w),this.doorFrameMeshes.push(w),this._voidMesh=w;const R=new Xt(i,e,t);this.applyWallUVs(R,i,e,t),this.doorSlab=new Et(R,this._slabMat),this.doorSlab.position.set(h.x,e/2,0),this.scene.add(this.doorSlab)}this._doorOpeningCenter={x:h.x,z:h.z},this._doorSlabStartY=e/2,this._doorSlabEndY=n+e}_scatterVineTilesOnWalls(){if(this.hexRings)return;const t=6,e=.25,n=.27;this._vineTileMeshes=[],this._vineTileTexture=this.textureLoader.load("images/tile-stone-vines-1.png"),this._vineMat=new ve({map:this._vineTileTexture,roughness:.6,metalness:.2});const i=(h,u,f,d)=>{const g=new ze(t,t),_=new Et(g,this._vineMat);_.position.set(h,u,f),_.rotation.y=d,_.receiveShadow=!0,this.scene.add(_),this._vineTileMeshes.push(_)},r=(h,u,f)=>!h||this.doorWall!==h?!1:Math.abs(u)<this.DOOR_WIDTH/2+t/2&&f<this.DOOR_HEIGHT+t/2,a=(h,u,f,d)=>{const g=Math.floor(h/t),_=Math.floor(u/t);for(let m=0;m<g;m++)for(let p=0;p<_;p++){const E=(m+.5)*t-h/2,M=(p+.5)*t;r(f,E,M)||Math.random()>e||d(E,M)}},o=this.fieldWidth,l=this.fieldDepth,c=this.wallHeight;if(this._circularWalls){const h=this.circleRadius;for(const{theta:u,sideLen:f,isDoor:d}of this._circularWalls)d||a(f,c,null,(g,_)=>{const m=Math.sin(u)*(h-n)+Math.cos(u)*g,p=Math.cos(u)*(h-n)-Math.sin(u)*g;i(m,_,p,u+Math.PI)})}else a(o,c,"north",(h,u)=>i(h,u,-l/2+n,0)),a(o,c,"south",(h,u)=>i(h,u,l/2-n,Math.PI)),a(l,c,"east",(h,u)=>i(o/2-n,u,h,-Math.PI/2)),a(l,c,"west",(h,u)=>i(-o/2+n,u,h,Math.PI/2));for(const h of this.obstacles){if(h.type==="pillar")continue;const{x:u,z:f,width:d,depth:g}=h;a(d,c,null,(_,m)=>i(u+_,m,f+g/2+n,0)),a(d,c,null,(_,m)=>i(u+_,m,f-g/2-n,Math.PI)),a(g,c,null,(_,m)=>i(u+d/2+n,m,f+_,Math.PI/2)),a(g,c,null,(_,m)=>i(u-d/2-n,m,f+_,-Math.PI/2))}}get ringsAnimating(){return!!(this._ringAnim&&!this._ringAnim.done)}stepRings(){if(!this.bullseyeRings)return null;const t=Math.PI/6,e=2.23,{inner:n,middle:i,outer:r,RING_R1:a,RING_R2:o}=this.bullseyeRings;return this._ringAnim={innerStart:n.group.rotation.y,middleStart:i.group.rotation.y,outerStart:r.group.rotation.y,innerStep:n.rotDir*t,middleStep:i.rotDir*t,outerStep:r.rotDir*t,duration:e,elapsed:0,done:!1},{RING_R1:a,RING_R2:o}}openDoor(){if(this.doorIsOpen||this._doorAnimating||!this.doorSlab)return;this._doorAnimating=!0,this._doorAnimProgress=0,this._frameMat&&(this._frameMat.emissive.setHex(16737792),this._frameMat.emissiveIntensity=.6);const t=this._doorOpeningCenter?this._doorOpeningCenter.x:0,e=this._doorOpeningCenter?this._doorOpeningCenter.z:0,n=2;let i=t,r=e;this._doorIsNS?r+=this.doorWall==="north"?n:-2:i+=this.doorWall==="east"?-2:n,this._doorLight=new Gu(16737792,60,12,2),this._doorLight.position.set(i,this.DOOR_HEIGHT*.5,r),this.scene.add(this._doorLight),this._doorLightTime=0}update(t){if(this.bullseyeRings&&this._ringAnim&&!this._ringAnim.done){const e=this._ringAnim;e.elapsed+=t;const n=Math.min(e.elapsed/e.duration,1),i=n<.5?2*n*n:-1+(4-2*n)*n,{inner:r,middle:a,outer:o}=this.bullseyeRings;r.group.rotation.y=e.innerStart+e.innerStep*i,a.group.rotation.y=e.middleStart+e.middleStep*i,o.group.rotation.y=e.outerStart+e.outerStep*i;for(const l of a.cols){const c=l.baseAngle+a.group.rotation.y;l.obsRef.x=Math.sin(c)*l.r,l.obsRef.z=Math.cos(c)*l.r}for(const l of o.cols){const c=l.baseAngle+o.group.rotation.y;l.obsRef.x=Math.sin(c)*l.r,l.obsRef.z=Math.cos(c)*l.r}n>=1&&(e.done=!0)}if(this._doorAnimating&&this.doorSlab){this._doorAnimProgress+=t/.8,this._doorAnimProgress>=1&&(this._doorAnimProgress=1,this._doorAnimating=!1,this.doorIsOpen=!0);const n=this._doorAnimProgress,i=n<.5?2*n*n:-1+(4-2*n)*n;this.doorSlab.position.y=this._doorSlabStartY+(this._doorSlabEndY-this._doorSlabStartY)*i}if(this._doorLight){this._doorLightTime+=t;const e=.65+.25*Math.sin(this._doorLightTime*2.3)+.1*Math.sin(this._doorLightTime*5.7);this._doorLight.intensity=60*e,this._frameMat&&(this._frameMat.emissiveIntensity=.55*e),this._voidMesh&&this._voidMesh.material.color.setRGB(e*1,e*.35,0)}this._doorHovered&&this._frameMat&&(this._doorOutlineTime=(this._doorOutlineTime||0)+t,this._frameMat.emissive.setHex(65518),this._frameMat.emissiveIntensity=.6+.4*Math.sin(this._doorOutlineTime*5))}generateRandomObstacles(){this.obstacles=[];const t=4+Math.floor(Math.random()*4);for(let e=0;e<t;e++){let n=!1,i=0,r=null;for(;!n&&i<50;){const a=Math.random();let o,l,c,h,u;if(a<.35)o="block",l=4+Math.random()*3,c=l;else if(a<.55)o="triangle",l=3+Math.random()*3,c=l;else if(a<.75)o="pillar",l=2,c=2;else{o="wall";const M=Math.random()>.5;l=M?7+Math.random()*7:1.5,c=M?1.5:7+Math.random()*7}const f=this.circleRadius?this.circleRadius*2:this.fieldWidth,d=this.circleRadius?this.circleRadius*2:this.fieldDepth;h=(Math.random()-.5)*(f-l-4),u=(Math.random()-.5)*(d-c-4);const g=o==="triangle"?Math.random()*Math.PI*2:0;r={x:h,z:u,width:l,depth:c,type:o,rotY:g};const _=8,m=Math.sqrt(h*h+u*u),p=Math.sqrt(h*h+(u+3)*(u+3));if(m<_||p<_){i++;continue}let E=!1;for(const M of this.obstacles){const x=Math.abs(h-M.x),w=Math.abs(u-M.z);let b=3.5;o==="pillar"&&M.type==="pillar"&&(b=2.5);const R=(l+M.width)/2+b,L=(c+M.depth)/2+b;if(x<R&&w<L){E=!0;break}}if(!E&&this.circleRadius){const x=l/2,w=c/2,b=[[h+x,u+w],[h+x,u-w],[h-x,u+w],[h-x,u-w]];for(const[R,L]of b)if(Math.sqrt(R*R+L*L)>this.circleRadius-1.5){E=!0;break}}E||(n=!0),i++}n&&r&&(this.obstacles.push(r),this.createObstacleMesh(r,e))}}createObstacleMesh(t,e){let n;t.type==="pillar"?(n=new sn(t.width/2,t.width/2,this.wallHeight,16),this.applyCylinderUVs(n,t.width/2,this.wallHeight)):t.type==="triangle"?(n=new sn(t.width/2,t.width/2,this.wallHeight,3),this.applyCylinderUVs(n,t.width/2,this.wallHeight)):(n=new Xt(t.width,this.wallHeight,t.depth),this.applyWallUVs(n,t.width,this.wallHeight,t.depth));const i=new Et(n,this.wallMaterial);i.position.set(t.x,this.wallHeight/2,t.z),t.type==="triangle"&&(i.rotation.y=t.rotY??0),i.castShadow=!0,i.receiveShadow=!0,this.scene.add(i),this.walls[`obstacle_${e}`]=i}isPositionValid(t,e,n=0){const i=n+.2;if(this.circleRadius){if(Math.sqrt(t*t+e*e)+i>this.circleRadius||this.donutInnerRadius&&Math.sqrt(t*t+e*e)<this.donutInnerRadius+i)return!1}else if(t-i<-this.fieldWidth/2||t+i>this.fieldWidth/2||e-i<-this.fieldDepth/2||e+i>this.fieldDepth/2)return!1;for(const r of this.obstacles)if(r.type==="pillar"||r.type==="triangle"){const a=t-r.x,o=e-r.z,l=a*a+o*o,c=r.width/2+i;if(l<c*c)return!1}else{const a=Math.abs(t-r.x),o=Math.abs(e-r.z);if(a<r.width/2+i&&o<r.depth/2+i)return!1}return!0}setDoorHovered(t){this._doorHovered=t&&this.doorIsOpen,this._doorHovered||(this._doorOutlineTime=0,this._frameMat&&(this._frameMat.emissive.setHex(0),this._frameMat.emissiveIntensity=0))}checkPortalCollision(t,e,n){if(!this.doorIsOpen||!this._doorOpeningCenter)return!1;const i=this._doorOpeningCenter.x,r=this._doorOpeningCenter.z,a=n+1;return this._doorIsNS?Math.abs(t-i)<this.DOOR_WIDTH/2&&Math.abs(e-r)<a:Math.abs(e-r)<this.DOOR_WIDTH/2&&Math.abs(t-i)<a}unload(){this.obstacles=[],this.floor&&(this.scene.remove(this.floor),this.floor.geometry&&this.floor.geometry.dispose(),this.floor.material&&(this.floor.material.map&&this.floor.material.map.dispose(),this.floor.material.dispose()),this.floor=null);for(const t in this.walls){const e=this.walls[t];e&&(this.scene.remove(e),e.geometry&&e.geometry.dispose(),e.material&&e.material.dispose())}this.walls={},this.doorSlab&&(this.scene.remove(this.doorSlab),this.doorSlab.geometry&&this.doorSlab.geometry.dispose(),this.doorSlab.material&&this.doorSlab.material.dispose(),this.doorSlab=null);for(const t of this.doorFrameMeshes)this.scene.remove(t),t.geometry&&t.geometry.dispose(),t.material&&t.material.dispose();this.doorFrameMeshes=[],this._frameMat&&(this._frameMat.dispose(),this._frameMat=null),this._slabMat&&(this._slabMat.dispose(),this._slabMat=null),this._voidMesh=null,this._doorHovered=!1,this._doorOutlineTime=0,this._doorLight&&(this.scene.remove(this._doorLight),this._doorLight=null),this._doorLightTime=0,this.doorWall=null,this.doorIsOpen=!1,this._doorAnimating=!1,this._doorAnimProgress=0,this._doorOpeningCenter=null;for(const t of this.portals)this.scene.remove(t),t.geometry&&t.geometry.dispose(),t.material&&t.material.dispose();this.portals=[];for(const t of this.portalLights)this.scene.remove(t);this.portalLights=[],this.wallMaterial&&(this.wallMaterial.map&&this.wallMaterial.map.dispose(),this.wallMaterial.dispose(),this.wallMaterial=null);for(const t of this._vineTileMeshes||[])this.scene.remove(t),t.geometry&&t.geometry.dispose();this._vineTileMeshes=[],this._vineMat&&(this._vineMat.dispose(),this._vineMat=null),this._vineTileTexture&&(this._vineTileTexture.dispose(),this._vineTileTexture=null),this.circleRadius=null,this._circularWalls=null,this.donutInnerRadius=null,this.donutRings=null;for(const t of this._hexFloorMeshes||[])this.scene.remove(t),t.geometry&&t.geometry.dispose();this._hexFloorMeshes=[],this._hexFloorMat&&(this._hexFloorMat.map&&this._hexFloorMat.map.dispose(),this._hexFloorMat.dispose(),this._hexFloorMat=null),this._hexPitMat&&(this._hexPitMat.map&&this._hexPitMat.map.dispose(),this._hexPitMat.dispose(),this._hexPitMat=null);for(const t of this._hexOuterWalls||[])this.scene.remove(t),t.geometry&&t.geometry.dispose(),t.material&&t.material.dispose();if(this._hexOuterWalls=[],this.hexRings=null,this.bullseyeRings){const t=e=>{e.traverse(n=>{n.isMesh&&(n.geometry&&n.geometry.dispose(),n.material&&(n.material.map&&n.material.map.dispose(),n.material.dispose()))}),this.scene.remove(e)};t(this.bullseyeRings.inner.group),t(this.bullseyeRings.middle.group),t(this.bullseyeRings.outer.group),this.bullseyeRings=null}this._bullseyeColumnMeshes=[]}}class kg{constructor(t,e,n,i){this.throwInfoDiv=document.getElementById("throw-info"),this.discNamesList=document.getElementById("disc-names-list"),this.focusCameraOnDiscCallback=n,this.rageButtonElement=document.getElementById("rage-button"),this.fpsDisplayElement=document.getElementById("fps-counter"),this.fpsDisplayElement&&(this.fpsDisplayElement.style.display="none"),this.powersAreaElement=document.getElementById("powers-area"),this.powersAreaElement?(this.currentTurnDiscNameElement=document.createElement("h3"),this.currentTurnDiscNameElement.id="current-turn-disc-name-display",this.powersAreaElement.prepend(this.currentTurnDiscNameElement),this.actionButtonsContainerElement=document.createElement("div"),this.actionButtonsContainerElement.id="action-buttons-container",this.powersAreaElement.appendChild(this.actionButtonsContainerElement),this.rageButtonElement&&this.actionButtonsContainerElement&&this.actionButtonsContainerElement.appendChild(this.rageButtonElement)):(this.currentTurnDiscNameElement=null,this.actionButtonsContainerElement=null),this.gameOverMessageContainer=null,this.gameOverMessageTextElement=null,this.playAgainButton=null,this.cameraControlsButton=null,this.cameraControlsMenu=null,this._createGameOverUI(t,i),this._createCameraControlsButton(e),this.floatingTextContainer=document.createElement("div"),this.floatingTextContainer.id="floating-text-container",Object.assign(this.floatingTextContainer.style,{position:"absolute",top:"0",left:"0",width:"100%",height:"100%",pointerEvents:"none",zIndex:"1005",overflow:"hidden"}),document.body.appendChild(this.floatingTextContainer),this.activeFloatingTexts=[]}dissolveBlackOverlay(t){const e=document.getElementById("black-overlay");if(!e){t&&t();return}e.style.opacity="0",e.addEventListener("transitionend",()=>{e.style.display="none",t&&t()},{once:!0})}showFloatingText(t,e,n){const i=document.createElement("div"),r=Math.abs(e);i.textContent=`${n?"+":"-"}${r} HP`,Object.assign(i.style,{position:"absolute",color:n?"#4488ff":"#ff4444",fontWeight:"bold",fontFamily:"Arial, sans-serif",textShadow:"1px 1px 2px black, -1px -1px 2px black, 1px -1px 2px black, -1px 1px 2px black",transform:"translate(-50%, -50%)",opacity:"0",fontSize:"16px",whiteSpace:"nowrap",pointerEvents:"none"}),this.floatingTextContainer.appendChild(i),this.activeFloatingTexts.push({element:i,disc:t,startTime:performance.now(),duration:2e3,startOffsetY:2,offsetX:(Math.random()-.5)*1.5,offsetZ:(Math.random()-.5)*1.5})}updateFloatingTexts(t){if(!t)return;const e=performance.now();for(let n=this.activeFloatingTexts.length-1;n>=0;n--){const i=this.activeFloatingTexts[n],a=(e-i.startTime)/i.duration;if(a>=1){i.element.remove(),this.activeFloatingTexts.splice(n,1);continue}let o;a<.2?o=.3+.7*(a/.2):o=1-(a-.2)/.8;const l=i.startOffsetY+a*4,c=16+a*12;if(i.disc&&i.disc.mesh){const h=i.disc.mesh.position.clone();h.x+=i.offsetX,h.y+=l,h.z+=i.offsetZ,h.project(t);const u=(h.x*.5+.5)*window.innerWidth,f=(h.y*-.5+.5)*window.innerHeight;h.z<1?(i.element.style.left=`${u}px`,i.element.style.top=`${f}px`,i.element.style.fontSize=`${c}px`,i.element.style.opacity=o.toString(),i.element.style.display="block"):i.element.style.display="none"}else i.element.style.fontSize=`${c}px`,i.element.style.opacity=o.toString()}}_createGameOverUI(t,e){this.gameOverMessageContainer=document.createElement("div"),this.gameOverMessageContainer.id="gameOverMessageContainer",Object.assign(this.gameOverMessageContainer.style,{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",padding:"20px",backgroundColor:"rgba(0, 0, 0, 0.75)",color:"white",textAlign:"center",borderRadius:"10px",zIndex:"1000",display:"none",fontFamily:"Arial, sans-serif"});const n=document.createElement("h1");n.textContent="GAME OVER",Object.assign(n.style,{margin:"0 0 10px 0",fontSize:"2.5em"}),this.gameOverMessageTextElement=document.createElement("p"),this.gameOverMessageTextElement.id="gameOverResultText",Object.assign(this.gameOverMessageTextElement.style,{margin:"0",fontSize:"1.5em"}),this.gameOverMessageContainer.appendChild(n),this.gameOverMessageContainer.appendChild(this.gameOverMessageTextElement),this.playAgainButton=document.createElement("button"),this.playAgainButton.textContent="Play Again",Object.assign(this.playAgainButton.style,{marginTop:"20px",padding:"10px 20px",fontSize:"1em",color:"white",backgroundColor:"#555",border:"none",borderRadius:"5px",cursor:"pointer"}),this.playAgainButton.addEventListener("mouseover",()=>{this.playAgainButton.style.backgroundColor="#777"}),this.playAgainButton.addEventListener("mouseout",()=>{this.playAgainButton.style.backgroundColor="#555"}),this.playAgainButton.addEventListener("click",()=>{this.hideGameOver(),t&&t()}),this.gameOverMessageContainer.appendChild(this.playAgainButton);const i=document.createElement("button");i.textContent="Restart Level",Object.assign(i.style,{marginTop:"10px",marginLeft:"10px",padding:"10px 20px",fontSize:"1em",color:"white",backgroundColor:"#555",border:"none",borderRadius:"5px",cursor:"pointer"}),i.addEventListener("mouseover",()=>{i.style.backgroundColor="#777"}),i.addEventListener("mouseout",()=>{i.style.backgroundColor="#555"}),i.addEventListener("click",()=>{this.hideGameOver(),e&&e()}),this.gameOverMessageContainer.appendChild(i),document.body.appendChild(this.gameOverMessageContainer)}_createCameraControlsButton(t){const e=document.createElement("div");e.id="camera-controls-wrapper";const n=document.createElement("div");n.id="camera-controls-menu",n.innerHTML=`<ul>
            <li><kbd>R</kbd> Recenter</li>
            <li><kbd>Q</kbd>/<kbd>E</kbd> Rotate</li>
            <li><kbd>A</kbd>/<kbd>D</kbd> Pan</li>
            <li><kbd>W</kbd>/<kbd>S</kbd> Pan Up/Down</li>
            <li><kbd>Scroll</kbd> Zoom</li>
        </ul>`;const i=document.createElement("button");i.id="camera-controls-button",i.innerHTML="<kbd>C</kbd> Camera Controls",i.addEventListener("click",r=>{r.stopPropagation(),this.toggleCameraControlsMenu()}),document.addEventListener("click",()=>{this.closeCameraControlsMenu()}),e.appendChild(n),e.appendChild(i),document.body.appendChild(e),this.cameraControlsButton=i,this.cameraControlsMenu=n}toggleCameraControlsMenu(){const t=this.cameraControlsMenu.classList.toggle("open");this.cameraControlsButton.classList.toggle("open",t),this._menuSoundCallback&&this._menuSoundCallback()}closeCameraControlsMenu(){this.cameraControlsMenu.classList.remove("open"),this.cameraControlsButton.classList.remove("open")}showGameOver(t){this.gameOverMessageContainer&&this.gameOverMessageTextElement&&(this.gameOverMessageTextElement.textContent=t?"You win!":"You lose!",this.gameOverMessageContainer.style.display="block")}hideGameOver(){this.gameOverMessageContainer&&(this.gameOverMessageContainer.style.display="none")}updateThrowInfo(t,e){this.throwInfoDiv&&(this.throwInfoDiv.textContent=t,this.throwInfoDiv.style.visibility=e?"visible":"hidden")}updateFPS(t){this.fpsDisplayElement&&(this.fpsDisplayElement.textContent=`FPS: ${t}`,this.fpsDisplayElement.style.display="inline-block")}updateDiscNames(t,e){if(!this.discNamesList)return;this.discNamesList.innerHTML="";const n=e?e.discName:null,i=t.filter(l=>l.type==="player"&&l.kind!=="Orb"&&l.kind!=="HealingOrb"&&l.kind!=="AnimatedDead"),r=t.filter(l=>l.type==="NPC"),a=l=>{const c=document.createElement("li");c.addEventListener("click",()=>{this.focusCameraOnDiscCallback&&this.focusCameraOnDiscCallback(l.discName)});const h=typeof l.hitPoints=="number"?l.hitPoints:"N/A";let u=`${l.discName} (${h} HP)`;const f=document.createElement("span");f.classList.add("disc-color-indicator");let d="#808080";if(typeof l.initialColor=="number"&&isFinite(l.initialColor))try{d="#"+(l.initialColor>=0?l.initialColor:0).toString(16).padStart(6,"0")}catch{}f.style.backgroundColor=d,l.dead&&(f.style.backgroundColor="#808080"),c.appendChild(f);const g=document.createTextNode(u);return c.appendChild(g),c.classList.add("turn-tracker-item"),l.dead&&c.classList.add("dead-disc"),l.discName===n&&c.classList.add("current-turn"),c},o=l=>{const c=document.createElement("li");return c.textContent=l,c.classList.add("tracker-section-header"),c};i.length>0&&(this.discNamesList.appendChild(o("Players")),i.forEach(l=>{this.discNamesList.appendChild(a(l))})),r.length>0&&(this.discNamesList.appendChild(o("Monsters")),r.forEach(l=>{this.discNamesList.appendChild(a(l))}))}getActionButtonsContainer(){return this.actionButtonsContainerElement}updateCurrentTurnDiscName(t){if(this.currentTurnDiscNameElement)if(t&&t.discName)if(typeof t.hitPoints=="number"&&typeof t.maxHitPoints=="number"){const e=Math.max(0,t.hitPoints),n=Math.max(0,t.maxHitPoints),i=Math.max(0,n-e),r="❤️".repeat(e),a="🩶".repeat(i);this.currentTurnDiscNameElement.innerHTML="";const o=document.createTextNode(t.discName+" ");this.currentTurnDiscNameElement.appendChild(o);const l=document.createElement("div");if(l.classList.add("hearts-container"),l.style.display="inline-block",l.textContent=r+a,this.currentTurnDiscNameElement.appendChild(l),t.kind==="Wizard"&&t.gameController){const c=document.createElement("div");c.classList.add("mana-container"),c.style.display="block",c.style.fontSize="0.8em",c.style.marginTop="4px",c.textContent=`Mana: ${"🔵".repeat(t.gameController.wizardController.mana)}`,this.currentTurnDiscNameElement.appendChild(c)}if(t.kind==="Necromancer"&&t.gameController){const c=document.createElement("div");c.classList.add("mana-container"),c.style.display="block",c.style.fontSize="0.8em",c.style.marginTop="4px",c.textContent=`Mana: ${"💀".repeat(t.gameController.necromancerController.mana)}`,this.currentTurnDiscNameElement.appendChild(c)}this.currentTurnDiscNameElement.classList.remove("element-hidden")}else{const e=typeof t.hitPoints=="number"?t.hitPoints:"N/A";this.currentTurnDiscNameElement.textContent=`${t.discName} (HP: ${e})`,this.currentTurnDiscNameElement.classList.remove("element-hidden"),typeof t.maxHitPoints!="number"&&console.warn(`UIManager: Disc "${t.discName}" is missing or has invalid maxHitPoints property for heart display. Displaying fallback.`),typeof t.hitPoints!="number"&&console.warn(`UIManager: Disc "${t.discName}" has invalid hitPoints property for heart display. Displaying fallback.`)}else this.currentTurnDiscNameElement.textContent="",this.currentTurnDiscNameElement.classList.add("element-hidden")}updateRageButtonVisibility(t,e,n,i){if(this.rageButtonElement){this.rageButtonElement.style.display=t?"inline-block":"none",this.rageButtonElement.disabled=!e;const r=typeof n=="number"?n:0,a=typeof i=="number"?i:0;this.rageButtonElement.innerHTML=`<kbd>1</kbd> Rage (${r}/${a})`}}setupRageButtonListener(t){this.rageButtonElement&&(this.rageButtonElement.removeEventListener("click",this._currentRageButtonHandler),this._currentRageButtonHandler=t,this.rageButtonElement.addEventListener("click",t))}}class zg{constructor(t,e,n){this.domElement=t,this.gameController=e,this.uiManager=n,this.isPointerDown=!1,this.pointerDownInitialPos={x:0,y:0},this._handlePointerDown=this._handlePointerDown.bind(this),this._handlePointerMove=this._handlePointerMove.bind(this),this._handlePointerUp=this._handlePointerUp.bind(this),this._handlePointerHover=this._handlePointerHover.bind(this),this._handleKeyDown=this._handleKeyDown.bind(this),this._handleKeyUp=this._handleKeyUp.bind(this),this._addEventListeners()}_addEventListeners(){this.domElement.addEventListener("pointerdown",this._handlePointerDown),window.addEventListener("pointermove",this._handlePointerMove),window.addEventListener("pointermove",this._handlePointerHover),window.addEventListener("pointerup",this._handlePointerUp),window.addEventListener("keydown",this._handleKeyDown,{capture:!0}),document.addEventListener("keydown",this._handleKeyDown,{capture:!0}),window.addEventListener("keyup",this._handleKeyUp)}_handlePointerDown(t){this.isPointerDown=!0,this.pointerDownInitialPos.x=t.clientX,this.pointerDownInitialPos.y=t.clientY,this.gameController.handlePointerDownInteraction&&this.gameController.handlePointerDownInteraction(t,this.pointerDownInitialPos)}_handlePointerHover(t){this.gameController.handlePointerHover&&this.gameController.handlePointerHover(t)}_handlePointerMove(t){this.isPointerDown&&this.gameController.handlePointerMoveInteraction&&this.gameController.handlePointerMoveInteraction(t,this.pointerDownInitialPos)}_handlePointerUp(t){this.isPointerDown&&(this.isPointerDown=!1,this.gameController.handlePointerUpInteraction&&this.gameController.handlePointerUpInteraction(t,this.pointerDownInitialPos))}_handleKeyDown(t){if(t._handledByInputHandler)return;t._handledByInputHandler=!0;const e=(t.key||"").toLowerCase();switch((e==="escape"||e==="esc"||t.code==="Escape"||t.keyCode===27)&&this.isPointerDown&&(t.preventDefault(),t.stopPropagation(),this.isPointerDown=!1,this.gameController&&typeof this.gameController.cancelAiming=="function"&&this.gameController.cancelAiming(),this.uiManager&&typeof this.uiManager.updateThrowInfo=="function"&&this.uiManager.updateThrowInfo("",!1)),e){case"w":case"arrowup":this.gameController.setPanningState&&this.gameController.setPanningState("up",!0);break;case"s":case"arrowdown":this.gameController.setPanningState&&this.gameController.setPanningState("down",!0);break;case"a":case"arrowleft":this.gameController.setPanningState&&this.gameController.setPanningState("left",!0);break;case"d":case"arrowright":this.gameController.setPanningState&&this.gameController.setPanningState("right",!0);break;case"q":this.gameController.setCameraRotation&&this.gameController.setCameraRotation(-1);break;case"e":this.gameController.setCameraRotation&&this.gameController.setCameraRotation(1);break;case"r":this.gameController.recenterCamera&&this.gameController.recenterCamera();break;case"c":this.gameController.uiManager&&this.gameController.uiManager.toggleCameraControlsMenu();break;case",":case"<":this.gameController.focusPrevAnimatedDead&&this.gameController.focusPrevAnimatedDead();break;case".":case">":this.gameController.focusNextAnimatedDead&&this.gameController.focusNextAnimatedDead();break;case" ":{t.preventDefault();const n=document.getElementById("action-buttons-container");if(n){const i=[...n.querySelectorAll("button")].find(r=>r.id.includes("end-turn")&&r.style.display!=="none"&&!r.disabled);i&&i.click()}break}case"1":case"2":case"3":case"4":case"5":{const n=document.getElementById("action-buttons-container");if(n){const i=n.querySelector(`button[data-shortcut="${e}"]:not([style*="display: none"]):not([disabled])`);if(i)i.click();else{const r=parseInt(e)-1,a=[...n.querySelectorAll("button")].filter(o=>!o.id.includes("end-turn")&&!o.dataset.shortcut&&o.style.display!=="none"&&!o.disabled);a[r]&&a[r].click()}}break}}}_handleKeyUp(t){const e=(t.key||"").toLowerCase();switch((e==="escape"||e==="esc"||t.code==="Escape"||t.keyCode===27)&&this.isPointerDown&&(this.isPointerDown=!1,this.gameController&&typeof this.gameController.cancelAiming=="function"&&this.gameController.cancelAiming(),this.uiManager&&typeof this.uiManager.updateThrowInfo=="function"&&this.uiManager.updateThrowInfo("",!1)),e){case"w":case"arrowup":this.gameController.setPanningState&&this.gameController.setPanningState("up",!1);break;case"s":case"arrowdown":this.gameController.setPanningState&&this.gameController.setPanningState("down",!1);break;case"a":case"arrowleft":this.gameController.setPanningState&&this.gameController.setPanningState("left",!1);break;case"d":case"arrowright":this.gameController.setPanningState&&this.gameController.setPanningState("right",!1);break;case"q":case"e":this.gameController.setCameraRotation&&this.gameController.setCameraRotation(0);break}}reset(){this.isPointerDown=!1,this.pointerDownInitialPos={x:0,y:0}}dispose(){this.domElement.removeEventListener("pointerdown",this._handlePointerDown),window.removeEventListener("pointermove",this._handlePointerMove),window.removeEventListener("pointermove",this._handlePointerHover),window.removeEventListener("pointerup",this._handlePointerUp),window.removeEventListener("keydown",this._handleKeyDown,{capture:!0}),document.removeEventListener("keydown",this._handleKeyDown,{capture:!0}),window.removeEventListener("keyup",this._handleKeyUp)}}const Vr="dungeonflicker_first_time_events";class Hg{constructor(){this._tracked=this._load(),this._listeners=[],this._logState("initial load")}addListener(t){this._listeners.push(t)}_load(){try{const t=localStorage.getItem(Vr);return t?JSON.parse(t):{}}catch{return{}}}_save(){try{localStorage.setItem(Vr,JSON.stringify(this._tracked))}catch{}}_logState(t){const e=Object.keys(this._tracked);console.log(`[FirstTimeEvents] (${t}) — ${e.length} event(s) recorded:`,e.length?{...this._tracked}:"(none)")}track(t){return this._tracked[t]?!1:(this._tracked[t]=Date.now(),this._save(),this._logState(`new event: ${t}`),this._listeners.forEach(e=>e(t)),!0)}has(t){return!!this._tracked[t]}getAll(){return{...this._tracked}}clear(){this._tracked={};try{localStorage.removeItem(Vr)}catch{}this._logState("after clear")}}const Pe=new Hg;class Vg{constructor(t){this.gc=t,this.rageCharges=0,this.maxRageChargesCap=3,this.uniqueNPCHitsThisThrow=new Set,this.endTurnButton=null,this._boundHandleRageButtonClick=null,this._actionButtonsContainer=null}init(t){this._actionButtonsContainer=t,this._createEndTurnButton(),this._setupEndTurnButtonListener(),this._setupRageButtonListener(),this.updateEndTurnButtonVisibility(),this.updateRageButtonVisibility()}getDisc(){return this.gc.discs.find(t=>t.type==="player"&&t.kind==="Barbarian"&&!t.dead)}_createEndTurnButton(){if(!this._actionButtonsContainer)return;let t=document.getElementById("barbarian-end-turn-button");t||(t=document.createElement("button"),t.id="barbarian-end-turn-button",t.innerHTML="<kbd>Space</kbd> End Turn",this._actionButtonsContainer.appendChild(t)),t.style.display="none",this.endTurnButton=t}_setupEndTurnButtonListener(){this.endTurnButton&&this.endTurnButton.addEventListener("click",this._handleEndTurnButtonClick.bind(this))}async _handleEndTurnButtonClick(){if(this.gc.gameOverState.active)return;const t=this.gc.currentTurnIndex!==-1?this.gc.discs[this.gc.currentTurnIndex]:null;t&&t.type==="player"&&t.kind==="Barbarian"&&!t.dead&&await this.gc._proceedToNextPlayerTurn()}updateEndTurnButtonVisibility(){if(!this.endTurnButton)return;const t=this.gc.currentTurnIndex!==-1?this.gc.discs[this.gc.currentTurnIndex]:null,e=!!(t&&t.type==="player"&&t.kind==="Barbarian"&&!t.dead&&!this.gc.gameOverState.active);this.endTurnButton.style.display=e?"inline-block":"none",this.endTurnButton.disabled=!e}_handleRageButtonClick(){const t=this.getDisc();t&&!t.dead&&this.rageCharges>0&&(t.rageIsActiveForNextThrow=!0,this.rageCharges--,t.setSpotlightIntensity(!0),this.gc.soundManager&&this.gc.soundManager.playRage(t.mesh.position.clone())),this.updateRageButtonVisibility()}_setupRageButtonListener(){this._boundHandleRageButtonClick||(this._boundHandleRageButtonClick=this._handleRageButtonClick.bind(this)),this.gc.uiManager&&this.gc.uiManager.setupRageButtonListener(this._boundHandleRageButtonClick)}updateRageButtonVisibility(){if(!this.gc.uiManager)return;const t=this.gc.currentTurnIndex!==-1?this.gc.discs[this.gc.currentTurnIndex]:null,e=!!(t&&t.type==="player"&&t.kind==="Barbarian"&&!t.dead&&!t.rageIsActiveForNextThrow&&this.rageCharges>0);e&&Pe.track("barbarian_rage_available"),this.gc.uiManager.updateRageButtonVisibility(e,e,this.rageCharges,this.maxRageChargesCap)}onNewThrow(){this.uniqueNPCHitsThisThrow.clear()}onTurnEnd(){}onLevelStart(){this.uniqueNPCHitsThisThrow.clear()}onGameRestart(){this.rageCharges=0,this.uniqueNPCHitsThisThrow.clear()}}const Zn=class Zn{constructor(t,e,n,i,r,a,o="Unknown",l="NPC",c="Unknown",h=3,u=100,f=null,d=!1,g=1,_=1,m=!1,p=!1,E=1,M=null,x="A mysterious combatant."){this.radius=t,this.height=e,this.initialColor=n,this.discName=o,this.type=l,this.kind=c,this.hitPoints=h,this.lastHitPoints=h,this.maxHitPoints=h,this.dead=!1,this.skillLevel=u,this.scene=a,this.canDoReboundDamage=d,this.throwPowerMultiplier=g,this.mass=_,this.rageIsActiveForNextThrow=m,this.rageWasUsedThisThrow=p,this.attackDamage=E,this.gameController=M,this.description=x,this.relativeOffset=new A,this.healedDiscs=new Set,this.drainLifeActive=!1,this.drainLifeAura=null;const w=new sn(t,t,e,64);if(f){const R=new Ja;this.mesh=new vn;const L=new Et(w,new Us({color:n,opacity:.9,transparent:!0}));L.castShadow=!0,L.receiveShadow=!0,this.mesh.add(L);const S=R.load(f,O=>{O.colorSpace=He},void 0,O=>{}),y=new ze(t*1.8,t*1.8),D=new Us({map:S,transparent:!0,alphaTest:.1,opacity:1}),B=new Et(y,D);B.rotation.x=-Math.PI/2,B.position.y=e/2+.01,B.castShadow=!0,this.mesh.add(B)}else this.mesh=new Et(w,new Us({color:n,opacity:.9,transparent:!0})),this.mesh.castShadow=!0,this.mesh.receiveShadow=!0;this.basePositionY=e/2,this.mesh.position.y=this.basePositionY,this.mesh.position.x=i,this.mesh.position.z=r,a.add(this.mesh);const b=Zn.spotlightConfig.inactive;this.spotlight=new Hu(b.color,b.intensity,b.distance,b.angle,b.penumbra),this.spotlight.position.set(i,8,r),this.spotlight.target=this.mesh,this.spotlight.castShadow=!1,this.spotlight.shadow.mapSize.width=256,this.spotlight.shadow.mapSize.height=256,this.spotlight.shadow.camera.near=.1,this.spotlight.shadow.camera.far=20,a.add(this.spotlight),a.add(this.spotlight.target),this.velocity=new A(0,0,0),this.moving=!1,this.hasThrown=!1,this.hasCausedDamage=!1,this.animatedDeadRing=null}updatePosition(){this.mesh.position.add(this.velocity),this.spotlight.position.set(this.mesh.position.x,8,this.mesh.position.z),this.animatedDeadRing&&(this.animatedDeadRing.position.x=this.mesh.position.x,this.animatedDeadRing.position.y=this.mesh.position.y+.06,this.animatedDeadRing.position.z=this.mesh.position.z),this.drainLifeAura&&(this.drainLifeAura.position.x=this.mesh.position.x,this.drainLifeAura.position.z=this.mesh.position.z)}handleWallCollision(t,e,n){let i=!1;return this.mesh.position.x+this.radius>t/2?(this.mesh.position.x=t/2-this.radius,this.velocity.x=-this.velocity.x*n,i=!0):this.mesh.position.x-this.radius<-t/2&&(this.mesh.position.x=-t/2+this.radius,this.velocity.x=-this.velocity.x*n,i=!0),this.mesh.position.z+this.radius>e/2?(this.mesh.position.z=e/2-this.radius,this.velocity.z=-this.velocity.z*n,i=!0):this.mesh.position.z-this.radius<-e/2&&(this.mesh.position.z=-e/2+this.radius,this.velocity.z=-this.velocity.z*n,i=!0),i}handleCollisionWithBox(t,e){t.updateMatrixWorld();const n=new ii().setFromObject(t),i=this.mesh.position.clone(),r=this.radius,a=new A(Math.max(n.min.x,Math.min(i.x,n.max.x)),Math.max(n.min.y,Math.min(i.y,n.max.y)),Math.max(n.min.z,Math.min(i.z,n.max.z))),o=a.distanceTo(i);if(o<r){const l=i.clone().sub(a).normalize(),c=r-o;this.mesh.position.add(l.clone().multiplyScalar(c));const h=this.velocity.dot(l);if(h<0){const u=l.multiplyScalar(-2*h);this.velocity.add(u),this.velocity.multiplyScalar(e)}return this.moving=!0,!0}return!1}applyFriction(t){this.velocity.multiplyScalar(t),this.velocity.length()<.01&&(this.velocity.set(0,0,0),this.moving=!1,this.hasCausedDamage=!1,this.rageWasUsedThisThrow&&(this.canDoReboundDamage=!1,this.rageWasUsedThisThrow=!1),(this.kind==="Orb"||this.kind==="HealingOrb")&&(this.hitPoints=0,this.lastHitPoints=0),this.hitPoints<=0&&!this.dead&&this.die(),(this.kind==="Orb"||this.kind==="HealingOrb")&&this.gameController&&this.gameController.removeOrb(this),this.kind==="AnimatedDead"&&this.dead&&this.gameController&&this.gameController.thrownDisc!==this&&this.gameController.removeAnimatedDead(this))}revive(t){this.dead&&(this.dead=!1,this.hitPoints=t,this.lastHitPoints=t,this.hasThrown=!1,this.moving=!1,this.velocity.set(0,0,0),this.mesh.isGroup?this.mesh.children.forEach(e=>{e.material&&(e.material.color&&this.initialColor!==void 0&&e.material.color.set(e.material.map?16777215:this.initialColor),e.material.transparent=!0,e.material.opacity=.9)}):this.mesh.material&&(this.mesh.material.color&&this.initialColor!==void 0&&this.mesh.material.color.set(this.initialColor),this.mesh.material.transparent=!0,this.mesh.material.opacity=.9),this.updateSpotlightConfig("inactive"))}takeHit(t=1,e=null){if(this.kind==="Wizard"&&this.gameController&&e!==null){const r=this.gameController.wizardController.orbs.find(a=>a&&a.hitPoints>0&&!a.dead);if(r){e&&e.type==="NPC"&&e.takeHit(r.attackDamage,this);const a=r.hitPoints;r.hitPoints=0,a>0&&this.gameController&&this.gameController.uiManager&&this.gameController.uiManager.showFloatingText(r,a,!1),r.lastHitPoints=0,r.die(),this.gameController.removeOrb(r);return}}const n=this.hitPoints;this.hitPoints=Math.max(this.hitPoints-t,0);const i=n-this.hitPoints;i>0&&this.gameController&&this.gameController.uiManager&&this.kind!=="Orb"&&this.kind!=="HealingOrb"&&this.gameController.uiManager.showFloatingText(this,i,!1),this.lastHitPoints=this.hitPoints,(this.kind==="Orb"||this.kind==="HealingOrb")&&this.hitPoints<=0&&n>0&&(this.die(),this.gameController&&this.gameController.removeOrb(this))}restoreHealth(t=1){if(this.dead)return;const e=this.hitPoints;this.hitPoints=Math.min(this.hitPoints+t,this.maxHitPoints);const n=this.hitPoints-e;n>0&&this.gameController&&this.gameController.uiManager&&this.gameController.uiManager.showFloatingText(this,n,!0),this.lastHitPoints=this.hitPoints}die(){this.dead||(this.dead=!0,this.mesh.isGroup?this.mesh.children.forEach(t=>{t.material&&(t.material.color&&t.material.color.set(8947848),t.material.emissive&&t.material.emissive.set(0),t.material.opacity=.9,t.material.transparent=!1)}):(this.mesh.material.color&&this.mesh.material.color.set(8947848),this.mesh.material.emissive&&this.mesh.material.emissive.set(0),this.mesh.material.opacity=.9,this.mesh.material.transparent=!1),this.hideAnimatedDeadRing(),this.hideDrainLifeAura(),this.updateSpotlightConfig("dead"))}setSpotlightIntensity(t){this.dead?(this.hideAnimatedDeadRing(),this.updateSpotlightConfig("dead")):this.kind==="Barbarian"&&(this.rageIsActiveForNextThrow||this.rageWasUsedThisThrow)?(this.hideAnimatedDeadRing(),this.updateSpotlightConfig("raging")):this.kind==="AnimatedDead"?(this.showAnimatedDeadRing(),this.updateSpotlightConfig("inactive")):this.kind==="Necromancer"&&this.drainLifeActive?(this.hideAnimatedDeadRing(),this.updateSpotlightConfig("drainingLife")):t?(this.hideAnimatedDeadRing(),this.updateSpotlightConfig("active")):(this.hideAnimatedDeadRing(),this.updateSpotlightConfig("inactive"))}showAnimatedDeadRing(){if(this.animatedDeadRing)return;const t=new ls(this.radius,.3,8,48),e=new Us({color:8926156,emissive:4460902});this.animatedDeadRing=new Et(t,e),this.animatedDeadRing.rotation.x=Math.PI/2,this.animatedDeadRing.position.set(this.mesh.position.x,this.mesh.position.y+.06,this.mesh.position.z),this.scene.add(this.animatedDeadRing)}hideAnimatedDeadRing(){this.animatedDeadRing&&(this.scene.remove(this.animatedDeadRing),this.animatedDeadRing.geometry.dispose(),this.animatedDeadRing.material.dispose(),this.animatedDeadRing=null)}showDrainLifeAura(t){if(this.drainLifeAura)return;const e=new vn,n=new ls(t,.22,8,64),i=new Oe({color:8926156,transparent:!0,opacity:.85,depthWrite:!1}),r=new Et(n,i);r.rotation.x=Math.PI/2,e.add(r);const a=new is(t,48),o=new Oe({color:6684842,transparent:!0,opacity:.07,depthWrite:!1,side:le}),l=new Et(a,o);l.rotation.x=-Math.PI/2,e.add(l),e.position.set(this.mesh.position.x,.05,this.mesh.position.z),this.scene.add(e),this.drainLifeAura=e}hideDrainLifeAura(){this.drainLifeAura&&(this.scene.remove(this.drainLifeAura),this.drainLifeAura.children.forEach(t=>{t.geometry&&t.geometry.dispose(),t.material&&t.material.dispose()}),this.drainLifeAura=null)}updateSpotlightConfig(t){const e=Zn.spotlightConfig[t];e&&(this.spotlight.intensity=e.intensity,this.spotlight.distance=e.distance,this.spotlight.angle=e.angle,this.spotlight.penumbra=e.penumbra,this.spotlight.color.setHex(e.color))}static updateSpotlightConfig(t,e){Zn.spotlightConfig[t]&&Object.assign(Zn.spotlightConfig[t],e)}resetDamageState(){this.hasCausedDamage=!1,this.healedDiscs.clear()}dispose(){this.hideAnimatedDeadRing(),this.hideDrainLifeAura(),this.scene&&(this.scene.remove(this.mesh),this.scene.remove(this.spotlight),this.scene.remove(this.spotlight.target),this.mesh.isGroup?this.mesh.children.forEach(t=>{t.geometry&&t.geometry.dispose(),t.material&&(t.material.map&&t.material.map.dispose(),t.material.dispose())}):(this.mesh.geometry&&this.mesh.geometry.dispose(),this.mesh.material&&this.mesh.material.dispose()))}};co(Zn,"spotlightConfig",{active:{intensity:80,distance:25,angle:Math.PI/4,penumbra:1.2,color:16777215},inactive:{intensity:30,distance:12.5,angle:Math.PI/4,penumbra:1.2,color:16777215},dead:{intensity:2,distance:15,angle:Math.PI/8,penumbra:.5,color:8947848},raging:{intensity:80,distance:25,angle:Math.PI/4,penumbra:1.2,color:16711680},animatedDead:{intensity:80,distance:15,angle:Math.PI/10,penumbra:.3,color:0},animateDeadTarget:{intensity:15,distance:10,angle:Math.PI/5,penumbra:1,color:10040319},animateDeadHovered:{intensity:80,distance:18,angle:Math.PI/4,penumbra:1.2,color:13395711},drainingLife:{intensity:80,distance:25,angle:Math.PI/4,penumbra:1.2,color:8926156}});let Mn=Zn;class Gg{constructor(t){this.gc=t,this.mana=3,this.manaEarnedThisTurn=0,this.hasMovedThisTurn=!1,this.orbs=[],this._radiusBlastRings=[],this.summonOrbsButton=null,this.summonHealingOrbsButton=null,this.radiusBlastButton=null,this.endTurnButton=null,this._actionButtonsContainer=null}init(t){this._actionButtonsContainer=t,this._createSummonOrbsButton(),this._setupSummonOrbsButtonListener(),this._createSummonHealingOrbsButton(),this._setupSummonHealingOrbsButtonListener(),this._createRadiusBlastButton(),this._setupRadiusBlastButtonListener(),this._createEndTurnButton(),this._setupEndTurnButtonListener(),this.updateActionButtons(),this.updateEndTurnButtonVisibility()}getDisc(){return this.gc.discs.find(t=>t.type==="player"&&t.kind==="Wizard"&&!t.dead)}_createSummonOrbsButton(){if(!this._actionButtonsContainer)return;let t=document.getElementById("summon-orbs-button");t||(t=document.createElement("button"),t.id="summon-orbs-button",t.dataset.shortcut="1",t.innerHTML="<kbd>1</kbd> Summon Orb",this._actionButtonsContainer.appendChild(t)),t.style.display="none",this.summonOrbsButton=t}_createSummonHealingOrbsButton(){if(!this._actionButtonsContainer)return;let t=document.getElementById("summon-healing-orbs-button");t||(t=document.createElement("button"),t.id="summon-healing-orbs-button",t.dataset.shortcut="2",t.innerHTML="<kbd>2</kbd> Summon Healing Orb",this._actionButtonsContainer.appendChild(t)),t.style.display="none",this.summonHealingOrbsButton=t}_createRadiusBlastButton(){if(!this._actionButtonsContainer)return;let t=document.getElementById("radius-blast-button");t||(t=document.createElement("button"),t.id="radius-blast-button",t.dataset.shortcut="3",t.innerHTML="<kbd>3</kbd> Radius Blast (2 Mana)",this._actionButtonsContainer.appendChild(t)),t.style.display="none",this.radiusBlastButton=t}_createEndTurnButton(){if(!this._actionButtonsContainer)return;let t=document.getElementById("wizard-end-turn-button");t||(t=document.createElement("button"),t.id="wizard-end-turn-button",t.innerHTML="<kbd>Space</kbd> End Turn",this._actionButtonsContainer.appendChild(t)),t.style.display="none",this.endTurnButton=t}_setupSummonOrbsButtonListener(){this.summonOrbsButton&&this.summonOrbsButton.addEventListener("click",this._handleSummonOrbsButtonClick.bind(this))}_setupSummonHealingOrbsButtonListener(){this.summonHealingOrbsButton&&this.summonHealingOrbsButton.addEventListener("click",this._handleSummonHealingOrbsButtonClick.bind(this))}_setupRadiusBlastButtonListener(){this.radiusBlastButton&&this.radiusBlastButton.addEventListener("click",this._handleRadiusBlastButtonClick.bind(this))}_setupEndTurnButtonListener(){this.endTurnButton&&this.endTurnButton.addEventListener("click",this._handleEndTurnButtonClick.bind(this))}_handleSummonOrbsButtonClick(){const t=this.gc.currentTurnIndex!==-1?this.gc.discs[this.gc.currentTurnIndex]:null;!t||t.kind!=="Wizard"||t.dead||(this.mana>0&&this.summonSingleOrb(t)&&(Pe.track("wizard_orb_summoned"),this.mana--,this.gc.uiManager&&this.gc.uiManager.updateCurrentTurnDiscName(t)),this.updateActionButtons())}_handleSummonHealingOrbsButtonClick(){const t=this.gc.currentTurnIndex!==-1?this.gc.discs[this.gc.currentTurnIndex]:null;!t||t.kind!=="Wizard"||t.dead||(this.mana>0&&this.summonHealingOrb(t)&&(Pe.track("wizard_healing_orb_summoned"),this.mana--,this.gc.uiManager&&this.gc.uiManager.updateCurrentTurnDiscName(t)),this.updateActionButtons())}_handleRadiusBlastButtonClick(){const t=this.gc.currentTurnIndex!==-1?this.gc.discs[this.gc.currentTurnIndex]:null;!t||t.kind!=="Wizard"||t.dead||this.mana>=2&&(Pe.track("wizard_radius_blast_used"),this.castRadiusBlast(t))}async _handleEndTurnButtonClick(){const t=this.gc.currentTurnIndex!==-1?this.gc.discs[this.gc.currentTurnIndex]:null;t&&t.kind==="Wizard"&&!t.dead&&await this.gc._proceedToNextPlayerTurn()}updateActionButtons(){this._updateSummonOrbsButtonVisibility(),this._updateSummonHealingOrbsButtonVisibility(),this._updateRadiusBlastButtonVisibility()}_updateSummonOrbsButtonVisibility(){if(!this.summonOrbsButton)return;const t=this.gc.currentTurnIndex!==-1?this.gc.discs[this.gc.currentTurnIndex]:null,e=this.orbs.filter(i=>i&&i.hitPoints>0&&!i.dead).length,n=!!(t&&t.kind==="Wizard"&&t.type==="player"&&!t.dead&&!this.gc.gameOverState.active&&this.mana>0&&e<3);this.summonOrbsButton.style.display=n?"inline-block":"none",this.summonOrbsButton.disabled=!n}_updateSummonHealingOrbsButtonVisibility(){if(!this.summonHealingOrbsButton)return;const t=this.gc.currentTurnIndex!==-1?this.gc.discs[this.gc.currentTurnIndex]:null,e=this.orbs.filter(i=>i&&i.hitPoints>0&&!i.dead).length,n=!!(t&&t.kind==="Wizard"&&t.type==="player"&&!t.dead&&!this.gc.gameOverState.active&&this.mana>0&&e<3);this.summonHealingOrbsButton.style.display=n?"inline-block":"none",this.summonHealingOrbsButton.disabled=!n}_updateRadiusBlastButtonVisibility(){if(!this.radiusBlastButton)return;const t=this.gc.currentTurnIndex!==-1?this.gc.discs[this.gc.currentTurnIndex]:null,e=!!(t&&t.kind==="Wizard"&&t.type==="player"&&!t.dead&&!this.gc.gameOverState.active&&this.mana>=2);this.radiusBlastButton.style.display=e?"inline-block":"none",this.radiusBlastButton.disabled=!e}updateEndTurnButtonVisibility(){if(!this.endTurnButton)return;const t=this.gc.currentTurnIndex!==-1?this.gc.discs[this.gc.currentTurnIndex]:null,e=!!(t&&t.type==="player"&&t.kind==="Wizard"&&!t.dead&&!this.gc.gameOverState.active);this.endTurnButton.style.display=e?"inline-block":"none",this.endTurnButton.disabled=!e}summonSingleOrb(t){if(!t||t.kind!=="Wizard"||t.dead||this.orbs.filter(a=>a&&a.hitPoints>0&&!a.dead).length>=3)return!1;const n=t.mesh.position,i=2;let r=!1;for(let a=0;a<360;a+=5){const o=a*(Math.PI/180),l=n.x+i*Math.cos(o),c=n.z+i*Math.sin(o);if(this.gc.isPositionValid(l,c,.35,!0,[t])){const h=new Mn(.35,.2,65535,l,c,this.gc.scene,"Wizard's Orb","player","Orb",1,0,null,!1,.5,.5,!1,!1,1,this.gc,this.gc.discDescriptions.Orb);h.uniqueOrbId=`orb_${Date.now()}_${Math.random().toString(36).substring(2,7)}`,h.relativeOffset.copy(new A(l,0,c).sub(new A(n.x,0,n.z))),this.gc.discs.push(h),this.orbs.push(h),h.setSpotlightIntensity(!0),r=!0;break}}return r&&this.gc.updateDiscNames(),r}summonHealingOrb(t){if(!t||t.kind!=="Wizard"||t.dead||this.orbs.filter(a=>a&&a.hitPoints>0&&!a.dead).length>=3)return!1;const n=t.mesh.position,i=2;let r=!1;for(let a=0;a<360;a+=5){const o=a*(Math.PI/180),l=n.x+i*Math.cos(o),c=n.z+i*Math.sin(o);if(this.gc.isPositionValid(l,c,.35,!0,[t])){const h=new Mn(.35,.2,16711680,l,c,this.gc.scene,"Healing Orb","player","HealingOrb",1,0,null,!1,.5,.5,!1,!1,0,this.gc,this.gc.discDescriptions.HealingOrb);h.uniqueOrbId=`orb_${Date.now()}_${Math.random().toString(36).substring(2,7)}`,h.relativeOffset.copy(new A(l,0,c).sub(new A(n.x,0,n.z))),this.gc.discs.push(h),this.orbs.push(h),h.setSpotlightIntensity(!0),r=!0;break}}return r&&this.gc.updateDiscNames(),r}removeOrb(t){if(!t)return;const e=this.orbs.indexOf(t);e>-1&&this.orbs.splice(e,1);const n=this.gc.discs.indexOf(t);n>-1&&this.gc.discs.splice(n,1),t.velocity.set(0,0,0),t.moving=!1,t.dispose(),this.updateActionButtons(),this.gc.updateDiscNames()}castRadiusBlast(t){if(!t||t.dead||this.mana<2)return;this.mana-=2,this.gc.soundManager.playWizardRadiusBlast(t.mesh.position);const e=8,n=3.5,i=t.mesh.position;this.gc.discs.forEach(c=>{if(c===t||c.dead)return;const h=c.mesh.position.x-i.x,u=c.mesh.position.z-i.z,f=Math.sqrt(h*h+u*u);if(f>0&&f<=e){const d=n*(1-f/e);c.velocity.x+=h/f*d,c.velocity.z+=u/f*d,c.moving=!0,c.takeHit(1,t)}}),this.gc.updateAllDiscDeadStates(),this.gc.checkGameOverConditions();const r=t.mesh.position.y+.1,a=t.mesh.position.x,o=t.mesh.position.z,l=.45;for(let c=0;c<2;c++){const h=new ls(1,.03,8,64),u=new Oe({color:8965375,transparent:!0,opacity:.85,side:le}),f=new Et(h,u);f.rotation.x=Math.PI/2,f.position.set(a,r,o),this.gc.scene.add(f),this._radiusBlastRings.push({mesh:f,delay:c*.15,elapsed:0,duration:l,maxRadius:e})}this.gc.uiManager&&this.gc.uiManager.updateCurrentTurnDiscName(t),this.updateActionButtons()}update(t){this._updateOrbFollowing(),this._updateRadiusBlastRings(t)}_updateOrbFollowing(){const t=this.gc.discs.find(n=>n.kind==="Wizard"&&n.type==="player"&&!n.dead);if(!t||this.orbs.length===0)return;const e=t.mesh.position;[...this.orbs].forEach(n=>{const i=this.gc.discs.find(r=>r.uniqueOrbId===n.uniqueOrbId);if(i&&i.mesh&&i.hitPoints>0&&!i.dead&&!i.moving){const r=e.clone().add(i.relativeOffset);if(r.y=i.basePositionY,i.mesh.position.copy(r),i.spotlight&&i.spotlight.position.set(r.x,i.spotlight.position.y,r.z),this.gc.level&&typeof i.radius=="number"){const a=i.radius;i.mesh.position.x=Math.max(-this.gc.level.fieldWidth/2+a,Math.min(this.gc.level.fieldWidth/2-a,i.mesh.position.x)),i.mesh.position.z=Math.max(-this.gc.level.fieldDepth/2+a,Math.min(this.gc.level.fieldDepth/2-a,i.mesh.position.z))}}})}_updateRadiusBlastRings(t){for(let e=this._radiusBlastRings.length-1;e>=0;e--){const n=this._radiusBlastRings[e];n.elapsed+=t;const i=n.elapsed-n.delay;if(i<=0)continue;const r=Math.min(i/n.duration,1),a=n.maxRadius*r;n.mesh.scale.set(a,a,1),n.mesh.material.opacity=.85*(1-r),r>=1&&(this.gc.scene.remove(n.mesh),n.mesh.geometry.dispose(),n.mesh.material.dispose(),this._radiusBlastRings.splice(e,1))}}async onDiscStopped(t){if(t.kind==="Wizard"){this.hasMovedThisTurn=!0;const e=this.orbs.filter(i=>i&&i.hitPoints>0&&!i.dead).length,n=this.mana>0&&e<3;e===0&&!n?await this.gc._proceedToNextPlayerTurn():(this.gc.currentDisc=t,this.gc.logCurrentTurn(),this.gc._updateSpotlights(),this.gc.barbarianController.updateRageButtonVisibility(),this.updateActionButtons(),this.updateEndTurnButtonVisibility())}else if(t.kind==="Orb"||t.kind==="HealingOrb"){this.removeOrb(t);const e=this.gc.discs.find(n=>n.kind==="Wizard"&&n.type==="player"&&!n.dead);if(e){this.gc.currentDisc=e;const n=this.gc.discs.indexOf(e);n!==-1&&(this.gc.currentTurnIndex=n),this.gc.logCurrentTurn(),this.gc._updateSpotlights(),this.gc.barbarianController.updateRageButtonVisibility(),this.updateActionButtons(),this.updateEndTurnButtonVisibility(),this.gc.barbarianController.updateEndTurnButtonVisibility();const i=this.orbs.filter(a=>a&&a.hitPoints>0&&!a.dead).length,r=this.mana>0&&i<3;i===0&&this.hasMovedThisTurn&&!r&&await this.gc._proceedToNextPlayerTurn()}else await this.gc._proceedToNextPlayerTurn()}}applyEarnedMana(){this.mana+=this.manaEarnedThisTurn+1,this.manaEarnedThisTurn=0}onTurnEnd(){this.hasMovedThisTurn=!1}onLevelStart(){this.hasMovedThisTurn=!1,this.manaEarnedThisTurn=0,this.orbs=[]}onGameRestart(){this.mana=3,this.manaEarnedThisTurn=0,this.hasMovedThisTurn=!1,this.orbs=[]}}const Vi=8,Gi=2;class Wg{constructor(t){this.gc=t,this.mana=3,this.manaEarnedThisTurn=0,this.hasMovedThisTurn=!1,this.animatedDeadDiscs=[],this.movedThisTurn=new Set,this.selectingTarget=!1,this.hoveredDisc=null,this._targetBeams=[],this._beamGeo=null,this._beamMat=null,this.drainLifeActive=!1,this.animateDeadButton=null,this.raiseDeadButton=null,this.drainLifeButton=null,this.endTurnButton=null,this.targetSelectionPopup=null,this._actionButtonsContainer=null}init(t){this._actionButtonsContainer=t,this._createAnimateDeadButton(),this._setupAnimateDeadButtonListener(),this._createDrainLifeButton(),this._setupDrainLifeButtonListener(),this._createRaiseDeadButton(),this._setupRaiseDeadButtonListener(),this._createEndTurnButton(),this._setupEndTurnButtonListener(),this.updateActionButtons(),this.updateEndTurnButtonVisibility()}getDisc(){return this.gc.discs.find(t=>t.type==="player"&&t.kind==="Necromancer"&&!t.dead)}canCastSpells(t){if(!t||t.dead)return!1;if(this.drainLifeActive)return!0;const e=this.gc.discs.filter(r=>r.type==="NPC"&&r.dead&&!r.isAnimatedDead),n=this.gc.discs.filter(r=>r.type==="player"&&r.dead&&r.kind!=="Orb"&&r.kind!=="HealingOrb"&&r.kind!=="AnimatedDead"&&r.kind!=="Necromancer"),i=this.animatedDeadDiscs.filter(r=>r.hitPoints>0&&!r.dead).length;return this.mana>=1&&e.length>0&&i<3||this.mana>=2&&n.length>0||this.mana>=Gi}_createAnimateDeadButton(){if(!this._actionButtonsContainer)return;let t=document.getElementById("animate-dead-button");t||(t=document.createElement("button"),t.id="animate-dead-button",t.dataset.shortcut="1",t.innerHTML="<kbd>1</kbd> Animate Dead (1💀)",this._actionButtonsContainer.appendChild(t)),t.style.display="none",this.animateDeadButton=t}_createRaiseDeadButton(){if(!this._actionButtonsContainer)return;let t=document.getElementById("raise-dead-button");t||(t=document.createElement("button"),t.id="raise-dead-button",t.dataset.shortcut="3",t.innerHTML="<kbd>3</kbd> Raise Dead (2💀)",this._actionButtonsContainer.appendChild(t)),t.style.display="none",this.raiseDeadButton=t}_createDrainLifeButton(){if(!this._actionButtonsContainer)return;let t=document.getElementById("drain-life-button");t||(t=document.createElement("button"),t.id="drain-life-button",t.dataset.shortcut="2",this._actionButtonsContainer.appendChild(t)),t.style.display="none",this.drainLifeButton=t,this._updateDrainLifeButtonLabel()}_createEndTurnButton(){if(!this._actionButtonsContainer)return;let t=document.getElementById("necromancer-end-turn-button");t||(t=document.createElement("button"),t.id="necromancer-end-turn-button",t.innerHTML="<kbd>Space</kbd> End Turn",this._actionButtonsContainer.appendChild(t)),t.style.display="none",this.endTurnButton=t}_setupAnimateDeadButtonListener(){this.animateDeadButton&&this.animateDeadButton.addEventListener("click",this._handleAnimateDeadButtonClick.bind(this))}_setupRaiseDeadButtonListener(){this.raiseDeadButton&&this.raiseDeadButton.addEventListener("click",this._handleRaiseDeadButtonClick.bind(this))}_setupDrainLifeButtonListener(){this.drainLifeButton&&this.drainLifeButton.addEventListener("click",this._handleDrainLifeButtonClick.bind(this))}_setupEndTurnButtonListener(){this.endTurnButton&&this.endTurnButton.addEventListener("click",this._handleEndTurnButtonClick.bind(this))}_handleAnimateDeadButtonClick(){const t=this.gc.currentTurnIndex!==-1?this.gc.discs[this.gc.currentTurnIndex]:null;if(!t||t.kind!=="Necromancer"||t.dead||this.mana<1||(Pe.track("animate_dead_button_clicked"),this.animatedDeadDiscs.filter(i=>i.hitPoints>0&&!i.dead).length>=3))return;const n=this.gc.discs.filter(i=>i.type==="NPC"&&i.dead&&!i.isAnimatedDead);n.length!==0&&(this.selectingTarget=!0,n.forEach(i=>i.updateSpotlightConfig("animateDeadTarget")),this._spawnTargetBeams(n),this.gc.uiManager&&this.gc.uiManager.updateThrowInfo("Click a dead enemy to animate it  •  Esc to cancel",!0),this.updateActionButtons())}_handleRaiseDeadButtonClick(){const t=this.gc.currentTurnIndex!==-1?this.gc.discs[this.gc.currentTurnIndex]:null;if(!t||t.kind!=="Necromancer"||t.dead||this.mana<2)return;const e=this.gc.discs.filter(n=>n.type==="player"&&n.dead&&n.kind!=="Orb"&&n.kind!=="HealingOrb"&&n.kind!=="AnimatedDead"&&n.kind!=="Necromancer");e.length!==0&&this._showTargetSelectionPopup(e,n=>{this.raiseDeadDisc(t,n)&&(this.gc.uiManager&&this.gc.uiManager.updateCurrentTurnDiscName(t),this.updateActionButtons(),this.gc.updateDiscNames())},"Choose an ally to raise:")}_handleDrainLifeButtonClick(){const t=this.gc.currentTurnIndex!==-1?this.gc.discs[this.gc.currentTurnIndex]:null;if(!(!t||t.kind!=="Necromancer"||t.dead)){if(this.drainLifeActive)this._deactivateDrainLife(t);else{if(this.mana<Gi)return;Pe.track("drain_life_button_clicked"),this._activateDrainLife(t)}this.updateActionButtons(),this.gc.uiManager&&this.gc.uiManager.updateCurrentTurnDiscName(t)}}_activateDrainLife(t){this.mana-=Gi,this.drainLifeActive=!0,t.drainLifeActive=!0,t.showDrainLifeAura(Vi),t.setSpotlightIntensity(!0),this.gc.soundManager&&this.gc.soundManager.playDrain(t.mesh.position.clone())}_deactivateDrainLife(t){this.drainLifeActive=!1,t.drainLifeActive=!1,t.hideDrainLifeAura(),t.setSpotlightIntensity(!0)}async _handleEndTurnButtonClick(){const t=this.gc.currentTurnIndex!==-1?this.gc.discs[this.gc.currentTurnIndex]:null;t&&t.kind==="Necromancer"&&!t.dead&&(this._applyDrainLifeOnTurnEnd(),await this.gc._proceedToNextPlayerTurn())}_applyDrainLifeOnTurnEnd(){if(!this.drainLifeActive)return;const t=this.getDisc();if(!t)return;const e=t.mesh.position;let n=0;this.gc.discs.forEach(i=>{if(i.type!=="NPC"||i.dead)return;const r=i.mesh.position.x-e.x,a=i.mesh.position.z-e.z;if(r*r+a*a>Vi*Vi)return;const o=i.hitPoints;i.takeHit(1,t);const l=o-i.hitPoints;i.hitPoints<=0&&!i.dead&&(i.die(),this.gc.updateDiscNames()),l>0&&(t.restoreHealth(l),n+=l)}),n>0&&this.gc.soundManager&&this.gc.soundManager.playDrain(e.clone()),n===0&&(t.takeHit(1,null),t.hitPoints<=0&&!t.dead&&(t.die(),this._deactivateDrainLife(t)))}updateActionButtons(){this._updateAnimateDeadButtonVisibility(),this._updateRaiseDeadButtonVisibility(),this._updateDrainLifeButtonVisibility()}_updateAnimateDeadButtonVisibility(){if(!this.animateDeadButton)return;const t=this.gc.currentTurnIndex!==-1?this.gc.discs[this.gc.currentTurnIndex]:null,e=this.gc.discs.filter(r=>r.type==="NPC"&&r.dead&&!r.isAnimatedDead),n=this.animatedDeadDiscs.filter(r=>r.hitPoints>0&&!r.dead).length,i=!!(t&&t.kind==="Necromancer"&&t.type==="player"&&!t.dead&&!this.gc.gameOverState.active&&this.mana>=1&&e.length>0&&n<3&&!this.selectingTarget);this.animateDeadButton.style.display=i?"inline-block":"none",this.animateDeadButton.disabled=!i}_updateRaiseDeadButtonVisibility(){if(!this.raiseDeadButton)return;const t=this.gc.currentTurnIndex!==-1?this.gc.discs[this.gc.currentTurnIndex]:null,e=this.gc.discs.filter(i=>i.type==="player"&&i.dead&&i.kind!=="Orb"&&i.kind!=="HealingOrb"&&i.kind!=="AnimatedDead"&&i.kind!=="Necromancer"),n=!!(t&&t.kind==="Necromancer"&&t.type==="player"&&!t.dead&&!this.gc.gameOverState.active&&this.mana>=2&&e.length>0);this.raiseDeadButton.style.display=n?"inline-block":"none",this.raiseDeadButton.disabled=!n}_updateDrainLifeButtonLabel(){this.drainLifeButton&&(this.drainLifeActive?this.drainLifeButton.innerHTML="<kbd>2</kbd> Drain Life: ON":this.drainLifeButton.innerHTML=`<kbd>2</kbd> Drain Life (${Gi}💀)`)}_updateDrainLifeButtonVisibility(){if(!this.drainLifeButton)return;const t=this.gc.currentTurnIndex!==-1?this.gc.discs[this.gc.currentTurnIndex]:null,e=!!(t&&t.kind==="Necromancer"&&t.type==="player"&&!t.dead&&!this.gc.gameOverState.active);if(this._updateDrainLifeButtonLabel(),!e){this.drainLifeButton.style.display="none",this.drainLifeButton.disabled=!0;return}if(this.drainLifeActive)this.drainLifeButton.style.display="inline-block",this.drainLifeButton.disabled=!1;else{const n=this.mana>=Gi;this.drainLifeButton.style.display=n?"inline-block":"none",this.drainLifeButton.disabled=!n}}updateEndTurnButtonVisibility(){if(!this.endTurnButton)return;const t=this.gc.currentTurnIndex!==-1?this.gc.discs[this.gc.currentTurnIndex]:null,e=!!(t&&t.type==="player"&&t.kind==="Necromancer"&&!t.dead&&!this.gc.gameOverState.active);this.endTurnButton.style.display=e?"inline-block":"none",this.endTurnButton.disabled=!e}cancelTargetSelection(){this.selectingTarget&&(this.selectingTarget=!1,this.hoveredDisc=null,this.gc.discs.filter(t=>t.type==="NPC"&&t.dead&&!t.isAnimatedDead).forEach(t=>t.updateSpotlightConfig("dead")),this._clearTargetBeams(),this.gc.uiManager&&this.gc.uiManager.updateThrowInfo("",!1),this.updateActionButtons())}handlePointerHover(t){if(!this.selectingTarget)return;const e=new dt(t.clientX/window.innerWidth*2-1,-(t.clientY/window.innerHeight)*2+1);this.gc.raycaster.setFromCamera(e,this.gc.camera);const n=this.gc.discs.filter(r=>r.type==="NPC"&&r.dead&&!r.isAnimatedDead);let i=null;for(const r of n)if(this.gc.raycaster.intersectObject(r.mesh,!0).length>0){i=r;break}i!==this.hoveredDisc&&(this.hoveredDisc&&this.hoveredDisc.updateSpotlightConfig("animateDeadTarget"),this.hoveredDisc=i,i&&i.updateSpotlightConfig("animateDeadHovered"))}handleTargetClick(t){if(t&&t.type==="NPC"&&t.dead&&!t.isAnimatedDead){const e=this.gc.discs.find(n=>n.kind==="Necromancer"&&n.type==="player"&&!n.dead);e&&this.animateDeadDisc(e,t)&&(this.gc.uiManager&&this.gc.uiManager.updateCurrentTurnDiscName(e),this.gc.updateDiscNames())}this.cancelTargetSelection()}_showTargetSelectionPopup(t,e,n){this.hideTargetSelectionPopup();const i=document.createElement("div");i.id="target-selection-popup",i.style.cssText="margin-top:8px;padding:8px;background:rgba(0,0,0,0.75);border:1px solid #8833CC;border-radius:6px;";const r=document.createElement("div");r.textContent=n,r.style.cssText="color:#CC88FF;font-size:0.8em;margin-bottom:6px;font-weight:bold;",i.appendChild(r),t.forEach(o=>{const l=document.createElement("button");l.textContent=o.discName,l.style.cssText="display:block;width:100%;margin-bottom:4px;padding:4px 8px;font-size:0.75em;cursor:pointer;",l.addEventListener("click",()=>{this.hideTargetSelectionPopup(),e(o)}),i.appendChild(l)});const a=document.createElement("button");a.textContent="Cancel",a.style.cssText="display:block;width:100%;padding:4px 8px;font-size:0.75em;cursor:pointer;margin-top:4px;opacity:0.7;",a.addEventListener("click",()=>this.hideTargetSelectionPopup()),i.appendChild(a),this._actionButtonsContainer.appendChild(i),this.targetSelectionPopup=i}hideTargetSelectionPopup(){this.targetSelectionPopup&&(this.targetSelectionPopup.remove(),this.targetSelectionPopup=null)}_spawnTargetBeams(t){if(this._clearTargetBeams(),!t.length)return;const e=200;this._beamGeo=new sn(1,1,e,16,1,!0),this._beamMat=new Oe({color:10040319,transparent:!0,opacity:.13,side:Ce,depthWrite:!1}),t.forEach(n=>{const i=new Et(this._beamGeo,this._beamMat);i.position.set(n.mesh.position.x,e/2,n.mesh.position.z),this.gc.scene.add(i),this._targetBeams.push(i)})}_clearTargetBeams(){this._targetBeams.forEach(t=>this.gc.scene.remove(t)),this._targetBeams=[],this._beamGeo&&(this._beamGeo.dispose(),this._beamGeo=null),this._beamMat&&(this._beamMat.dispose(),this._beamMat=null)}animateDeadDisc(t,e){return!t||t.dead||!e||!e.dead||this.mana<1||this.animatedDeadDiscs.filter(i=>i.hitPoints>0&&!i.dead).length>=3?!1:(this.mana--,e._originalKind=e.kind,e._originalType=e.type,e._originalAttackDamage=e.attackDamage,e._originalMaxHitPoints=e.maxHitPoints,e.revive(1),e.attackDamage=1,e.maxHitPoints=1,e.type="player",e.kind="AnimatedDead",e.isAnimatedDead=!0,e._animatedDeadColor=t.initialColor,e.mesh.position.y=e.basePositionY,this.animatedDeadDiscs.push(e),e.setSpotlightIntensity(!1),this.gc.soundManager&&this.gc.soundManager.playBreath(e.mesh.position.clone()),!0)}raiseDeadDisc(t,e){if(!t||t.dead||!e||!e.dead||this.mana<2)return!1;this.mana-=2;const n=Math.max(1,Math.floor(e.maxHitPoints/2));return e.revive(n),e.hitPoints=n,e.lastHitPoints=n,this.gc.updateDiscNames(),!0}applyDrainLifeToNPC(t){if(!this.drainLifeActive||!t||t.dead)return;const e=this.getDisc();if(!e||e.dead)return;const n=e.mesh.position,i=t.mesh.position,r=i.x-n.x,a=i.z-n.z;if(r*r+a*a>Vi*Vi)return;const o=t.hitPoints;t.takeHit(1,e);const l=o-t.hitPoints;t.hitPoints<=0&&!t.dead&&(t.die(),this.gc.updateDiscNames()),l>0&&e.restoreHealth(l)}removeAnimatedDead(t){if(!t)return;const e=this.animatedDeadDiscs.indexOf(t);e!==-1&&(this.animatedDeadDiscs.splice(e,1),t.kind=t._originalKind||"Skeleton",t.type=t._originalType||"NPC",t.attackDamage=t._originalAttackDamage!==void 0?t._originalAttackDamage:1,t.maxHitPoints=t._originalMaxHitPoints!==void 0?t._originalMaxHitPoints:t.maxHitPoints,t.isAnimatedDead=!1,delete t._originalKind,delete t._originalType,delete t._originalAttackDamage,delete t._originalMaxHitPoints,delete t._animatedDeadColor,t.dead||(t.hitPoints=0,t.lastHitPoints=0,t.die()),this.updateActionButtons(),this.gc.updateDiscNames())}async onDiscStopped(t){if(t.kind==="Necromancer"){this.hasMovedThisTurn=!0;const e=this.animatedDeadDiscs.filter(i=>i&&i.hitPoints>0&&!i.dead).length,n=this.canCastSpells(t);e===0&&!n?await this.gc._proceedToNextPlayerTurn():(this.gc.currentDisc=t,this.gc.logCurrentTurn(),this.gc._updateSpotlights(),this.gc.barbarianController.updateRageButtonVisibility(),this.updateActionButtons(),this.updateEndTurnButtonVisibility())}else if(t.kind==="AnimatedDead"){this.movedThisTurn.add(t),t.hitPoints<=0&&this.removeAnimatedDead(t);const e=this.gc.discs.find(n=>n.kind==="Necromancer"&&n.type==="player"&&!n.dead);if(e){this.gc.currentDisc=e;const n=this.gc.discs.indexOf(e);n!==-1&&(this.gc.currentTurnIndex=n),this.gc.logCurrentTurn(),this.gc._updateSpotlights(),this.gc.barbarianController.updateRageButtonVisibility(),this.updateActionButtons(),this.updateEndTurnButtonVisibility(),this.gc.barbarianController.updateEndTurnButtonVisibility();const i=this.animatedDeadDiscs.filter(a=>a&&a.hitPoints>0&&!a.dead&&!this.movedThisTurn.has(a)).length,r=this.canCastSpells(e);i===0&&this.hasMovedThisTurn&&!r&&await this.gc._proceedToNextPlayerTurn()}else await this.gc._proceedToNextPlayerTurn()}}applyEarnedMana(){this.mana+=this.manaEarnedThisTurn,this.manaEarnedThisTurn=0}onTurnEnd(){this.hasMovedThisTurn=!1,this.movedThisTurn.clear(),this.cancelTargetSelection()}onLevelStart(){this.hasMovedThisTurn=!1,this.manaEarnedThisTurn=0,this.animatedDeadDiscs=[],this.movedThisTurn.clear(),this.cancelTargetSelection(),this.hideTargetSelectionPopup(),this.drainLifeActive=!1}onGameRestart(){this.mana=3,this.manaEarnedThisTurn=0,this.hasMovedThisTurn=!1,this.animatedDeadDiscs=[],this.movedThisTurn.clear(),this.cancelTargetSelection(),this.hideTargetSelectionPopup(),this.drainLifeActive=!1}}const Sl={type:"change"},eo={type:"start"},hc={type:"end"},Hs=new er,Tl=new Ve,Xg=Math.cos(70*Ra.DEG2RAD),_e=new A,Ne=2*Math.PI,re={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Gr=1e-6;class Yg extends Qu{constructor(t,e=null){super(t,e),this.state=re.NONE,this.target=new A,this.cursor=new A,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Ti.ROTATE,MIDDLE:Ti.DOLLY,RIGHT:Ti.PAN},this.touches={ONE:yi.ROTATE,TWO:yi.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new A,this._lastQuaternion=new tn,this._lastTargetPosition=new A,this._quat=new tn().setFromUnitVectors(t.up,new A(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Na,this._sphericalDelta=new Na,this._scale=1,this._panOffset=new A,this._rotateStart=new dt,this._rotateEnd=new dt,this._rotateDelta=new dt,this._panStart=new dt,this._panEnd=new dt,this._panDelta=new dt,this._dollyStart=new dt,this._dollyEnd=new dt,this._dollyDelta=new dt,this._dollyDirection=new A,this._mouse=new dt,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Kg.bind(this),this._onPointerDown=qg.bind(this),this._onPointerUp=Zg.bind(this),this._onContextMenu=n_.bind(this),this._onMouseWheel=Jg.bind(this),this._onKeyDown=Qg.bind(this),this._onTouchStart=t_.bind(this),this._onTouchMove=e_.bind(this),this._onMouseDown=jg.bind(this),this._onMouseMove=$g.bind(this),this._interceptControlDown=i_.bind(this),this._interceptControlUp=s_.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Sl),this.update(),this.state=re.NONE}update(t=null){const e=this.object.position;_e.copy(e).sub(this.target),_e.applyQuaternion(this._quat),this._spherical.setFromVector3(_e),this.autoRotate&&this.state===re.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,i=this.maxAzimuthAngle;isFinite(n)&&isFinite(i)&&(n<-Math.PI?n+=Ne:n>Math.PI&&(n-=Ne),i<-Math.PI?i+=Ne:i>Math.PI&&(i-=Ne),n<=i?this._spherical.theta=Math.max(n,Math.min(i,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+i)/2?Math.max(n,this._spherical.theta):Math.min(i,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(_e.setFromSpherical(this._spherical),_e.applyQuaternion(this._quatInverse),e.copy(this.target).add(_e),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){const o=_e.length();a=this._clampDistance(o*this._scale);const l=o-a;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){const o=new A(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;const c=new A(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(o),this.object.updateMatrixWorld(),a=_e.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(Hs.origin.copy(this.object.position),Hs.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Hs.direction))<Xg?this.object.lookAt(this.target):(Tl.setFromNormalAndCoplanarPoint(this.object.up,this.target),Hs.intersectPlane(Tl,this.target))))}else if(this.object.isOrthographicCamera){const a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Gr||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Gr||this._lastTargetPosition.distanceToSquared(this.target)>Gr?(this.dispatchEvent(Sl),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?Ne/60*this.autoRotateSpeed*t:Ne/60/60*this.autoRotateSpeed}_getZoomScale(t){const e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){_e.setFromMatrixColumn(e,0),_e.multiplyScalar(-t),this._panOffset.add(_e)}_panUp(t,e){this.screenSpacePanning===!0?_e.setFromMatrixColumn(e,1):(_e.setFromMatrixColumn(e,0),_e.crossVectors(this.object.up,_e)),_e.multiplyScalar(t),this._panOffset.add(_e)}_pan(t,e){const n=this.domElement;if(this.object.isPerspectiveCamera){const i=this.object.position;_e.copy(i).sub(this.target);let r=_e.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/n.clientHeight,this.object.matrix),this._panUp(2*e*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const n=this.domElement.getBoundingClientRect(),i=t-n.left,r=e-n.top,a=n.width,o=n.height;this._mouse.x=i/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(Ne*this._rotateDelta.x/e.clientHeight),this._rotateUp(Ne*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(Ne*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-Ne*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(Ne*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-Ne*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),i=.5*(t.pageY+e.y);this._rotateStart.set(n,i)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),i=.5*(t.pageY+e.y);this._panStart.set(n,i)}}_handleTouchStartDolly(t){const e=this._getSecondPointerPosition(t),n=t.pageX-e.x,i=t.pageY-e.y,r=Math.sqrt(n*n+i*i);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const n=this._getSecondPointerPosition(t),i=.5*(t.pageX+n.x),r=.5*(t.pageY+n.y);this._rotateEnd.set(i,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(Ne*this._rotateDelta.x/e.clientHeight),this._rotateUp(Ne*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),i=.5*(t.pageY+e.y);this._panEnd.set(n,i)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const e=this._getSecondPointerPosition(t),n=t.pageX-e.x,i=t.pageY-e.y,r=Math.sqrt(n*n+i*i);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const a=(t.pageX+e.x)*.5,o=(t.pageY+e.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new dt,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){const e=t.deltaMode,n={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}}function qg(s){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(s.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(s)&&(this._addPointer(s),s.pointerType==="touch"?this._onTouchStart(s):this._onMouseDown(s)))}function Kg(s){this.enabled!==!1&&(s.pointerType==="touch"?this._onTouchMove(s):this._onMouseMove(s))}function Zg(s){switch(this._removePointer(s),this._pointers.length){case 0:this.domElement.releasePointerCapture(s.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(hc),this.state=re.NONE;break;case 1:const t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function jg(s){let t;switch(s.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case Ti.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(s),this.state=re.DOLLY;break;case Ti.ROTATE:if(s.ctrlKey||s.metaKey||s.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(s),this.state=re.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(s),this.state=re.ROTATE}break;case Ti.PAN:if(s.ctrlKey||s.metaKey||s.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(s),this.state=re.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(s),this.state=re.PAN}break;default:this.state=re.NONE}this.state!==re.NONE&&this.dispatchEvent(eo)}function $g(s){switch(this.state){case re.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(s);break;case re.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(s);break;case re.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(s);break}}function Jg(s){this.enabled===!1||this.enableZoom===!1||this.state!==re.NONE||(s.preventDefault(),this.dispatchEvent(eo),this._handleMouseWheel(this._customWheelEvent(s)),this.dispatchEvent(hc))}function Qg(s){this.enabled!==!1&&this._handleKeyDown(s)}function t_(s){switch(this._trackPointer(s),this._pointers.length){case 1:switch(this.touches.ONE){case yi.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(s),this.state=re.TOUCH_ROTATE;break;case yi.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(s),this.state=re.TOUCH_PAN;break;default:this.state=re.NONE}break;case 2:switch(this.touches.TWO){case yi.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(s),this.state=re.TOUCH_DOLLY_PAN;break;case yi.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(s),this.state=re.TOUCH_DOLLY_ROTATE;break;default:this.state=re.NONE}break;default:this.state=re.NONE}this.state!==re.NONE&&this.dispatchEvent(eo)}function e_(s){switch(this._trackPointer(s),this.state){case re.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(s),this.update();break;case re.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(s),this.update();break;case re.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(s),this.update();break;case re.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(s),this.update();break;default:this.state=re.NONE}}function n_(s){this.enabled!==!1&&s.preventDefault()}function i_(s){s.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function s_(s){s.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}class r_{constructor(){this.camera=null,this.renderer=null,this.controls=null,this.initialCameraPosition=null,this.initialCameraZoom=null,this.initialControlsTarget=null,this.cameraRotationDirection=0,this.cameraRotationSpeed=Math.PI/135,this.panningKeys={up:!1,down:!1,left:!1,right:!1},this.panSpeed=.5,this._wallFadeRaycaster=null,this._wallFadeDir=null}init(){this.camera=new Ue(60,window.innerWidth/window.innerHeight,.1,1e3);const t=40,e=Math.PI/3,n=t*Math.sin(e),i=t*Math.cos(e);this.camera.position.set(0,n,i),this.camera.lookAt(0,0,0),this.initialCameraPosition=this.camera.position.clone(),this.initialCameraZoom=this.camera.zoom,this.initialControlsTarget=new A(0,0,0),this.renderer=new Fg({antialias:!0,alpha:!1}),this.renderer.localClippingEnabled=!0,this.renderer.setSize(window.innerWidth,window.innerHeight),document.body.appendChild(this.renderer.domElement),this._wallFadeRaycaster=new sc,this._wallFadeDir=new A,this.controls=new Yg(this.camera,this.renderer.domElement),this.controls.target.set(0,0,0),this.controls.update(),this.controls.minDistance=6,this.controls.maxDistance=45,this.controls.maxPolarAngle=Math.PI/2-25*Math.PI/180}update(t,e){if(this.controls&&this.controls.update(),this.cameraRotationDirection!==0&&this.controls&&this.controls.enabled){const n=new A().subVectors(this.controls.object.position,this.controls.target),i=new Na().setFromVector3(n);i.theta+=this.cameraRotationDirection*this.cameraRotationSpeed,i.makeSafe(),n.setFromSpherical(i),this.controls.object.position.copy(this.controls.target).add(n),this.controls.update()}if(this.panningKeys.up||this.panningKeys.down||this.panningKeys.left||this.panningKeys.right){const n=new A,i=new A;this.camera.getWorldDirection(n),n.y=0,n.normalize(),i.crossVectors(n,new A(0,1,0)),i.normalize();const r=new A;this.panningKeys.up&&r.add(n.clone().multiplyScalar(this.panSpeed)),this.panningKeys.down&&r.add(n.clone().multiplyScalar(-this.panSpeed)),this.panningKeys.left&&r.add(i.clone().multiplyScalar(-this.panSpeed)),this.panningKeys.right&&r.add(i.clone().multiplyScalar(this.panSpeed)),this.camera.position.add(r),this.controls.target.add(r),this.controls.update()}if(e&&this.controls){const n=this.controls.target,i=e.fieldWidth/2,r=e.fieldDepth/2,a=0;n.x=Ra.clamp(n.x,-i-a,i+a),n.z=Ra.clamp(n.z,-r-a,r+a)}e&&this._updateWallFade(e)}recenterCamera(){this.camera&&this.controls&&(this.camera.position.copy(this.initialCameraPosition),this.camera.zoom=this.initialCameraZoom,this.controls.target.copy(this.initialControlsTarget),this.camera.updateProjectionMatrix(),this.controls.update())}focusCameraOnDisc(t){t&&this.controls&&this.controls.target.copy(t.mesh.position)}setCameraRotation(t){this.cameraRotationDirection=t}setPanningState(t,e){t in this.panningKeys&&(this.panningKeys[t]=e)}onWindowResize(){this.renderer&&this.renderer.setSize(window.innerWidth,window.innerHeight),this.camera&&(this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.updateProjectionMatrix())}_updateWallFade(t){if(!t||!this.camera||!this.controls)return;const e=t.getVisualWalls();if(!e.length)return;this._wallFadeDir.subVectors(this.controls.target,this.camera.position).normalize(),this._wallFadeRaycaster.set(this.camera.position,this._wallFadeDir),this._wallFadeRaycaster.far=this.camera.position.distanceTo(this.controls.target);const n=new Set(this._wallFadeRaycaster.intersectObjects(e).map(d=>d.object)),i=this.camera.position,r=t.fieldWidth/2,a=t.fieldDepth/2,o=8,l=3,c=1.5,h=.6,u=1,f=80;for(const d of e){const g=d.position.x,_=d.position.z;let m=n.has(d)?1:0;if(Math.abs(_-a)<c){const M=i.z-a;m=Math.max(m,Math.max(0,Math.min(1,(M+o)/(o+l))))}if(Math.abs(_+a)<c){const M=-i.z-a;m=Math.max(m,Math.max(0,Math.min(1,(M+o)/(o+l))))}if(Math.abs(g-r)<c){const M=i.x-r;m=Math.max(m,Math.max(0,Math.min(1,(M+o)/(o+l))))}if(Math.abs(g+r)<c){const M=-i.x-r;m=Math.max(m,Math.max(0,Math.min(1,(M+o)/(o+l))))}const p=m>0?h:u,E=Array.isArray(d.material)?d.material:[d.material];for(const M of E)if(M.opacity!==void 0){M.transparent=!0;const x=p-M.opacity;M.opacity+=Math.sign(x)*Math.min(Math.abs(x),f*(1/60)),M.opacity=Math.max(0,Math.min(1,M.opacity))}}}}class a_{constructor(t){this.gc=t}async update(t){const e=this.gc;for(const i of[...e.discs])if(i.moving){if(i.updatePosition(),e.level&&(e.level.hexRings||e.level.donutRings)){const l=e.level.getTerrainSlopeForce(i.mesh.position.x,i.mesh.position.z);i.velocity.x+=l.fx,i.velocity.z+=l.fz}if(e.roundWon&&i.type==="player"&&i.kind!=="Orb"&&i.kind!=="HealingOrb"&&i.kind!=="AnimatedDead"&&e.level.checkPortalCollision(i.mesh.position.x,i.mesh.position.z,i.radius))return await e.startNextLevel(i),!0;i.handleWallCollision(e.level.fieldWidth,e.level.fieldDepth,.8)&&e.soundManager&&i.velocity.length()>.05&&e.soundManager.playBounce(i.mesh.position.clone()),e.level.getAllWalls().forEach(l=>{i.handleCollisionWithBox(l,.8)&&e.soundManager&&i.velocity.length()>.05&&e.soundManager.playBounce(i.mesh.position.clone())});for(const l of e.level.obstacles||[]){if(l.type!=="pillar"&&l.type!=="triangle")continue;const c=l.width/2,h=i.mesh.position.x-l.x,u=i.mesh.position.z-l.z,f=Math.sqrt(h*h+u*u),d=i.radius+c;if(f<d&&f>.001){const g=h/f,_=u/f;i.mesh.position.x=l.x+g*d,i.mesh.position.z=l.z+_*d;const m=i.velocity.x*g+i.velocity.z*_;m<0&&(i.velocity.x=(i.velocity.x-2*m*g)*.8,i.velocity.z=(i.velocity.z-2*m*_)*.8,e.soundManager&&i.velocity.length()>.05&&e.soundManager.playBounce(i.mesh.position.clone()))}}if(e.level&&e.level.circleRadius&&!e.level.hexRings){const l=e.level.circleRadius,c=i.mesh.position.x,h=i.mesh.position.z,u=Math.sqrt(c*c+h*h),f=l-i.radius;if(u>f&&u>.001){const d=c/u,g=h/u;i.mesh.position.x=d*f,i.mesh.position.z=g*f;const _=i.velocity.x*d+i.velocity.z*g;_>0&&(i.velocity.x=(i.velocity.x-2*_*d)*.8,i.velocity.z=(i.velocity.z-2*_*g)*.8,e.soundManager&&i.velocity.length()>.05&&e.soundManager.playBounce(i.mesh.position.clone()))}}if(e.level&&e.level.hexRings){const{RA_in:l}=e.level.hexRings,c=i.mesh.position.x,h=i.mesh.position.z,u=Math.sqrt(c*c+h*h),f=l-i.radius;if(u>f&&u>.001){const d=c/u,g=h/u;i.mesh.position.x=d*f,i.mesh.position.z=g*f;const _=i.velocity.x*d+i.velocity.z*g;_>0&&(i.velocity.x=(i.velocity.x-2*_*d)*.8,i.velocity.z=(i.velocity.z-2*_*g)*.8,e.soundManager&&i.velocity.length()>.05&&e.soundManager.playBounce(i.mesh.position.clone()))}}const o=i.kind==="Wizard"||i.kind==="Necromancer"?.92:.96;i.applyFriction(o)}if(e.level&&(e.level.hexRings||e.level.donutRings))for(const i of e.discs){const r=e.level.getTerrainHeightAt(i.mesh.position.x,i.mesh.position.z);i.mesh.position.y=r+i.basePositionY}const n=[...e.discs];for(let i=0;i<n.length;i++){const r=n[i];for(let a=i+1;a<n.length;a++){const o=n[a];if(r.kind==="Wizard"&&e.wizardController.orbs.includes(o)&&!o.moving||o.kind==="Wizard"&&e.wizardController.orbs.includes(r)&&!r.moving||r.kind==="Necromancer"&&e.necromancerController.animatedDeadDiscs.includes(o)&&!o.moving||o.kind==="Necromancer"&&e.necromancerController.animatedDeadDiscs.includes(r)&&!r.moving)continue;const l=r.kind==="Orb",c=o.kind==="Orb",h=l||r.kind==="HealingOrb",u=c||o.kind==="HealingOrb";if(l&&o.dead||c&&r.dead||h&&u||r.kind==="Orb"&&o.type==="player"||o.kind==="Orb"&&r.type==="player")continue;const f=r.mesh.position.clone().sub(o.mesh.position.clone()),d=f.length(),g=r.radius+o.radius;if(d<g&&d>0){if((r.kind==="HealingOrb"||o.kind==="HealingOrb")&&!r.dead&&!o.dead){const E=r.kind==="HealingOrb"?r:o,M=r.kind==="HealingOrb"?o:r;E.healedDiscs.has(M)||(M.restoreHealth(1),E.healedDiscs.add(M),e.updateDiscNames(),e.uiManager&&e.uiManager.updateCurrentTurnDiscName(e.currentDisc),e.currentDisc&&(r===e.currentDisc||o===e.currentDisc)&&(e.currentDisc.hasCausedDamage=!0));continue}const _=f.clone().divideScalar(d);_.y=0,_.normalize();const p=r.velocity.clone().sub(o.velocity).dot(_);if(p<=0){const E=-2*p/(1/r.mass+1/o.mass);if(r.velocity.add(_.clone().multiplyScalar(E/r.mass)),o.velocity.sub(_.clone().multiplyScalar(E/o.mass)),r.moving=!0,o.moving=!0,e.soundManager&&p<-.05){const w=r.mesh.position.clone().add(o.mesh.position).multiplyScalar(.5);e.soundManager.playDiscHit(w)}const M=r.mass+o.mass,x=g-d;if(r.mesh.position.add(_.clone().multiplyScalar(x*(o.mass/M))),o.mesh.position.sub(_.clone().multiplyScalar(x*(M===0?0:r.mass/M))),r.hitPoints>0&&o.hitPoints>0&&!r.dead&&!o.dead){if(r.kind==="AnimatedDead"&&!r.dead&&o.type==="NPC"&&!o.dead||o.kind==="AnimatedDead"&&!o.dead&&r.type==="NPC"&&!r.dead){const w=r.kind==="AnimatedDead"?r:o,b=r.kind==="AnimatedDead"?o:r;e.currentDisc===w?(b.takeHit(w.attackDamage,w),b.hitPoints<=0&&!e.npcsKilledForRageCharge.has(b.discName)&&(e.necromancerController.manaEarnedThisTurn+=1,e.npcsKilledForRageCharge.add(b.discName),e.necromancerController.updateActionButtons())):e.currentDisc===b&&w.takeHit(b.attackDamage,b)}else if(e.thrownDisc!==null&&(r.kind==="Orb"&&o.type==="NPC"||o.kind==="Orb"&&r.type==="NPC")){const w=r.kind==="Orb"?r:o,b=r.kind==="Orb"?o:r,R=e.currentDisc;b.takeHit(w.attackDamage,w),b.hitPoints<=0&&!e.npcsKilledForRageCharge.has(b.discName)&&(e.wizardController.manaEarnedThisTurn+=1,e.npcsKilledForRageCharge.add(b.discName),e.barbarianController.updateRageButtonVisibility(),e.wizardController.updateActionButtons()),w.takeHit(999,b),R&&(r===R||o===R)&&(R.hasCausedDamage=!0)}else if(e.thrownDisc!==null&&r===e.currentDisc){if(r.type==="player"&&o.type==="NPC"){if(r.canDoReboundDamage||!e.playerDamagedNPCsThisThrow.has(o.discName)){r.kind==="Barbarian"&&o.type==="NPC"&&o.hitPoints>0&&!o.dead&&e.barbarianController.uniqueNPCHitsThisThrow.add(o.discName);let w=r.attackDamage;if(r.kind==="Barbarian"){const b=e.barbarianController.uniqueNPCHitsThisThrow.size;w=r.rageWasUsedThisThrow?2+b:r.attackDamage+b}o.takeHit(w,r),o.hitPoints<=0&&!e.npcsKilledForRageCharge.has(o.discName)&&(r.kind==="Barbarian"?(e.barbarianController.rageCharges<e.barbarianController.maxRageChargesCap&&e.barbarianController.rageCharges++,r.rageWasUsedThisThrow&&(r.restoreHealth(1),e.updateDiscNames(),e.uiManager&&e.uiManager.updateCurrentTurnDiscName(e.currentDisc))):r.kind==="Wizard"?e.wizardController.manaEarnedThisTurn+=2:r.kind==="Orb"?e.wizardController.manaEarnedThisTurn+=1:r.kind==="Necromancer"&&(e.necromancerController.manaEarnedThisTurn+=2),e.npcsKilledForRageCharge.add(o.discName),e.barbarianController.updateRageButtonVisibility()),r.canDoReboundDamage||e.playerDamagedNPCsThisThrow.add(o.discName)}}else if(!(r.type==="NPC"&&o.type==="NPC")&&!(r.type==="player"&&o.type==="player")&&(!r.hasCausedDamage||r.canDoReboundDamage)){let w=r.attackDamage;if(r.kind==="Barbarian"){const b=e.barbarianController.uniqueNPCHitsThisThrow.size;w=r.rageWasUsedThisThrow?2+b:r.attackDamage+b}o.takeHit(w,r),r.hasCausedDamage=!0,r.type==="NPC"&&r.hitPoints<=0&&!e.npcsKilledForRageCharge.has(r.discName)&&(o.kind==="Wizard"?e.wizardController.manaEarnedThisTurn+=1:o.kind==="Necromancer"&&(e.necromancerController.manaEarnedThisTurn+=1),e.npcsKilledForRageCharge.add(r.discName),e.barbarianController.updateRageButtonVisibility(),e.wizardController.updateActionButtons(),e.necromancerController.updateActionButtons())}}else if(e.thrownDisc!==null&&o===e.currentDisc){if(o.type==="player"&&r.type==="NPC"){if(o.canDoReboundDamage||!e.playerDamagedNPCsThisThrow.has(r.discName)){o.kind==="Barbarian"&&r.type==="NPC"&&r.hitPoints>0&&!r.dead&&e.barbarianController.uniqueNPCHitsThisThrow.add(r.discName);let w=o.attackDamage;if(o.kind==="Barbarian"){const b=e.barbarianController.uniqueNPCHitsThisThrow.size;w=o.rageWasUsedThisThrow?2+b:o.attackDamage+b}r.takeHit(w,o),r.hitPoints<=0&&!e.npcsKilledForRageCharge.has(r.discName)&&(o.kind==="Barbarian"?(e.barbarianController.rageCharges<e.barbarianController.maxRageChargesCap&&e.barbarianController.rageCharges++,o.rageWasUsedThisThrow&&(o.restoreHealth(1),e.updateDiscNames(),e.uiManager&&e.uiManager.updateCurrentTurnDiscName(e.currentDisc))):o.kind==="Wizard"?e.wizardController.manaEarnedThisTurn+=2:o.kind==="Orb"?e.wizardController.manaEarnedThisTurn+=1:o.kind==="Necromancer"&&(e.necromancerController.manaEarnedThisTurn+=2),e.npcsKilledForRageCharge.add(r.discName),e.barbarianController.updateRageButtonVisibility()),o.canDoReboundDamage||e.playerDamagedNPCsThisThrow.add(r.discName)}}else if(!(o.type==="NPC"&&r.type==="NPC")&&!(o.type==="player"&&r.type==="player")&&(!o.hasCausedDamage||o.canDoReboundDamage)){let w=o.attackDamage;if(o.kind==="Barbarian"){const b=e.barbarianController.uniqueNPCHitsThisThrow.size;w=o.rageWasUsedThisThrow?2+b:o.attackDamage+b}r.takeHit(w,o),o.hasCausedDamage=!0,o.type==="NPC"&&o.hitPoints<=0&&!e.npcsKilledForRageCharge.has(o.discName)&&(r.kind==="Wizard"?e.wizardController.manaEarnedThisTurn+=1:r.kind==="Necromancer"&&(e.necromancerController.manaEarnedThisTurn+=1),e.npcsKilledForRageCharge.add(o.discName),e.barbarianController.updateRageButtonVisibility(),e.wizardController.updateActionButtons(),e.necromancerController.updateActionButtons())}}else if(e.thrownDisc!==null&&r.type==="NPC"&&o.type==="NPC"&&e.currentDisc&&e.currentDisc.type==="player"){const w=e.currentDisc;if(w.canDoReboundDamage||!e.playerDamagedNPCsThisThrow.has(r.discName)||!e.playerDamagedNPCsThisThrow.has(o.discName)){let b=w.attackDamage;if(w.kind==="Barbarian"){e.barbarianController.uniqueNPCHitsThisThrow.add(r.discName),e.barbarianController.uniqueNPCHitsThisThrow.add(o.discName);const R=e.barbarianController.uniqueNPCHitsThisThrow.size;b=w.rageWasUsedThisThrow?2+R:w.attackDamage+R}r.takeHit(b,w),o.takeHit(b,w),[r,o].forEach(R=>{R.hitPoints<=0&&!e.npcsKilledForRageCharge.has(R.discName)&&(w.kind==="Barbarian"?(e.barbarianController.rageCharges<e.barbarianController.maxRageChargesCap&&e.barbarianController.rageCharges++,w.rageWasUsedThisThrow&&(w.restoreHealth(1),e.updateDiscNames(),e.uiManager&&e.uiManager.updateCurrentTurnDiscName(e.currentDisc))):w.kind==="Wizard"?e.wizardController.manaEarnedThisTurn+=2:w.kind==="Orb"?e.wizardController.manaEarnedThisTurn+=1:w.kind==="Necromancer"&&(e.necromancerController.manaEarnedThisTurn+=2),e.npcsKilledForRageCharge.add(R.discName))}),e.barbarianController.updateRageButtonVisibility(),w.canDoReboundDamage||(e.playerDamagedNPCsThisThrow.add(r.discName),e.playerDamagedNPCsThisThrow.add(o.discName))}}}}}}}return!1}}class o_ extends Mn{constructor(t,e,n,i,r,a,o,l){super(1,.4,o,e,n,t,i,"NPC","Skeleton",2,r,"images/skeleton-nobg.png",!1,.5,.8,!1,!1,1,a,l)}}class l_ extends Mn{constructor(t,e,n,i,r,a,o,l){super(2.5,.4,o,e,n,t,i,"NPC","Warden",6,r,"images/warden-nobg.png",!1,2,6,!1,!1,2,a,l)}}const El=[15079755,3978315,16769305,33480,16089648,9510580,15741670,13825340,16432846,32896,14466815,11169320,16775880,8388608,11206595,8421376,16766900,128,8421504];class c_{constructor(t){this.gc=t}spawn(t=null){const e=this.gc,n=!!(e.level&&e.level.hexRings),i=!!(e.level&&e.level.bullseyeRings),r=!!(e.level&&e.level.donutRings),a=(F,$,ot=4)=>{let Dt=0;for(;Dt<100;){const Ut=(Math.random()-.5)*(e.level.fieldWidth-F*4),W=(Math.random()-.5)*(e.level.fieldDepth-F*4);if(e.isPositionValid(Ut,W,F)){let tt=!0;for(const et of $)if(Math.sqrt((Ut-et.x)**2+(W-et.z)**2)<ot){tt=!1;break}if(tt)return{x:Ut,z:W}}Dt++}return null},o=(F,$,ot=4)=>{const{RC_in:ft,RA_in:Dt}=e.level.hexRings,Ut=ft+1.5,W=Dt-2.5;for(let tt=0;tt<100;tt++){const et=Math.random()*Math.PI*2,K=Ut+Math.random()*(W-Ut),ct=Math.sin(et)*K,st=Math.cos(et)*K;if(!e.isPositionValid(ct,st,F))continue;let Z=!1;for(const ht of $)if(Math.sqrt((ct-ht.x)**2+(st-ht.z)**2)<ot){Z=!0;break}if(!Z)return{x:ct,z:st}}return null},l=(F,$,ot=4)=>{const{RING_INNER_R:ft,OUTER_R:Dt}=e.level.donutRings,Ut=ft+1.5,W=Dt-2.5;for(let tt=0;tt<100;tt++){const et=Math.random()*Math.PI*2,K=Ut+Math.random()*(W-Ut),ct=Math.sin(et)*K,st=Math.cos(et)*K;if(!e.isPositionValid(ct,st,F))continue;let Z=!1;for(const ht of $)if(Math.sqrt((ct-ht.x)**2+(st-ht.z)**2)<ot){Z=!0;break}if(!Z)return{x:ct,z:st}}return null},c=(F,$,ot,ft,Dt=4)=>{for(let Ut=0;Ut<100;Ut++){const W=Math.random()*Math.PI*2,tt=F+1.5+Math.random()*($-F-3),et=Math.sin(W)*tt,K=Math.cos(W)*tt;if(!e.isPositionValid(et,K,ot))continue;let ct=!1;for(const st of ft)if(Math.sqrt((et-st.x)**2+(K-st.z)**2)<Dt){ct=!0;break}if(!ct)return{x:et,z:K}}return null},h=6.5,u=[],f=F=>{const $=n?o(F,u,5):r?l(F,u,5):null;return $&&u.push($),$},d=f(1.25),g=f(.9),_=f(1),m=i?Math.sin(0)*h:d?d.x:0,p=i?Math.cos(0)*h:d?d.z:0,E=i?Math.sin(2*Math.PI/3)*h:g?g.x:0,M=i?Math.cos(2*Math.PI/3)*h:g?g.z:-3,x=i?Math.sin(-2*Math.PI/3)*h:_?_.x:-3,w=i?Math.cos(-2*Math.PI/3)*h:_?_.z:-3,b=new Set(e.selectedPlayerKinds||["Barbarian","Wizard","Necromancer"]);let R=null;b.has("Barbarian")&&(R=new Mn(1.25,.4,35071,m,p,e.scene,"Barbarian","player","Barbarian",5,100,"images/barbarian-nobg.png",!1,1.3,1.5,!1,!1,1,e,e.discDescriptions.Barbarian));const L=t==null?void 0:t.find(F=>F.kind==="Barbarian");R&&L&&(R.hitPoints=L.hitPoints,R.maxHitPoints=L.maxHitPoints);let S=null;b.has("Wizard")&&(S=new Mn(.9,.4,49344,E,M,e.scene,"Wizard","player","Wizard",3,100,"images/wizard-nobg.png",!1,.7,.8,!1,!1,1,e,e.discDescriptions.Wizard));const y=t==null?void 0:t.find(F=>F.kind==="Wizard");S&&y&&(S.hitPoints=y.hitPoints,S.maxHitPoints=y.maxHitPoints);let D=null;b.has("Necromancer")&&(D=new Mn(.9,.4,6684876,x,w,e.scene,"Necromancer","player","Necromancer",3,100,"images/necromancer-nobg.png",!1,.7,.8,!1,!1,1,e,e.discDescriptions.Necromancer));const B=t==null?void 0:t.find(F=>F.kind==="Necromancer");D&&B&&(D.hitPoints=B.hitPoints,D.maxHitPoints=B.maxHitPoints);const O=[R,S,D].filter(Boolean).map(F=>({x:F.mesh.position.x,z:F.mesh.position.z})),X=[{name:"Skeleton 1",skillLevel:80,kind:"Skeleton"},{name:"Skeleton 2",skillLevel:80,kind:"Skeleton"},{name:"Skeleton 3",skillLevel:80,kind:"Skeleton"},{name:"Skeleton 4",skillLevel:80,kind:"Skeleton"},{name:"Skeleton 5",skillLevel:80,kind:"Skeleton"},{name:"Skeleton 6",skillLevel:80,kind:"Skeleton"},{name:"Warden 1",skillLevel:85,kind:"Warden"},{name:"Warden 2",skillLevel:85,kind:"Warden"}].map((F,$)=>({...F,color:El[$%El.length]})),k=[];let Q=0;for(const F of X){let $;i?$=Q<4?c(8,16,1.5,O):c(16,22,1.5,O):n?$=o(1.5,O):r?$=l(1.5,O):$=a(1.5,O),Q++;const ot=$?$.x:(Math.random()-.5)*e.level.fieldWidth*.7,ft=$?$.z:(Math.random()-.5)*e.level.fieldDepth*.7,Dt=[e.scene,ot,ft,F.name,F.skillLevel,e,F.color];let Ut;F.kind==="Skeleton"?Ut=new o_(...Dt,e.discDescriptions.Skeleton):F.kind==="Warden"&&(Ut=new l_(...Dt,e.discDescriptions.Warden)),Ut&&k.push(Ut),O.push({x:ot,z:ft})}return[R,S,D].filter(Boolean).concat(k)}}class Wi{constructor({centerX:t,centerZ:e,baseRadius:n=5,numVertices:i=20,irregularity:r=.4,yPosition:a=.05,scrollSpeedX:o,scrollSpeedY:l}){this.centerX=t,this.centerZ=e,this.baseRadius=n,this.numVertices=Math.max(3,i),this.irregularity=Math.max(0,Math.min(1,r)),this.yPosition=a,this.relativeVertices2D=[],this.mesh=null,this.lavaTexture=null,this.scrollSpeedX=o!==void 0?o:(Math.random()-.5)*.04+.03,this.scrollSpeedY=l!==void 0?l:(Math.random()-.5)*.04+.02,this._generateShapeVertices(),this._createMesh()}_generateShapeVertices(){this.relativeVertices2D=[];const t=Math.PI*2,e=Math.random()*t,n=Math.random()*t,i=2+Math.random()*3,r=4+Math.random()*4;for(let a=0;a<this.numVertices;a++){const o=a/this.numVertices*t;let l=0;l+=Math.sin(o*i+e)*(this.baseRadius*this.irregularity*.6),l+=Math.sin(o*r+n)*(this.baseRadius*this.irregularity*.4);const c=this.baseRadius+l,h=c*Math.cos(o),u=c*Math.sin(o);this.relativeVertices2D.push({x:h,y:u})}}_createMesh(){if(this.relativeVertices2D.length<3){console.warn("LavaPool: Not enough vertices to create a shape.");return}const t=this.relativeVertices2D.map(o=>new dt(o.x,o.y)),e=new $l(t),n=new $a(e),i=new Ja;this.lavaTexture=i.load("images/lava-tile-1.png"),this.lavaTexture.wrapS=te,this.lavaTexture.wrapT=te,this.lavaTexture.offset.set(Math.random(),Math.random()),this.lavaTexture.rotation=Math.random()*Math.PI*2;const r=.25;this.lavaTexture.repeat.set(this.baseRadius*r,this.baseRadius*r);const a=new ve({map:this.lavaTexture,emissive:new Kt(16729344),emissiveMap:this.lavaTexture,emissiveIntensity:.5,side:le,transparent:!0,opacity:.95});this.mesh=new Et(n,a),this.mesh.position.set(this.centerX,this.yPosition,this.centerZ),this.mesh.rotation.x=-Math.PI/2,this.mesh.name="LavaPool"}update(t=.016){this.lavaTexture&&(this.lavaTexture.offset.x+=this.scrollSpeedX*t,this.lavaTexture.offset.y+=this.scrollSpeedY*t)}getMesh(){return this.mesh}isPointInside(t,e){if(!this.relativeVertices2D||this.relativeVertices2D.length<3)return!1;const n=t-this.centerX,i=-(e-this.centerZ);let r=!1,a=this.relativeVertices2D.length-1;for(let o=0;o<this.relativeVertices2D.length;o++){const l=this.relativeVertices2D[o],c=this.relativeVertices2D[a];l.y>i!=c.y>i&&n<(c.x-l.x)*(i-l.y)/(c.y-l.y)+l.x&&(r=!r),a=o}return r}dispose(){this.mesh&&(this.mesh.geometry&&this.mesh.geometry.dispose(),this.mesh.material&&(Array.isArray(this.mesh.material)?this.mesh.material:[this.mesh.material]).forEach(e=>{e.map&&e.map.dispose(),e.emissiveMap&&e.emissiveMap.dispose(),e.dispose()}),this.mesh=null,this.lavaTexture=null),this.relativeVertices2D=[]}}class h_{constructor(t){this.gc=t}generate(){const t=this.gc;if(!t.level||!t.scene){console.error("Level or scene not initialized. Cannot generate lava pools.");return}for(const a of t.lavaPools)a.getMesh()&&t.scene.remove(a.getMesh());if(t.lavaPools=[],t.level.hexRings){const{LOW_Y:a,MED_Y:o,RC_in:l,RA_in:c}=t.level.hexRings,h=new Wi({centerX:0,centerZ:0,baseRadius:3.8,numVertices:10,irregularity:.15,yPosition:a+.05});h.getMesh()&&(t.scene.add(h.getMesh()),t.lavaPools.push(h));const u=l+3,f=c-4,d=2+Math.floor(Math.random()*3),g=o+.05;for(let _=0;_<d;_++){let m=!1;for(let p=0;p<80&&!m;p++){const E=Math.random()*Math.PI*2,M=u+Math.random()*(f-u),x=Math.sin(E)*M,w=Math.cos(E)*M,b=1.5+Math.random()*1.5;let R=!1;for(const S of t.lavaPools){const y=x-S.centerX,D=w-S.centerZ;if(Math.sqrt(y*y+D*D)<b+S.baseRadius+3){R=!0;break}}if(R)continue;const L=new Wi({centerX:x,centerZ:w,baseRadius:b,numVertices:8+Math.floor(Math.random()*4),irregularity:.2+Math.random()*.2,yPosition:g});L.getMesh()&&(t.scene.add(L.getMesh()),t.lavaPools.push(L)),m=!0}}return}if(t.level.donutRings){const{PIT_R:a,PIT_Y:o,RING_INNER_R:l,OUTER_R:c}=t.level.donutRings,h=new Wi({centerX:0,centerZ:0,baseRadius:a-.3,numVertices:12,irregularity:.08,yPosition:o+.05});h.getMesh()&&(t.scene.add(h.getMesh()),t.lavaPools.push(h));const u=2+Math.floor(Math.random()*2),f=l+3.5,d=c-5.5;for(let g=0;g<u;g++){let _=!1;for(let m=0;m<80&&!_;m++){const p=Math.random()*Math.PI*2,E=f+Math.random()*(d-f),M=Math.sin(p)*E,x=Math.cos(p)*E,w=1.5+Math.random()*1.2;if(!this._isPositionValid(M,x,w))continue;const b=new Wi({centerX:M,centerZ:x,baseRadius:w,numVertices:8+Math.floor(Math.random()*4),irregularity:.2+Math.random()*.2,yPosition:.05});b.getMesh()&&(t.scene.add(b.getMesh()),t.lavaPools.push(b)),_=!0}}return}if(t.level.bullseyeRings)return;const e=Math.floor(Math.random()*2)+1,n=2,i=4,r=.05;for(let a=0;a<e;a++){const o=this._findValidPlacement(n,i);if(o){const l=new Wi({centerX:o.x,centerZ:o.z,baseRadius:o.radius,numVertices:12+Math.floor(Math.random()*5),irregularity:.1+Math.random()*.2,yPosition:r});l.getMesh()&&(t.scene.add(l.getMesh()),t.lavaPools.push(l))}else console.warn(`Could not find a valid placement for lava pool ${a+1} after several attempts.`)}}_findValidPlacement(t,e){const n=this.gc;for(let i=0;i<50;i++){const r=t+Math.random()*(e-t),a=r+1,o=(Math.random()-.5)*(n.level.fieldWidth-a*2),l=(Math.random()-.5)*(n.level.fieldDepth-a*2);if(this._isPositionValid(o,l,r))return{x:o,z:l,radius:r}}return null}_isPositionValid(t,e,n){const i=this.gc,r=[{x:t,z:e},{x:t+n,z:e},{x:t-n,z:e},{x:t,z:e+n},{x:t,z:e-n},{x:t+n*.707,z:e+n*.707},{x:t-n*.707,z:e+n*.707},{x:t+n*.707,z:e-n*.707},{x:t-n*.707,z:e-n*.707}];for(const a of r)if(!i.isPositionValid(a.x,a.z,.1))return!1;for(const a of i.discs){if(a.dead)continue;const o=(a.mesh.position.x-t)**2+(a.mesh.position.z-e)**2,l=n+a.radius+.5;if(o<l**2)return!1}for(const a of i.lavaPools){const o=(a.centerX-t)**2+(a.centerZ-e)**2,l=n+a.baseRadius+1;if(o<l**2)return!1}return!0}}const u_=""+new URL("necromancer drain 1-C3SAXx3T.mp3",import.meta.url).href,d_=""+new URL("necromancer drain 1-C3SAXx3T.mp3",import.meta.url).href,f_=""+new URL("necromancer drain 3-DQT-URF5.mp3",import.meta.url).href,p_=""+new URL("necromancer drain 4-B0EvbZsb.mp3",import.meta.url).href,m_=""+new URL("necromancer drain 5-nsp55ewO.mp3",import.meta.url).href,g_=""+new URL("necromancer drain 6-9MmBxBEO.mp3",import.meta.url).href,__=""+new URL("necromancer drain 7-4qvorQS2.mp3",import.meta.url).href,v_=Object.values([u_,d_,f_,p_,m_,g_,__]),x_=["magic-elements-vocal-breath-inhale-01.mp3","magic-elements-vocal-breath-inhale-02.mp3"],M_=["object-stone-hit-on-cement-floor-soft-01.mp3","object-stone-hit-on-cement-floor-soft-02.mp3","object-stone-hit-on-cement-floor-soft-03.mp3"],y_=["impact-wood-trunk-hit-01.mp3","impact-wood-trunk-hit-02.mp3","impact-wood-trunk-hit-03.mp3","impact-wood-trunk-hit-04.mp3","impact-wood-trunk-hit-05.mp3","impact-wood-trunk-hit-06.mp3","impact-wood-trunk-hit-07.mp3","impact-wood-trunk-hit-08.mp3","impact-wood-trunk-hit-09.mp3","impact-wood-trunk-hit-dull-01.mp3","impact-wood-trunk-hit-dull-02.mp3","impact-wood-trunk-hit-dull-03.mp3","object-wood-impact-flat-square-wood-clap-01.mp3","object-wood-impact-flat-square-wood-clap-03.mp3","object-wood-impact-flat-square-wood-clap-04.mp3","object-wood-impact-flat-square-wood-clap-05.mp3","object-wood-impact-flat-square-wood-clap-06.mp3"];class S_{constructor(t){this.gc=t,this.listener=null,this.woodHitBuffers=[],this.bounceBuffers=[],this.breathBuffers=[],this.buzzBuffer=null,this.rageBuffer=null,this.drainBuffers=[],this.tensionBuffer=null,this.doorUnlockBuffer=null,this.stoneSlideBuffer=null,this.wizardRadiusBlastBuffer=null,this.menuOpenBuffer=null,this.musicBuffer=null,this._musicAudio=null,this._musicPending=!1,this._musicLoopTimeout=null,this._loaded=!1,this._onReadyCallbacks=[]}whenReady(t){if(this._loaded){t();return}this._onReadyCallbacks.push(t)}init(){this.listener=new $u,this.gc.camera.add(this.listener);const t=new qu,e=d=>new Promise(g=>{t.load(d,_=>g(_),void 0,()=>g(null))}),n=y_.map(d=>e(`/sounds/wood/hits/${d}`)),i=M_.map(d=>e(`/sounds/bounce/${d}`)),r=x_.map(d=>e(`/sounds/breath/${d}`)),a=e("/sounds/buzz/character-highlight.mp3"),o=e("/sounds/energy/barbarian rage.mp3"),l=e("/sounds/tension/opening sound.mp3"),c=e("/sounds/doors/door-unlocking.mp3"),h=e("/sounds/stone/stone-slide-1.mp3"),u=e("/sounds/energy/wizard radius blast.mp3"),f=e("/sounds/menu/menu open.mp3");Promise.all([Promise.all(n),Promise.all(i),Promise.all(r),a,o,l,c,h,u,f]).then(([d,g,_,m,p,E,M,x,w,b])=>{this.woodHitBuffers=d.filter(Boolean),this.bounceBuffers=g.filter(Boolean),this.breathBuffers=_.filter(Boolean),this.buzzBuffer=m||null,this.rageBuffer=p||null,this.tensionBuffer=E||null,this.doorUnlockBuffer=M||null,this.stoneSlideBuffer=x||null,this.wizardRadiusBlastBuffer=w||null,this.menuOpenBuffer=b||null,this._loaded=!0,this._onReadyCallbacks.forEach(R=>R()),this._onReadyCallbacks=[]}),Promise.all(v_.map(d=>e(d))).then(d=>{this.drainBuffers=d.filter(Boolean)}),e("/sounds/atmosphere/background-loop.mp3").then(d=>{this.musicBuffer=d||null})}_play(t,e,n=1){if(!this._loaded||t.length===0)return;const i=this.listener.context;i.state==="suspended"&&i.resume();const r=t[Math.floor(Math.random()*t.length)],a=new ae;a.position.copy(e),this.gc.scene.add(a);const o=new Gn(this.listener);o.setBuffer(r),o.setRefDistance(20),o.setVolume(n),a.add(o),o.play(),o.onEnded=()=>{this.gc.scene.remove(a)}}playDiscHit(t){this._play(this.woodHitBuffers,t,.8)}playBounce(t){this._play(this.bounceBuffers,t,.35)}playBreath(t){this._play(this.breathBuffers,t,1)}playRage(t){if(!this._loaded||!this.rageBuffer)return;const e=this.listener.context;e.state==="suspended"&&e.resume();const n=new ae;n.position.copy(t),this.gc.scene.add(n);const i=new Gn(this.listener);i.setBuffer(this.rageBuffer),i.setRefDistance(20),i.setVolume(1),n.add(i),i.play(),i.onEnded=()=>{this.gc.scene.remove(n)}}playDrain(t){this._play(this.drainBuffers,t,1)}playTension(t,e){if(!this._loaded||!this.tensionBuffer){e&&e();return}const n=this.listener.context;n.state==="suspended"&&n.resume();const i=new ae;i.position.copy(t),this.gc.scene.add(i);const r=new Gn(this.listener);r.setBuffer(this.tensionBuffer),r.setRefDistance(20),r.setVolume(1),i.add(r),r.play(),r.onEnded=()=>{this.gc.scene.remove(i),e&&e()}}playBuzz(t){if(!this._loaded||!this.buzzBuffer)return;const e=this.listener.context;e.state==="suspended"&&e.resume();const n=new ae;n.position.copy(t),this.gc.scene.add(n);const i=new Gn(this.listener);i.setBuffer(this.buzzBuffer),i.setRefDistance(20),i.setVolume(1),n.add(i),i.play(),i.onEnded=()=>{this.gc.scene.remove(n)}}playDoorUnlock(t){if(!this._loaded||!this.doorUnlockBuffer)return;const e=this.listener.context;e.state==="suspended"&&e.resume();const n=new ae;n.position.copy(t),this.gc.scene.add(n);const i=new Gn(this.listener);i.setBuffer(this.doorUnlockBuffer),i.setRefDistance(20),i.setVolume(1),n.add(i),i.play(),i.onEnded=()=>{this.gc.scene.remove(n)}}playStoneSlide(t){if(!this._loaded||!this.stoneSlideBuffer)return;const e=this.listener.context;e.state==="suspended"&&e.resume();const n=new ae;n.position.copy(t),this.gc.scene.add(n);const i=new Gn(this.listener);i.setBuffer(this.stoneSlideBuffer),i.setRefDistance(20),i.setVolume(1),n.add(i),i.play(),i.onEnded=()=>{this.gc.scene.remove(n)}}playMenuOpen(){if(!this._loaded||!this.menuOpenBuffer)return;const t=this.listener.context;t.state==="suspended"&&t.resume();const e=new La(this.listener);e.setBuffer(this.menuOpenBuffer),e.setVolume(1),e.play()}playWizardRadiusBlast(t){if(!this._loaded||!this.wizardRadiusBlastBuffer)return;const e=this.listener.context;e.state==="suspended"&&e.resume();const n=new ae;n.position.copy(t),this.gc.scene.add(n);const i=new Gn(this.listener);i.setBuffer(this.wizardRadiusBlastBuffer),i.setRefDistance(20),i.setVolume(1),n.add(i),i.play(),i.onEnded=()=>{this.gc.scene.remove(n)}}startMusic(){if(!this._loaded||!this.musicBuffer){this._musicPending=!0;return}const t=this.listener.context;if(t.state==="suspended"){this._musicPending=!0,t.resume().then(()=>{this._musicPending&&this._playMusicNow()}).catch(()=>{});return}this._playMusicNow()}_playMusicNow(){this._musicPending=!1,!(this._musicAudio&&this._musicAudio.isPlaying)&&(this._musicAudio||(this._musicAudio=new La(this.listener)),this._musicAudio.setBuffer(this.musicBuffer),this._musicAudio.setVolume(.35),this._musicAudio.setLoop(!0),this._musicAudio.play())}notifyUserInteraction(){if(!this._musicPending||!this._loaded||!this.musicBuffer)return;this.listener.context.resume().then(()=>{this._musicPending&&this._playMusicNow()}).catch(()=>{})}}const T_=[{kind:"Barbarian",name:"Barbarian",image:"/images/barbarian-nobg.png",color:"#0088ff",hp:5,summary:"A heavy-hitting warrior who grows stronger with each kill.",skills:["Hits deal +1 damage per additional enemy struck in a single throw.","Rage: spend a charge to power up your next throw.","Earn Rage charges by killing enemies."]},{kind:"Wizard",name:"Wizard",image:"/images/wizard-nobg.png",color:"#00C0C0",hp:3,summary:"A nimble spellcaster who bends magic to their will.",skills:["Summon Orb (1 Mana): launch a volatile magical projectile.","Summon Healing Orb (1 Mana): a sphere that heals allies it touches.","Radius Blast (2 Mana): detonate all orbs in a shockwave.","Earn Mana from kills and clearing rooms."]},{kind:"Necromancer",name:"Necromancer",image:"/images/necromancer-nobg.png",color:"#9944EE",hp:3,summary:"A dark sorcerer who commands the dead.",skills:["Animate Dead (1 Mana): raise a fallen enemy as a minion.","Raise Dead (2 Mana): revive a fallen ally at half HP.","Earn Mana from kills and clearing rooms."]}];class bl{constructor(){this._resolve=null,this._selected=new Set,this._cards={},this._startButton=null,this._overlay=null}show(){return new Promise(t=>{this._resolve=t,this._buildUI()})}_buildUI(){const t=document.createElement("div");t.id="char-select-overlay",this._overlay=t;const e=document.createElement("h1");e.className="char-select-title",e.textContent="Choose Your Party",t.appendChild(e);const n=document.createElement("p");n.className="char-select-subtitle",n.textContent="Select 2 characters to adventure with",t.appendChild(n);const i=document.createElement("div");i.className="char-select-cards",t.appendChild(i);for(const a of T_){const o=this._buildCard(a);this._cards[a.kind]={el:o,data:a},i.appendChild(o)}const r=document.createElement("button");r.id="char-select-start-button",r.textContent="Start Game",r.disabled=!0,r.addEventListener("click",()=>this._onStartGame()),this._startButton=r,t.appendChild(r),document.body.appendChild(t)}_buildCard(t){const e=document.createElement("div");e.className="char-card",e.addEventListener("click",()=>this._onCardClick(t.kind));const n=document.createElement("div");n.className="char-card-image",t.kind==="Necromancer"&&(n.style.padding="0.2rem");const i=document.createElement("img");i.src=t.image,i.alt=t.name,n.appendChild(i),e.appendChild(n);const r=document.createElement("div");r.className="char-card-body";const a=document.createElement("div");a.className="char-card-name",a.textContent=t.name,a.style.color=t.color,r.appendChild(a);const o=document.createElement("div");o.className="char-card-hp",o.textContent=`HP: ${"❤️".repeat(t.hp)}`,r.appendChild(o);const l=document.createElement("div");l.className="char-card-summary",l.textContent=t.summary,r.appendChild(l);const c=document.createElement("ul");c.className="char-card-skills";for(const h of t.skills){const u=document.createElement("li");u.textContent=h,c.appendChild(u)}return r.appendChild(c),e.appendChild(r),e}_playMenuSound(){window.gameController&&window.gameController.soundManager&&window.gameController.soundManager.playMenuOpen()}_onCardClick(t){if(this._selected.has(t))this._selected.delete(t);else{if(this._selected.size>=2)return;this._selected.add(t)}this._playMenuSound(),this._refreshCards()}_refreshCards(){const t=this._selected.size>=2;for(const[n,{el:i,data:r}]of Object.entries(this._cards)){const a=this._selected.has(n),o=t&&!a;i.classList.toggle("selected",a),i.classList.toggle("disabled",o),a?(i.style.borderColor=r.color,i.style.boxShadow=`0 0 2rem ${r.color}88`):(i.style.borderColor="",i.style.boxShadow="")}const e=this._selected.size===2;this._startButton.disabled=!e,this._startButton.classList.toggle("active",e)}_onStartGame(){if(this._selected.size!==2)return;window.gameController&&window.gameController.soundManager&&window.gameController.soundManager.notifyUserInteraction(),this._playMenuSound(),this._overlay.classList.add("fading");let t=!1;const e=()=>{t||(t=!0,this._overlay.remove(),this._resolve([...this._selected]))};this._overlay.addEventListener("transitionend",e,{once:!0}),setTimeout(e,800)}}const E_={level_loaded:{title:"Welcome to Dungeon Flicker",body:"Drag from your disc to aim, then release to throw. Knock out every enemy to open the portal."},disc_clicked:{title:"Aim & Throw",body:"Click and drag from your disc to aim it. Release to throw — longer drag means a harder throw."},throw_made:{title:"Nice Throw!",body:"Hit enemies to deal damage. Hitting multiple enemies in one throw deals bonus damage with the Barbarian."},barbarian_rage_available:{title:"Rage Ready",body:"You earned a Rage charge. Activate it before throwing to power up your next attack."},character_used_barbarian:{title:"The Barbarian",body:"Deals 2 damage per hit, plus 1 extra for each additional enemy struck in a single throw. Kills earn Rage charges."},character_used_wizard:{title:"The Wizard",body:"Summon magical Orbs to fling at enemies. Earn Mana from kills and room clears. Use Radius Blast to detonate all orbs at once."},character_used_necromancer:{title:"The Necromancer",body:"Animate fallen enemies as minions (1 Mana) or revive fallen allies at half HP (2 Mana). Earn Mana from kills."},wizard_orb_summoned:{title:"Orb Summoned",body:"Aim and throw your Orb into enemies for damage. Orb kills earn Mana back."},wizard_healing_orb_summoned:{title:"Healing Orb Summoned",body:"Roll the Healing Orb through your allies — it restores 1 HP to every living disc it passes through."},wizard_radius_blast_used:{title:"Radius Blast!",body:"All active orbs detonated simultaneously, pushing and damaging every nearby enemy."},pc_disc_died:{title:"A Hero Fell",body:"One of your characters has died. A Necromancer can use Raise Dead (2 Mana) to revive fallen allies at half HP."},animate_dead_button_clicked:{title:"Animate Dead",body:"Click a fallen enemy corpse to reanimate it as your temporary minion — 1 HP, 1 damage."},animated_dead_kill:{title:"Minion Kill!",body:"Your animated minion took out an enemy. Minion kills count toward room clearing, and the corpse can be reanimated again."},drain_life_button_clicked:{title:"Drain Life",body:"At the end of your turn, 1 HP drains from every nearby enemy and transfers to you."},portal_door_opened:{title:"Room Cleared!",body:"All enemies are defeated. Click the glowing doorway to advance to the next room."}};class b_{constructor(){this._queue=[],this._currentIndex=0,this._area=null,this._build()}_build(){const t=document.createElement("div");t.id="notification-area",document.body.appendChild(t),this._area=t}push(t){const e=E_[t];e&&(this._queue.push({key:t,title:e.title,body:e.body}),this._currentIndex=this._queue.length-1,this._render())}_dismiss(){this._queue.length!==0&&(this._queue.splice(this._currentIndex,1),this._currentIndex=Math.min(this._currentIndex,Math.max(0,this._queue.length-1)),this._render())}_goTo(t){this._currentIndex=t,this._render()}_render(){if(!this._area||(this._area.innerHTML="",this._queue.length===0))return;const t=this._queue[this._currentIndex],e=this._queue.length,n=document.createElement("div");n.className="notification-card";const i=document.createElement("div");i.className="notification-header";const r=document.createElement("span");r.className="notification-title",r.textContent=t.title;const a=document.createElement("button");a.className="notification-dismiss",a.textContent="×",a.setAttribute("aria-label","Dismiss notification"),a.addEventListener("click",()=>this._dismiss()),i.appendChild(r),i.appendChild(a),n.appendChild(i);const o=document.createElement("div");if(o.className="notification-body",o.textContent=t.body,n.appendChild(o),e>1){const l=document.createElement("div");l.className="notification-dots";for(let c=0;c<e;c++){const h=document.createElement("button");h.className="notification-dot"+(c===this._currentIndex?" active":""),h.setAttribute("aria-label",`Go to notification ${c+1}`);const u=c;h.addEventListener("click",()=>this._goTo(u)),l.appendChild(h)}n.appendChild(l)}this._area.appendChild(n)}}let Wr=null;class uc{constructor(){if(Wr)return Wr;Wr=this,this.scene=null,this.camera=null,this.renderer=null,this.controls=null,this.level=null,this.discs=[],this.lavaPools=[],this.selectedPlayerKinds=null,this.currentTurnIndex=0,this._currentDisc=null,this._turnStartBeams=[],this._turnStartRings=[],this.raycaster=null,this.mouse=new dt,this.controlsEnabled=!0,this.pointerDisc=null,this.uiManager=null,this.inputHandler=null,this.fpsFrameCount=0,this.fpsLastTime=performance.now(),this.fpsLastUpdateTime=performance.now(),this.fpsUpdateInterval=1e3,this.throwDirectionLine=null,this._prevLineStart=null,this._prevLineEnd=null,this._ringStepDiscData=null,this.waitingForDiscToStop=!1,this.playerDamagedNPCsThisThrow=new Set,this.npcsKilledForRageCharge=new Set,this.gameOverState={active:!1,playerWon:!1},this.roundWon=!1,this.thrownDisc=null,this.barbarianController=new Vg(this),this.wizardController=new Gg(this),this.necromancerController=new Wg(this),this.cameraController=new r_,this.physics=new a_(this),this.discSpawner=new c_(this),this.lavaManager=new h_(this),this.soundManager=new S_(this),this.discInfoPopupElement=null,this.discInfoNameElement=null,this.discInfoHpElement=null,this.discInfoDescriptionElement=null,this.discInfoPopupSelectedDisc=null,this.discDescriptions={Barbarian:"Deals 2 damage per hit, plus 1 extra per enemy hit on the same throw. Kills grant Rage, boosting base damage and adding rebound damage.",Wizard:"Summon orbs with Mana. Costs 1 Mana per orb. Kills with orbs or bumps earn Mana back. Clearing rooms grants Mana.",Necromancer:"Spend Mana to Animate Dead NPCs (1 mana) — they deal 1 damage and have 1 HP. Raise Dead allies for 2 mana, reviving them at half HP. Earn mana from kills and clearing rooms.",Skeleton:"Just your basic walking skeleton. Does 1 damage per hit.",Warden:"Hard to move, and hard to kill. Hits for 2 base damage.",Orb:"A volatile sphere of magical energy, summoned by the Wizard.",HealingOrb:"A red sphere of restorative energy. Heals 1 HP to every living disc it passes through.",AnimatedDead:"A reanimated corpse under the Necromancer's command. 1 HP, 1 damage."},window.addEventListener("resize",()=>this.onWindowResize()),this.animate=this.animate.bind(this),this.animate()}get currentDisc(){return this._currentDisc}set currentDisc(t){this.discs.forEach(e=>{e.setSpotlightIntensity(e===t)}),this._currentDisc=t,this.uiManager&&(this.uiManager.updateCurrentTurnDiscName(this._currentDisc),this.uiManager.updateDiscNames(this.discs,this._currentDisc))}logCurrentTurn(){}recenterCamera(){this.cameraController.recenterCamera()}focusCameraOnDisc(t){const e=this.discs.find(n=>n.discName===t);e&&this.cameraController.focusCameraOnDisc(e)}async init(){this.scene=new $h,this.cameraController.init(),this.camera=this.cameraController.camera,this.renderer=this.cameraController.renderer,this.controls=this.cameraController.controls,this.soundManager.init(),this.soundManager.whenReady(()=>{this.soundManager.startMusic()}),this.currentLevelNumber=1,this.level=new Bg(this.scene),this.level.nextShape=this._shapeForLevel(this.currentLevelNumber),this.level.load(),this.discs=[],this.currentTurnIndex=0,this.raycaster=new sc,this.mouse=new dt,this.controlsEnabled=!0,this.pointerDisc=null,this.uiManager=new kg(this.restartGame.bind(this),this.recenterCamera.bind(this),this.focusCameraOnDisc.bind(this),this.restartLevel.bind(this)),this.uiManager._menuSoundCallback=()=>this.soundManager.playMenuOpen(),this.notificationManager=new b_,Pe.addListener(r=>this.notificationManager.push(r)),this.actionButtonsContainer=this.uiManager.getActionButtonsContainer(),this.actionButtonsContainer||console.error("GameController: Action buttons container not found from UIManager.");const t=new Xl({color:16777215,linewidth:2,depthTest:!1}),e=new Float32Array(6),n=new Te;n.setAttribute("position",new xe(e,3)),n.setDrawRange(0,2),this.throwDirectionLine=new tu(n,t),this.throwDirectionLine.renderOrder=999,this.throwDirectionLine.frustumCulled=!1,this.throwDirectionLine.visible=!1,this.scene.add(this.throwDirectionLine),this.inputHandler=new zg(this.renderer.domElement,this,this.uiManager),this.discInfoPopupElement=document.getElementById("disc-info-popup"),this.discInfoPopupElement?(this.discInfoNameElement=this.discInfoPopupElement.querySelector(".name"),this.discInfoHpElement=this.discInfoPopupElement.querySelector(".hp"),this.discInfoDescriptionElement=this.discInfoPopupElement.querySelector(".description")):console.error("Disc info popup element not found in DOM.");const i=new bl;this.selectedPlayerKinds=await i.show(),this.lavaManager.generate(),this.initDiscs(),this.barbarianController.init(this.actionButtonsContainer),this.wizardController.init(this.actionButtonsContainer),this.necromancerController.init(this.actionButtonsContainer),this.lavaManager.generate(),this.updateDiscNames()}isPositionValid(t,e,n,i=!1,r=[]){if(!this.level.isPositionValid(t,e,n))return!1;for(const o of this.lavaPools||[]){const l=t-o.centerX,c=e-o.centerZ,h=o.baseRadius+n+.5;if(l*l+c*c<h*h)return!1}if(i&&this.discs)for(const o of this.discs){if(!o||o.dead||o.hitPoints<=0||r.includes(o))continue;const l=t-o.mesh.position.x,c=e-o.mesh.position.z,h=l*l+c*c,u=n+o.radius;if(h<u*u)return!1}return!0}initDiscs(t=null){t||(this.barbarianController.rageCharges=0,this.npcsKilledForRageCharge.clear()),Pe.track("level_loaded");const e=this.discSpawner.spawn(t);if(this.discs.push(...e),this.discs.forEach(n=>{n.type==="player"&&n.kind!=="Orb"&&n.kind!=="HealingOrb"&&n.kind!=="AnimatedDead"&&Pe.track(`character_used_${n.kind.toLowerCase()}`)}),this.updateAllDiscDeadStates(),this.discs.forEach(n=>{n.setSpotlightIntensity(!1)}),this.currentTurnIndex=this.discs.findIndex(n=>n.type==="player"&&n.kind!=="Orb"&&n.kind!=="HealingOrb"&&n.kind!=="AnimatedDead"&&n.hitPoints>0&&!n.dead),this.currentTurnIndex!==-1)this.currentDisc=this.discs[this.currentTurnIndex],this.logCurrentTurn();else for(let n=0;n<this.discs.length;n++)if(this.discs[n].hitPoints>0&&!this.discs[n].dead){this.currentTurnIndex=n,this.currentDisc=this.discs[n],this.logCurrentTurn();break}if(this.barbarianController.updateRageButtonVisibility(),this.barbarianController.updateEndTurnButtonVisibility(),this.wizardController.updateActionButtons(),this.wizardController.updateEndTurnButtonVisibility(),this.necromancerController.updateActionButtons(),this.necromancerController.updateEndTurnButtonVisibility(),this.currentDisc&&this.currentDisc.type==="player"){const n=this.currentDisc;t?setTimeout(()=>{this.currentDisc===n&&(this._spawnTurnStartBeam(n),this._spawnTurnStartRings(n),this.soundManager&&this.soundManager.playBuzz(n.mesh.position.clone()))},1e3):(this.soundManager.whenReady(()=>{this.soundManager.playTension(n.mesh.position.clone())}),setTimeout(()=>{this.uiManager&&this.uiManager.dissolveBlackOverlay()},4e3),setTimeout(()=>{this.currentDisc===n&&(this._spawnTurnStartBeam(n),this._spawnTurnStartRings(n),this.soundManager&&this.soundManager.playBuzz(n.mesh.position.clone()))},7e3))}}handlePointerHover(t){if(this.necromancerController.handlePointerHover(t),this.level&&this.level.doorIsOpen&&this.level.doorFrameMeshes.length){this.mouse.x=t.clientX/window.innerWidth*2-1,this.mouse.y=-(t.clientY/window.innerHeight)*2+1,this.raycaster.setFromCamera(this.mouse,this.camera);const n=this.raycaster.intersectObjects(this.level.doorFrameMeshes,!1).length>0;this.level.setDoorHovered(n),this.renderer.domElement.style.cursor=n?"pointer":""}else this.level&&this.level.setDoorHovered(!1)}handlePointerDownInteraction(t,e){if(this.gameOverState.active)return;if(this.soundManager&&this.soundManager.notifyUserInteraction(),this.mouse.x=t.clientX/window.innerWidth*2-1,this.mouse.y=-(t.clientY/window.innerHeight)*2+1,this.raycaster.setFromCamera(this.mouse,this.camera),this.roundWon&&this.level&&this.level.doorIsOpen&&this.level.doorFrameMeshes.length&&this.raycaster.intersectObjects(this.level.doorFrameMeshes,!1).length>0){this.startNextLevel(this.currentDisc);return}this.pointerDisc=null;for(const a of this.discs)if(this.raycaster.intersectObject(a.mesh,!0).length>0){this.pointerDisc=a,Pe.track("disc_clicked");break}const n=this.currentTurnIndex!==-1&&this.discs.length>this.currentTurnIndex?this.discs[this.currentTurnIndex]:null;let i=!1,r=null;n&&n.type==="player"&&!n.dead?n.kind==="Wizard"?this.pointerDisc&&(this.pointerDisc.kind==="Orb"||this.pointerDisc.kind==="HealingOrb")&&this.wizardController.orbs.includes(this.pointerDisc)&&!this.pointerDisc.dead?(r=this.pointerDisc,i=!0):this.pointerDisc===n?(r=n,this.wizardController.hasMovedThisTurn?i=!1:i=!0):(r=n,i=!1):n.kind==="Necromancer"?this.pointerDisc&&this.pointerDisc.kind==="AnimatedDead"&&this.necromancerController.animatedDeadDiscs.includes(this.pointerDisc)&&!this.pointerDisc.dead&&!this.necromancerController.movedThisTurn.has(this.pointerDisc)?(r=this.pointerDisc,i=!0):this.pointerDisc===n?(r=n,this.necromancerController.hasMovedThisTurn?i=!1:i=!0):(r=n,i=!1):this.pointerDisc===n?(r=n,n.hasThrown?i=!1:i=!0):(r=n,i=!1):(r=n,i=!1),this.currentDisc=r,i&&this.currentDisc&&this.currentDisc.mesh?(this.controlsEnabled=!1,this.controls.enabled=!1,this.uiManager&&this.uiManager.updateThrowInfo("Magnitude: 0 Angle: 0°",!0),this.throwDirectionLine&&(this._prevLineStart=new A(this.currentDisc.mesh.position.x,this.currentDisc.mesh.position.y+this.currentDisc.height/2,this.currentDisc.mesh.position.z),this._prevLineEnd=this._prevLineStart.clone())):(this.controlsEnabled=!0,this.controls.enabled=!0,this.uiManager&&this.uiManager.updateThrowInfo("",!1)),this._updateSpotlights()}handlePointerMoveInteraction(t,e){if(this.gameOverState.active||this.controlsEnabled||!this.currentDisc){this.throwDirectionLine&&(this.throwDirectionLine.visible=!1),this.uiManager&&this.uiManager.updateThrowInfo("",!1);return}const n=t.clientX-e.x,i=t.clientY-e.y,r=Math.sqrt(n*n+i*i);if(r>0){let o=Math.atan2(-i,n)*(180/Math.PI);if(o<0&&(o+=360),this.uiManager&&this.uiManager.updateThrowInfo(`Magnitude: ${r.toFixed(1)} Angle: ${o.toFixed(1)}°`,!0),!this.controlsEnabled&&this.currentDisc&&this.currentDisc.mesh&&this.throwDirectionLine){const l=n/r,c=i/r,h=new A;this.camera.getWorldDirection(h),h.y=0,h.normalize();const u=new A(0,1,0),f=new A;f.crossVectors(h,u).normalize();let d=new A;d.add(f.multiplyScalar(l)),d.add(h.multiplyScalar(-c)),d.normalize(),d.negate();const _=Math.min(r/10,1)*10,m=this.currentDisc.mesh.position.clone(),p=m.clone().add(d.multiplyScalar(_)),E=this.throwDirectionLine.geometry.attributes.position;this._prevLineStart||(this._prevLineStart=new A(m.x,m.y+this.currentDisc.height/2,m.z)),this._prevLineEnd||(this._prevLineEnd=new A(p.x,p.y+this.currentDisc.height/2,p.z)),this._prevLineStart.lerp(new A(m.x,m.y+this.currentDisc.height/2,m.z),.2),this._prevLineEnd.lerp(new A(p.x,p.y+this.currentDisc.height/2,p.z),.2),E.setXYZ(0,this._prevLineStart.x,this._prevLineStart.y,this._prevLineStart.z),E.setXYZ(1,this._prevLineEnd.x,this._prevLineEnd.y,this._prevLineEnd.z),E.needsUpdate=!0,this.throwDirectionLine.visible=!0}}else this.uiManager&&this.uiManager.updateThrowInfo("Magnitude: 0 Angle: 0°",!0),this.throwDirectionLine&&(this.throwDirectionLine.visible=!1)}handlePointerUpInteraction(t,e){if(this.gameOverState.active)return;const n=t.clientX-e.x,i=t.clientY-e.y,r=Math.sqrt(n*n+i*i),a=2,o=this.pointerDisc;if(r<=a){if(this.necromancerController.selectingTarget){this.necromancerController.handleTargetClick(o),this.necromancerController.cancelTargetSelection(),this.throwDirectionLine&&(this.throwDirectionLine.visible=!1),this.controls.enabled=!0,this.controlsEnabled=!0;return}if(o){this.discInfoPopupSelectedDisc===o?this._hideDiscInfoPopup():this._showDiscInfoPopup(o),this.uiManager&&this.uiManager.updateThrowInfo("",!1),this.throwDirectionLine&&(this.throwDirectionLine.visible=!1),this.controls.enabled=!0,this.controlsEnabled=!0;return}else if(this.discInfoPopupSelectedDisc&&this.discInfoPopupElement){let l=t.target,c=!1;for(;l!=null;){if(l===this.discInfoPopupElement){c=!0;break}l=l.parentElement}c||this._hideDiscInfoPopup()}}if(this.uiManager&&this.uiManager.updateThrowInfo("",!1),this.throwDirectionLine&&(this.throwDirectionLine.visible=!1),this.controlsEnabled||!this.currentDisc){this.controls.enabled=!0,this.controlsEnabled=!0,this.throwDirectionLine&&(this.throwDirectionLine.visible=!1),this.uiManager&&this.uiManager.updateThrowInfo("",!1);return}if(this.controls.enabled=!0,this.controlsEnabled=!0,!this.waitingForDiscToStop&&!(this.level&&this.level.ringsAnimating)&&this.currentDisc){if(this.currentDisc.dead||this.currentDisc.hasThrown&&this.currentDisc.moving||this.currentDisc.type!=="player")return;const l=t.clientX-e.x,c=t.clientY-e.y,h=Math.sqrt(l*l+c*c),u=this.controls.getDistance(),f=h*u,d=10,g=.004,_=.05;if(f>d){const m=f*g,p=l/h,E=c/h,M=new A;this.camera.getWorldDirection(M),M.y=0,M.normalize();const x=new A(0,1,0),w=new A;w.crossVectors(M,x).normalize();let b=new A;b.add(w.multiplyScalar(p)),b.add(M.multiplyScalar(-E)),b.normalize(),b.negate();const R=b.x,L=b.z;let S=this.currentDisc.throwPowerMultiplier;this.currentDisc.rageIsActiveForNextThrow&&(S*=2.5,this.currentDisc.rageIsActiveForNextThrow=!1,this.currentDisc.kind!=="Orb"?(this.currentDisc.canDoReboundDamage=!0,this.currentDisc.rageWasUsedThisThrow=!0):(this.currentDisc.canDoReboundDamage=!1,this.currentDisc.rageWasUsedThisThrow=!1),this.barbarianController.updateRageButtonVisibility());const y=1;let D=m*S/this.currentDisc.mass;D=Math.min(D,y),D<_&&(D=_),this.currentDisc.kind==="Barbarian"&&this.barbarianController.uniqueNPCHitsThisThrow.clear(),this.currentDisc.velocity.set(R*D,0,L*D),this.currentDisc.moving=!0,this.currentDisc.hasThrown=!0,this.currentDisc.resetDamageState(),this.thrownDisc=this.currentDisc,Pe.track("throw_made"),this.playerDamagedNPCsThisThrow.clear(),this.waitingForDiscToStop=!0}}}setPanningState(t,e){this.cameraController.setPanningState(t,e)}cancelAiming(){this.necromancerController.cancelTargetSelection(),this.pointerDisc=null,this.currentDisc=null,this.controls&&(this.controls.enabled=!0),this.throwDirectionLine&&(this.throwDirectionLine.visible=!1),this.uiManager&&this.uiManager.updateThrowInfo("",!1),this.controlsEnabled=!0}onWindowResize(){this.cameraController.onWindowResize(),this.level&&this.discs.forEach(t=>{t.mesh.position.x=this.clamp(t.mesh.position.x,-this.level.fieldWidth/2+t.radius,this.level.fieldWidth/2-t.radius),t.mesh.position.z=this.clamp(t.mesh.position.z,-this.level.fieldDepth/2+t.radius,this.level.fieldDepth/2-t.radius)})}clamp(t,e,n){return Math.max(e,Math.min(n,t))}updateAllDiscDeadStates(){!this.discs||this.discs.length===0||this.discs.forEach(t=>{t.hitPoints<=0&&!t.dead&&(t.type==="player"&&t.kind!=="Orb"&&t.kind!=="HealingOrb"&&t.kind!=="AnimatedDead"&&Pe.track("pc_disc_died"),t.type!=="player"&&this.thrownDisc&&this.thrownDisc.kind==="AnimatedDead"&&Pe.track("animated_dead_kill"),t.die(),t.kind==="AnimatedDead"&&this.necromancerController&&this.necromancerController.removeAnimatedDead(t),t.kind==="Necromancer"&&this.necromancerController&&[...this.necromancerController.animatedDeadDiscs].forEach(e=>{e.dead||(e.hitPoints=0,e.die())}))})}checkGameOverConditions(){if(this.gameOverState.active||!this.discs||this.discs.length===0)return this.gameOverState.active;this.updateAllDiscDeadStates();let t=0,e=0,n=!1,i=!1;if(this.discs.forEach(r=>{r.type==="player"&&r.kind!=="Orb"&&r.kind!=="HealingOrb"&&r.kind!=="AnimatedDead"?(n=!0,r.dead||t++):r.type==="NPC"&&(i=!0,!r.dead&&!r.isAnimatedDead&&e++)}),n&&t===0)return this.triggerGameOver(!1),!0;if(i&&e===0&&t>0&&!this.roundWon){this.roundWon=!0;const r=this.wizardController.getDisc();r&&!r.dead&&(this.wizardController.mana+=2);const a=this.necromancerController.getDisc();a&&!a.dead&&(this.necromancerController.mana+=2,this.uiManager&&this.uiManager.updateCurrentTurnDiscName(this.currentDisc)),this.level&&setTimeout(()=>{if(this.soundManager){const o=this.level._doorOpeningCenter,l=o?new A(o.x,0,o.z):new A;this.soundManager.playDoorUnlock(l)}Pe.track("portal_door_opened"),this.level.openDoor()},1500)}return!1}triggerGameOver(t){this.gameOverState.active||(this.gameOverState.active=!0,this.gameOverState.playerWon=t,this.uiManager&&this.uiManager.showGameOver(t))}_shapeForLevel(t){const e=["bullseye","donut","rect","circle"];return e[(t-1)%e.length]}async startNextLevel(t=null){const e=this.discs.filter(r=>r.type==="player"&&r.kind!=="Orb").map(r=>({kind:r.kind,hitPoints:r.hitPoints,maxHitPoints:r.maxHitPoints})),n=this.currentTurnIndex;this.roundWon=!1,this.gameOverState.active=!1,this.gameOverState.playerWon=!1,this.npcsKilledForRageCharge.clear(),this.lavaPools&&this.lavaPools.length>0&&this.lavaPools.forEach(r=>{r.getMesh()&&this.scene.remove(r.getMesh()),r.dispose()}),this.lavaPools=[],this._clearTurnStartBeams(),this._clearTurnStartRings(),this._ringStepDiscData=null,this.level&&this.level.unload(),this.discs&&this.discs.forEach(r=>r.dispose()),this.discs=[],this.wizardController.onLevelStart(),this.necromancerController.onLevelStart(),this.barbarianController.onLevelStart(),this.level&&(this.currentLevelNumber++,this.level.nextShape=this._shapeForLevel(this.currentLevelNumber),this.level.load()),this.lavaManager.generate(),this.initDiscs(e),this.wizardController.onTurnEnd(),this.necromancerController.onTurnEnd(),this.waitingForDiscToStop=!1,this.thrownDisc=null,this.playerDamagedNPCsThisThrow.clear();let i=!1;if(t){let r=t.kind;r==="HealingOrb"&&(r="Wizard");const a=this.discs.findIndex(o=>o.kind===r&&o.type==="player"&&!o.dead);a!==-1&&(this.currentTurnIndex=a,i=!0)}if(!i){let r=(n+1)%this.discs.length;for(let a=0;a<this.discs.length;a++){const o=(r+a)%this.discs.length,l=this.discs[o];if(l&&l.type==="player"&&l.kind!=="Orb"&&l.kind!=="HealingOrb"&&l.kind!=="AnimatedDead"&&!l.dead){this.currentTurnIndex=o,i=!0;break}}}if(!i){const r=this.discs.findIndex(a=>a.type==="player"&&a.kind!=="Orb"&&a.kind!=="HealingOrb"&&a.kind!=="AnimatedDead"&&!a.dead);this.currentTurnIndex=r!==-1?r:0}this.discs.forEach(r=>{r.type==="player"&&(r.hasThrown=!1)}),this.currentDisc=this.discs[this.currentTurnIndex],this._updateSpotlights(),this.logCurrentTurn(),this.recenterCamera(),this.uiManager&&(this.uiManager.hideGameOver(),this.updateDiscNames(),this.uiManager.updateCurrentTurnDiscName(this.currentDisc),this.barbarianController.updateRageButtonVisibility(),this.barbarianController.updateEndTurnButtonVisibility(),this.wizardController.updateActionButtons(),this.wizardController.updateEndTurnButtonVisibility(),this.necromancerController.updateActionButtons(),this.necromancerController.updateEndTurnButtonVisibility(),this.necromancerController.cancelTargetSelection(),this.necromancerController.hideTargetSelectionPopup()),this.soundManager&&this.soundManager.playTension(this.currentDisc.mesh.position.clone())}async restartLevel(){if(this.cancelAiming(),this.inputHandler&&this.inputHandler.reset(),this.discs&&this.discs.length>0&&this.discs.forEach(t=>t.dispose()),this.discs=[],this.wizardController.onGameRestart(),this.necromancerController.onGameRestart(),this.barbarianController.onGameRestart(),this.lavaPools&&this.lavaPools.length>0&&this.lavaPools.forEach(t=>{t.getMesh()&&this.scene.remove(t.getMesh()),t.dispose()}),this.lavaPools=[],this._clearTurnStartBeams(),this._clearTurnStartRings(),this._ringStepDiscData=null,this.level)this.level.unload(),this.level.nextShape=this._shapeForLevel(this.currentLevelNumber),this.level.load();else return;if(this.lavaManager.generate(),this.initDiscs(),this.currentTurnIndex=0,this._currentDisc=null,this.waitingForDiscToStop=!1,this.playerDamagedNPCsThisThrow.clear(),this.npcsKilledForRageCharge.clear(),this.gameOverState.active=!1,this.roundWon=!1,this.panningKeys={up:!1,down:!1,left:!1,right:!1},this.discs.length>0){let t=this.discs.find(e=>e.type==="player");t||(t=this.discs[0]),this.currentTurnIndex=this.discs.indexOf(t),this.currentTurnIndex===-1&&(this.currentTurnIndex=0),this.currentDisc=this.discs[this.currentTurnIndex],this.discs[this.currentTurnIndex].hasThrown=!1,this.currentDisc.type==="NPC"&&await this.aiThrow(this.currentDisc)}this.updateDiscNames(),this._hideDiscInfoPopup(),this.barbarianController.updateRageButtonVisibility(),this.barbarianController.updateEndTurnButtonVisibility(),this.wizardController.updateActionButtons(),this.wizardController.updateEndTurnButtonVisibility(),this.necromancerController.updateActionButtons(),this.necromancerController.updateEndTurnButtonVisibility(),this.necromancerController.cancelTargetSelection(),this.necromancerController.hideTargetSelectionPopup(),this.recenterCamera(),this.controls&&(this.controls.enabled=!0),this.controlsEnabled=!0,this._prevLineStart=null,this._prevLineEnd=null}async restartGame(){this.cancelAiming(),this.inputHandler&&this.inputHandler.reset();const t=document.getElementById("black-overlay");t&&(t.style.transition="none",t.style.opacity="1",t.style.display="",t.offsetHeight,t.style.transition="");const e=new bl;if(this.selectedPlayerKinds=await e.show(),this.discs&&this.discs.length>0&&this.discs.forEach(n=>n.dispose()),this.discs=[],this.wizardController.onGameRestart(),this.necromancerController.onGameRestart(),this.barbarianController.onGameRestart(),this.lavaPools&&this.lavaPools.length>0&&this.lavaPools.forEach(n=>{n.getMesh()&&this.scene.remove(n.getMesh()),n.dispose()}),this.lavaPools=[],this._clearTurnStartBeams(),this._clearTurnStartRings(),this._ringStepDiscData=null,this.level&&this.level.unload(),this.level)this.currentLevelNumber=1,this.level.nextShape=this._shapeForLevel(this.currentLevelNumber),this.level.load();else return;if(this.lavaManager.generate(),this.initDiscs(),this.currentTurnIndex=0,this._currentDisc=null,this.waitingForDiscToStop=!1,this.playerDamagedNPCsThisThrow.clear(),this.npcsKilledForRageCharge.clear(),this.gameOverState.active=!1,this.roundWon=!1,this.panningKeys={up:!1,down:!1,left:!1,right:!1},this.discs.length>0){let n=this.discs.find(i=>i.type==="player");n||(n=this.discs[0]),this.currentTurnIndex=this.discs.indexOf(n),this.currentTurnIndex===-1&&(this.currentTurnIndex=0),this.currentDisc=this.discs[this.currentTurnIndex],this.discs[this.currentTurnIndex].hasThrown=!1,this.currentDisc.type==="NPC"&&await this.aiThrow(this.currentDisc)}this.updateDiscNames(),this._hideDiscInfoPopup(),this.barbarianController.updateRageButtonVisibility(),this.barbarianController.updateEndTurnButtonVisibility(),this.wizardController.updateActionButtons(),this.wizardController.updateEndTurnButtonVisibility(),this.necromancerController.updateActionButtons(),this.necromancerController.updateEndTurnButtonVisibility(),this.necromancerController.cancelTargetSelection(),this.necromancerController.hideTargetSelectionPopup(),this.recenterCamera(),this.controls&&(this.controls.enabled=!0),this.controlsEnabled=!0,this._prevLineStart=null,this._prevLineEnd=null}async animate(){requestAnimationFrame(()=>this.animate()),this.uiManager&&this.uiManager.updateFloatingTexts(this.camera),this.fpsFrameCount++;const t=performance.now(),e=(t-this.fpsLastTime)/1e3;this.fpsLastTime=t;const n=t-this.fpsLastUpdateTime;if(n>=this.fpsUpdateInterval){const r=Math.round(this.fpsFrameCount*1e3/n);this.uiManager&&this.uiManager.updateFPS(r),this.fpsFrameCount=0,this.fpsLastUpdateTime=t}if(this.cameraController.update(e,this.level),this.currentDisc&&(this.currentDisc.mesh.scale.set(1,1,1),this.currentDisc.mesh.position.y=this.currentDisc.basePositionY,[...this.discs].forEach(r=>{if(r.dead)r.mesh.isGroup?r.mesh.children.forEach(a=>{a.material&&(a.material.color&&a.material.color.set(8947848),a.material.opacity=.9,a.material.transparent=!0)}):(r.mesh.material.color.set(8947848),r.mesh.material.opacity=.9,r.mesh.material.transparent=!0);else if(r.mesh.isGroup)r.mesh.children.forEach(a=>{if(a.material){if(r.kind==="AnimatedDead"&&r.initialColor!==void 0){const o=r._animatedDeadColor!==void 0?r._animatedDeadColor:r.initialColor;a.material.color.set(a.material.map?16777215:o)}else a.material.color&&a.material.color.set(a.material.color.getHex());a.material.opacity=.9,a.material.transparent=!0}});else{if(r.kind==="AnimatedDead"&&r.initialColor!==void 0){const a=r._animatedDeadColor!==void 0?r._animatedDeadColor:r.initialColor;r.mesh.material.color.set(a)}else r.mesh.material.color.set(r.mesh.material.color.getHex());r.mesh.material.opacity=.9,r.mesh.material.transparent=!0}})),this.wizardController.update(e),this._updateTurnStartBeams(e),this._updateTurnStartRings(e),!await this.physics.update(e)){if(this.level&&this.level.update(e),this._ringStepDiscData)for(let r=this._ringStepDiscData.length-1;r>=0;r--){const a=this._ringStepDiscData[r],{disc:o,startX:l,startZ:c,startRotY:h,ring:u}=a;if(!o.mesh)continue;const f=u.group.rotation.y-h,d=Math.cos(f),g=Math.sin(f);if(o.mesh.position.x=l*d-c*g,o.mesh.position.z=l*g+c*d,o.spotlight&&(o.spotlight.position.x=o.mesh.position.x,o.spotlight.position.z=o.mesh.position.z),o.animatedDeadRing&&(o.animatedDeadRing.position.x=o.mesh.position.x,o.animatedDeadRing.position.z=o.mesh.position.z),this.level)for(const _ of this.level.obstacles||[]){if(_.type!=="pillar")continue;const m=o.mesh.position.x-_.x,p=o.mesh.position.z-_.z,E=Math.sqrt(m*m+p*p),M=o.radius+_.width/2;if(E<M&&E>.001){const x=m/E,w=p/E;o.mesh.position.x=_.x+x*M,o.mesh.position.z=_.z+w*M,o.spotlight&&(o.spotlight.position.x=o.mesh.position.x,o.spotlight.position.z=o.mesh.position.z),o.animatedDeadRing&&(o.animatedDeadRing.position.x=o.mesh.position.x,o.animatedDeadRing.position.z=o.mesh.position.z),o.velocity.set(x*.25,0,w*.25),o.moving=!0,this._ringStepDiscData.splice(r,1);break}}}if(this.lavaPools&&this.lavaPools.length>0&&this.lavaPools.forEach(r=>r.update(e)),this.lavaPools&&this.lavaPools.length>0&&([...this.discs].forEach(r=>{typeof r.isCurrentlyInLavaState>"u"&&(r.isCurrentlyInLavaState=!1);let a=!1;for(const o of this.lavaPools)if(o.isPointInside(r.mesh.position.x,r.mesh.position.z)){if(a=!0,!r.isCurrentlyInLavaState&&(console.log(`${r.discName} fell into lava!`),r.isCurrentlyInLavaState=!0,r.kind!=="Orb"&&r.takeHit(1,null),r.type==="NPC"&&r.hitPoints<=0&&!this.npcsKilledForRageCharge.has(r.discName))){const l=this.currentDisc;l&&l.type==="player"&&(l.kind==="Barbarian"?this.barbarianController.rageCharges<this.barbarianController.maxRageChargesCap&&this.barbarianController.rageCharges++:(l.kind==="Wizard"||l.kind==="Orb")&&this.wizardController.manaEarnedThisTurn++,this.npcsKilledForRageCharge.add(r.discName),this.barbarianController.updateRageButtonVisibility())}break}!a&&r.isCurrentlyInLavaState&&(r.isCurrentlyInLavaState=!1)}),this.updateAllDiscDeadStates(),this.gameOverState.active||this.checkGameOverConditions()),this.renderer&&this.renderer.render(this.scene,this.camera),this.waitingForDiscToStop&&this.thrownDisc){const r=this.thrownDisc.velocity.length(),a=(this.thrownDisc.kind==="Orb"||this.thrownDisc.kind==="HealingOrb")&&(this.thrownDisc.hitPoints<=0||this.thrownDisc.dead),o=this.thrownDisc.kind==="AnimatedDead"&&(this.thrownDisc.hitPoints<=0||this.thrownDisc.dead);if(r<.01&&!this.thrownDisc.moving||a||o){this.waitingForDiscToStop=!1;const l=this.thrownDisc;this.thrownDisc=null,l.kind==="Wizard"||l.kind==="Orb"||l.kind==="HealingOrb"?await this.wizardController.onDiscStopped(l):l.kind==="Necromancer"||l.kind==="AnimatedDead"?await this.necromancerController.onDiscStopped(l):await this._proceedToNextPlayerTurn()}}}}updateDiscNames(){this.uiManager&&this.uiManager.updateDiscNames(this.discs,this.currentDisc)}removeAnimatedDead(t){this.necromancerController&&this.necromancerController.removeAnimatedDead(t)}async _proceedToNextPlayerTurn(){if(this.checkGameOverConditions())return;this.currentTurnIndex,this.wizardController.onTurnEnd(),this.necromancerController.onTurnEnd(),this.barbarianController.onTurnEnd(),this.currentTurnIndex!==-1&&this.discs[this.currentTurnIndex]&&(this.currentDisc=this.discs[this.currentTurnIndex],this.currentDisc.mesh.isGroup?this.currentDisc.mesh.children.forEach(i=>{i.material&&i.material.emissive&&i.material.emissive.set(0)}):this.currentDisc.mesh&&this.currentDisc.mesh.material&&this.currentDisc.mesh.material.emissive.set(0));let t=!1,e=this.currentTurnIndex;for(let i=0;i<this.discs.length;i++){e=(this.currentTurnIndex+1+i)%this.discs.length;const r=this.discs[e];if(!(r.type!=="player"&&r.type!=="NPC")&&!(r.kind==="Orb"||r.kind==="HealingOrb")&&r.kind!=="AnimatedDead"&&r.hitPoints>0&&!r.dead){t=!0;break}}if(!t){const i=this.discs.find(r=>r.type==="player"&&r.kind!=="Orb"&&r.kind!=="HealingOrb"&&r.kind!=="AnimatedDead"&&!r.dead);if(i)this.currentDisc=i,this.currentTurnIndex=this.discs.indexOf(i);else{const r=this.discs.find(a=>a.type==="NPC"&&!a.dead);if(r)this.currentDisc=r,this.currentTurnIndex=this.discs.indexOf(r);else{this.currentDisc=null,this.currentTurnIndex=-1,this.logCurrentTurn(),this._updateSpotlights(),this.barbarianController.updateRageButtonVisibility(),this.wizardController.updateActionButtons();return}}}const n=this.discs.findIndex(i=>!i.dead&&(i.type==="player"||i.type==="NPC")&&i.kind!=="Orb"&&i.kind!=="HealingOrb"&&i.kind!=="AnimatedDead");if(this.level&&t&&e===n){const i=this.level.stepRings();if(i){this.soundManager.playStoneSlide(new A(0,0,0));const{RING_R1:r,RING_R2:a}=i,{inner:o,middle:l,outer:c}=this.level.bullseyeRings;this._ringStepDiscData=this.discs.filter(h=>h.mesh).map(h=>{const u=h.mesh.position.x,f=h.mesh.position.z,d=Math.sqrt(u*u+f*f),g=d<r?o:d<a?l:c;return{disc:h,startX:u,startZ:f,startRotY:g.group.rotation.y,ring:g}}),await new Promise(h=>{const u=setInterval(()=>{this.level.ringsAnimating||(clearInterval(u),h())},50)}),this._ringStepDiscData=null}}if(this.discs[e].hasThrown=!1,this.currentTurnIndex=e,this.currentDisc=this.discs[this.currentTurnIndex],this.currentDisc&&this.currentDisc.kind==="Wizard"&&!this.currentDisc.dead&&(this.wizardController.applyEarnedMana(),this.uiManager&&this.uiManager.updateCurrentTurnDiscName(this.currentDisc)),this.currentDisc&&this.currentDisc.kind==="Necromancer"&&!this.currentDisc.dead&&(this.necromancerController.applyEarnedMana(),this.uiManager&&this.uiManager.updateCurrentTurnDiscName(this.currentDisc)),this._applyStartOfTurnLavaDamage(this.currentDisc),this.currentDisc&&this.currentDisc.dead&&!this.gameOverState.active){await this._proceedToNextPlayerTurn();return}this.logCurrentTurn(),this._updateSpotlights(),this.barbarianController.updateRageButtonVisibility(),this.barbarianController.updateEndTurnButtonVisibility(),this.wizardController.updateActionButtons(),this.wizardController.updateEndTurnButtonVisibility(),this.necromancerController.updateActionButtons(),this.necromancerController.updateEndTurnButtonVisibility(),this._updateSpotlights(),this.currentDisc&&this.currentDisc.type==="player"&&this.currentDisc.kind!=="Orb"&&this.currentDisc.kind!=="HealingOrb"&&this.currentDisc.kind!=="AnimatedDead"&&(this._spawnTurnStartBeam(this.currentDisc),this._spawnTurnStartRings(this.currentDisc),this.soundManager&&this.soundManager.playBuzz(this.currentDisc.mesh.position.clone())),this.currentDisc&&this.currentDisc.type==="NPC"&&!this.currentDisc.dead&&await this.aiThrow(this.currentDisc)}_spawnTurnStartBeam(t){if(!t||!t.mesh||!this.scene)return;const e=200,n=new sn(1,1,e,16,1,!0),i=new Oe({color:t.initialColor,transparent:!0,opacity:.18,side:Ce,depthWrite:!1}),r=new Et(n,i);r.position.set(t.mesh.position.x,e*1.5,t.mesh.position.z),this.scene.add(r),this._turnStartBeams.push({mesh:r,geo:n,mat:i,elapsed:0})}_updateTurnStartBeams(t){for(let l=this._turnStartBeams.length-1;l>=0;l--){const c=this._turnStartBeams[l];if(c.elapsed+=t,c.elapsed<.25){const h=c.elapsed/.25;c.mesh.position.y=200+-100*h,c.mat.opacity=.33}else{c.mesh.position.y=100;const h=(c.elapsed-.25)/.33;c.mat.opacity=.33*Math.max(0,1-h)}c.elapsed>=.25+.33&&(this.scene.remove(c.mesh),c.geo.dispose(),c.mat.dispose(),this._turnStartBeams.splice(l,1))}}_clearTurnStartBeams(){for(const t of this._turnStartBeams)this.scene.remove(t.mesh),t.geo.dispose(),t.mat.dispose();this._turnStartBeams=[]}_spawnTurnStartRings(t){if(!t||!t.mesh||!this.scene)return;const e=3,n=.12;for(let i=0;i<e;i++){const r=new os(t.radius*1.1,t.radius*1.6,48),a=new Oe({color:t.initialColor,transparent:!0,opacity:0,side:le,depthWrite:!1}),o=new Et(r,a);o.rotation.x=-Math.PI/2,o.position.set(t.mesh.position.x,t.mesh.position.y+.5,t.mesh.position.z),this.scene.add(o),this._turnStartRings.push({mesh:o,geo:r,mat:a,elapsed:0,delay:i*n})}}_updateTurnStartRings(t){for(let r=this._turnStartRings.length-1;r>=0;r--){const a=this._turnStartRings[r];a.elapsed+=t;const o=Math.max(0,(a.elapsed-a.delay)/.55);if(o<=0)continue;if(o>=1){this.scene.remove(a.mesh),a.geo.dispose(),a.mat.dispose(),this._turnStartRings.splice(r,1);continue}const l=1-Math.pow(1-o,2);a.mesh.scale.setScalar(1+l*(2.8-1)),a.mat.opacity=.22*Math.sin(o*Math.PI)}}_clearTurnStartRings(){for(const t of this._turnStartRings)this.scene.remove(t.mesh),t.geo.dispose(),t.mat.dispose();this._turnStartRings=[]}_showDiscInfoPopup(t){if(!this.discInfoPopupElement||!t)return;this.discInfoNameElement.innerText=t.discName;const e=Number(t.hitPoints)||0,n=Number(t.maxHitPoints)||0,i=e>0?"❤️".repeat(e):"",r=n>e?"🩶".repeat(n-e):"";this.discInfoHpElement.innerText=i+r,this.discInfoDescriptionElement.innerText=t.description||"No description available.",this.discInfoPopupElement.className="popup",t.type&&this.discInfoPopupElement.classList.add(t.type.toLowerCase()),this.discInfoPopupElement.classList.add(t.dead?"dead":"alive"),this.discInfoPopupElement.classList.remove("element-hidden"),this.discInfoPopupSelectedDisc=t}_hideDiscInfoPopup(){this.discInfoPopupElement&&(this.discInfoPopupElement.classList.add("element-hidden"),this.discInfoPopupSelectedDisc=null)}_updateSpotlights(){!this.discs||this.discs.length===0||this.discs.forEach(t=>{const e=t===this.currentDisc&&!t.dead;t.setSpotlightIntensity(e)})}async aiThrow(t){if(!t||t.dead)return;const e=this.discs.filter(_=>_.type==="player"&&_.hitPoints>0&&!_.dead);if(e.length===0)return;let n=e[0],i=t.mesh.position.distanceTo(n.mesh.position);for(let _=1;_<e.length;_++){const m=t.mesh.position.distanceTo(e[_].mesh.position);m<i&&(i=m,n=e[_])}const r=n.mesh.position.clone().sub(t.mesh.position);r.y=0,r.normalize();const a=(_,m)=>{const p=this.level.getAllWalls();for(const E of p){const M=new ii().setFromObject(E),x=m.clone().sub(_).normalize(),w=_.distanceTo(m),b=Math.ceil(w*10);for(let R=0;R<=b;R++){const L=_.clone().add(x.clone().multiplyScalar(w/b*R));if(M.containsPoint(L))return!0}}return!1},o=999,l=15,c=(100-t.skillLevel)/100;t.kind==="Barbarian"&&this.barbarianController.uniqueNPCHitsThisThrow.clear();let h=r,u=Math.min(i/10,1)*(.7+.3*(t.skillLevel/100)),f=0,d=!1;for(let _=0;_<o;_++){f=(Math.random()*2-1)*c*l*(Math.PI/180);const m=new tn;m.setFromAxisAngle(new A(0,1,0),f);const p=r.clone().applyQuaternion(m).normalize(),E=t.mesh.position.clone().add(p.clone().multiplyScalar(u*10));if(!a(t.mesh.position.clone(),E)){h=p,d=!0;break}}if(!d){const _=new tn;_.setFromAxisAngle(new A(0,1,0),f),h=r.clone().applyQuaternion(_).normalize()}const g=u*t.throwPowerMultiplier/t.mass;t.velocity.set(h.x*g,0,h.z*g),t.moving=!0,t.hasThrown=!0,t.resetDamageState(),this.thrownDisc=t,this.waitingForDiscToStop=!0}setCameraRotation(t){this.cameraController.setCameraRotation(t)}_applyStartOfTurnLavaDamage(t){if(!(!t||!this.lavaPools||this.lavaPools.length===0||t.kind==="Orb"||t.kind==="HealingOrb")){for(const e of this.lavaPools)if(e.isPointInside(t.mesh.position.x,t.mesh.position.z)){if(console.log(`${t.discName} is starting turn in lava, takes 1 damage.`),t.takeHit(1,null),t.type==="NPC"&&t.hitPoints<=0&&!this.npcsKilledForRageCharge.has(t.discName)){const n=this.currentDisc;n&&n.type==="player"&&(n.kind==="Barbarian"?this.barbarianController.rageCharges<this.barbarianController.maxRageChargesCap&&this.barbarianController.rageCharges++:(n.kind==="Wizard"||n.kind==="Orb")&&this.wizardController.manaEarnedThisTurn++,this.npcsKilledForRageCharge.add(t.discName),this.barbarianController.updateRageButtonVisibility())}this.updateAllDiscDeadStates(),this.gameOverState.active||this.checkGameOverConditions();break}}}}window.gameController=window.gameController||new uc;window.gameController.init();new uc;document.getElementById("clear-first-time-events-btn").addEventListener("click",()=>{Pe.clear()});
