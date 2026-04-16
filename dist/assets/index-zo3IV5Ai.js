var tc=Object.defineProperty;var ec=(s,t,e)=>t in s?tc(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e;var Ka=(s,t,e)=>ec(s,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=e(i);fetch(i.href,r)}})();/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Ma="177",gi={ROTATE:0,DOLLY:1,PAN:2},pi={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},nc=0,Za=1,ic=2,cl=1,sc=2,un=3,An=0,be=1,ue=2,wn=0,_i=1,ja=2,$a=3,Ja=4,rc=5,zn=100,ac=101,oc=102,lc=103,cc=104,hc=200,uc=201,dc=202,fc=203,Dr=204,Pr=205,pc=206,mc=207,gc=208,_c=209,vc=210,xc=211,Mc=212,yc=213,Sc=214,Lr=0,Ir=1,Nr=2,Mi=3,Or=4,Ur=5,Fr=6,Br=7,ya=0,Ec=1,Tc=2,Cn=0,bc=1,wc=2,Cc=3,Ac=4,Rc=5,Dc=6,Pc=7,hl=300,yi=301,Si=302,zr=303,kr=304,zs=306,ae=1e3,Vn=1001,Hr=1002,Je=1003,Lc=1004,ts=1005,en=1006,qs=1007,Gn=1008,nn=1009,ul=1010,dl=1011,Gi=1012,Sa=1013,Wn=1014,dn=1015,$i=1016,Ea=1017,Ta=1018,Wi=1020,fl=35902,pl=1021,ml=1022,$e=1023,Xi=1026,Yi=1027,gl=1028,ba=1029,_l=1030,wa=1031,Ca=1033,As=33776,Rs=33777,Ds=33778,Ps=33779,Vr=35840,Gr=35841,Wr=35842,Xr=35843,Yr=36196,qr=37492,Kr=37496,Zr=37808,jr=37809,$r=37810,Jr=37811,Qr=37812,ta=37813,ea=37814,na=37815,ia=37816,sa=37817,ra=37818,aa=37819,oa=37820,la=37821,Ls=36492,ca=36494,ha=36495,vl=36283,ua=36284,da=36285,fa=36286,Ic=3200,Nc=3201,Aa=0,Oc=1,Tn="",ze="srgb",Ei="srgb-linear",Ns="linear",ie="srgb",Jn=7680,Qa=519,Uc=512,Fc=513,Bc=514,xl=515,zc=516,kc=517,Hc=518,Vc=519,to=35044,eo="300 es",fn=2e3,Os=2001;class qn{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){const n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){const n=this._listeners;if(n===void 0)return;const i=n[t];if(i!==void 0){const r=i.indexOf(e);r!==-1&&i.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const n=e[t.type];if(n!==void 0){t.target=this;const i=n.slice(0);for(let r=0,a=i.length;r<a;r++)i[r].call(this,t);t.target=null}}}const Ee=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let no=1234567;const Fi=Math.PI/180,Ti=180/Math.PI;function Kn(){const s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ee[s&255]+Ee[s>>8&255]+Ee[s>>16&255]+Ee[s>>24&255]+"-"+Ee[t&255]+Ee[t>>8&255]+"-"+Ee[t>>16&15|64]+Ee[t>>24&255]+"-"+Ee[e&63|128]+Ee[e>>8&255]+"-"+Ee[e>>16&255]+Ee[e>>24&255]+Ee[n&255]+Ee[n>>8&255]+Ee[n>>16&255]+Ee[n>>24&255]).toLowerCase()}function Zt(s,t,e){return Math.max(t,Math.min(e,s))}function Ra(s,t){return(s%t+t)%t}function Gc(s,t,e,n,i){return n+(s-t)*(i-n)/(e-t)}function Wc(s,t,e){return s!==t?(e-s)/(t-s):0}function Bi(s,t,e){return(1-e)*s+e*t}function Xc(s,t,e,n){return Bi(s,t,1-Math.exp(-e*n))}function Yc(s,t=1){return t-Math.abs(Ra(s,t*2)-t)}function qc(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*(3-2*s))}function Kc(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*s*(s*(s*6-15)+10))}function Zc(s,t){return s+Math.floor(Math.random()*(t-s+1))}function jc(s,t){return s+Math.random()*(t-s)}function $c(s){return s*(.5-Math.random())}function Jc(s){s!==void 0&&(no=s);let t=no+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Qc(s){return s*Fi}function th(s){return s*Ti}function eh(s){return(s&s-1)===0&&s!==0}function nh(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function ih(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function sh(s,t,e,n,i){const r=Math.cos,a=Math.sin,o=r(e/2),l=a(e/2),c=r((t+n)/2),h=a((t+n)/2),u=r((t-n)/2),f=a((t-n)/2),d=r((n-t)/2),g=a((n-t)/2);switch(i){case"XYX":s.set(o*h,l*u,l*f,o*c);break;case"YZY":s.set(l*f,o*h,l*u,o*c);break;case"ZXZ":s.set(l*u,l*f,o*h,o*c);break;case"XZX":s.set(o*h,l*g,l*d,o*c);break;case"YXY":s.set(l*d,o*h,l*g,o*c);break;case"ZYZ":s.set(l*g,l*d,o*h,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function fi(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function Ae(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}const pa={DEG2RAD:Fi,RAD2DEG:Ti,generateUUID:Kn,clamp:Zt,euclideanModulo:Ra,mapLinear:Gc,inverseLerp:Wc,lerp:Bi,damp:Xc,pingpong:Yc,smoothstep:qc,smootherstep:Kc,randInt:Zc,randFloat:jc,randFloatSpread:$c,seededRandom:Jc,degToRad:Qc,radToDeg:th,isPowerOfTwo:eh,ceilPowerOfTwo:nh,floorPowerOfTwo:ih,setQuaternionFromProperEuler:sh,normalize:Ae,denormalize:fi};class ot{constructor(t=0,e=0){ot.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Zt(this.x,t.x,e.x),this.y=Zt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Zt(this.x,t,e),this.y=Zt(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Zt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Zt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),i=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*i+t.x,this.y=r*i+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class _n{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,r,a,o){let l=n[i+0],c=n[i+1],h=n[i+2],u=n[i+3];const f=r[a+0],d=r[a+1],g=r[a+2],_=r[a+3];if(o===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u;return}if(o===1){t[e+0]=f,t[e+1]=d,t[e+2]=g,t[e+3]=_;return}if(u!==_||l!==f||c!==d||h!==g){let m=1-o;const p=l*f+c*d+h*g+u*_,T=p>=0?1:-1,M=1-p*p;if(M>Number.EPSILON){const w=Math.sqrt(M),b=Math.atan2(w,p*T);m=Math.sin(m*b)/w,o=Math.sin(o*b)/w}const x=o*T;if(l=l*m+f*x,c=c*m+d*x,h=h*m+g*x,u=u*m+_*x,m===1-o){const w=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=w,c*=w,h*=w,u*=w}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,i,r,a){const o=n[i],l=n[i+1],c=n[i+2],h=n[i+3],u=r[a],f=r[a+1],d=r[a+2],g=r[a+3];return t[e]=o*g+h*u+l*d-c*f,t[e+1]=l*g+h*f+c*u-o*d,t[e+2]=c*g+h*d+o*f-l*u,t[e+3]=h*g-o*u-l*f-c*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,i=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(i/2),u=o(r/2),f=l(n/2),d=l(i/2),g=l(r/2);switch(a){case"XYZ":this._x=f*h*u+c*d*g,this._y=c*d*u-f*h*g,this._z=c*h*g+f*d*u,this._w=c*h*u-f*d*g;break;case"YXZ":this._x=f*h*u+c*d*g,this._y=c*d*u-f*h*g,this._z=c*h*g-f*d*u,this._w=c*h*u+f*d*g;break;case"ZXY":this._x=f*h*u-c*d*g,this._y=c*d*u+f*h*g,this._z=c*h*g+f*d*u,this._w=c*h*u-f*d*g;break;case"ZYX":this._x=f*h*u-c*d*g,this._y=c*d*u+f*h*g,this._z=c*h*g-f*d*u,this._w=c*h*u+f*d*g;break;case"YZX":this._x=f*h*u+c*d*g,this._y=c*d*u+f*h*g,this._z=c*h*g-f*d*u,this._w=c*h*u-f*d*g;break;case"XZY":this._x=f*h*u-c*d*g,this._y=c*d*u-f*h*g,this._z=c*h*g+f*d*u,this._w=c*h*u+f*d*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],i=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],u=e[10],f=n+o+u;if(f>0){const d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(h-l)*d,this._y=(r-c)*d,this._z=(a-i)*d}else if(n>o&&n>u){const d=2*Math.sqrt(1+n-o-u);this._w=(h-l)/d,this._x=.25*d,this._y=(i+a)/d,this._z=(r+c)/d}else if(o>u){const d=2*Math.sqrt(1+o-n-u);this._w=(r-c)/d,this._x=(i+a)/d,this._y=.25*d,this._z=(l+h)/d}else{const d=2*Math.sqrt(1+u-n-o);this._w=(a-i)/d,this._x=(r+c)/d,this._y=(l+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Zt(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,i=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+a*o+i*c-r*l,this._y=i*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-i*o,this._w=a*h-n*o-i*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,i=this._y,r=this._z,a=this._w;let o=a*t._w+n*t._x+i*t._y+r*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=n,this._y=i,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const d=1-e;return this._w=d*a+e*this._w,this._x=d*n+e*this._x,this._y=d*i+e*this._y,this._z=d*r+e*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,o),u=Math.sin((1-e)*h)/c,f=Math.sin(e*h)/c;return this._w=a*u+this._w*f,this._x=n*u+this._x*f,this._y=i*u+this._y*f,this._z=r*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class D{constructor(t=0,e=0,n=0){D.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(io.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(io.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*i,this.y=r[1]*e+r[4]*n+r[7]*i,this.z=r[2]*e+r[5]*n+r[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*i+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*i+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*i+r[14])*a,this}applyQuaternion(t){const e=this.x,n=this.y,i=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*i-o*n),h=2*(o*e-r*i),u=2*(r*n-a*e);return this.x=e+l*c+a*u-o*h,this.y=n+l*h+o*c-r*u,this.z=i+l*u+r*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*i,this.y=r[1]*e+r[5]*n+r[9]*i,this.z=r[2]*e+r[6]*n+r[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Zt(this.x,t.x,e.x),this.y=Zt(this.y,t.y,e.y),this.z=Zt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Zt(this.x,t,e),this.y=Zt(this.y,t,e),this.z=Zt(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Zt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,i=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=i*l-r*o,this.y=r*a-n*l,this.z=n*o-i*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Ks.copy(this).projectOnVector(t),this.sub(Ks)}reflect(t){return this.sub(Ks.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Zt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Ks=new D,io=new _n;class Yt{constructor(t,e,n,i,r,a,o,l,c){Yt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,a,o,l,c)}set(t,e,n,i,r,a,o,l,c){const h=this.elements;return h[0]=t,h[1]=i,h[2]=o,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],u=n[7],f=n[2],d=n[5],g=n[8],_=i[0],m=i[3],p=i[6],T=i[1],M=i[4],x=i[7],w=i[2],b=i[5],A=i[8];return r[0]=a*_+o*T+l*w,r[3]=a*m+o*M+l*b,r[6]=a*p+o*x+l*A,r[1]=c*_+h*T+u*w,r[4]=c*m+h*M+u*b,r[7]=c*p+h*x+u*A,r[2]=f*_+d*T+g*w,r[5]=f*m+d*M+g*b,r[8]=f*p+d*x+g*A,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-n*r*h+n*o*l+i*r*c-i*a*l}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=h*a-o*c,f=o*l-h*r,d=c*r-a*l,g=e*u+n*f+i*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return t[0]=u*_,t[1]=(i*c-h*n)*_,t[2]=(o*n-i*a)*_,t[3]=f*_,t[4]=(h*e-i*l)*_,t[5]=(i*r-o*e)*_,t[6]=d*_,t[7]=(n*l-c*e)*_,t[8]=(a*e-n*r)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+t,-i*c,i*l,-i*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(Zs.makeScale(t,e)),this}rotate(t){return this.premultiply(Zs.makeRotation(-t)),this}translate(t,e){return this.premultiply(Zs.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Zs=new Yt;function Ml(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function qi(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function rh(){const s=qi("canvas");return s.style.display="block",s}const so={};function vi(s){s in so||(so[s]=!0,console.warn(s))}function ah(s,t,e){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(t,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function oh(s){const t=s.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function lh(s){const t=s.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const ro=new Yt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),ao=new Yt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function ch(){const s={enabled:!0,workingColorSpace:Ei,spaces:{},convert:function(i,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===ie&&(i.r=mn(i.r),i.g=mn(i.g),i.b=mn(i.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(i.applyMatrix3(this.spaces[r].toXYZ),i.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===ie&&(i.r=xi(i.r),i.g=xi(i.g),i.b=xi(i.b))),i},workingToColorSpace:function(i,r){return this.convert(i,this.workingColorSpace,r)},colorSpaceToWorking:function(i,r){return this.convert(i,r,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Tn?Ns:this.spaces[i].transfer},getLuminanceCoefficients:function(i,r=this.workingColorSpace){return i.fromArray(this.spaces[r].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,r,a){return i.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,r){return vi("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),s.workingToColorSpace(i,r)},toWorkingColorSpace:function(i,r){return vi("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),s.colorSpaceToWorking(i,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return s.define({[Ei]:{primaries:t,whitePoint:n,transfer:Ns,toXYZ:ro,fromXYZ:ao,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:ze},outputColorSpaceConfig:{drawingBufferColorSpace:ze}},[ze]:{primaries:t,whitePoint:n,transfer:ie,toXYZ:ro,fromXYZ:ao,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:ze}}}),s}const Qt=ch();function mn(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function xi(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let Qn;class hh{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{Qn===void 0&&(Qn=qi("canvas")),Qn.width=t.width,Qn.height=t.height;const i=Qn.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),n=Qn}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=qi("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const i=n.getImageData(0,0,t.width,t.height),r=i.data;for(let a=0;a<r.length;a++)r[a]=mn(r[a]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(mn(e[n]/255)*255):e[n]=mn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let uh=0;class Da{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:uh++}),this.uuid=Kn(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?r.push(js(i[a].image)):r.push(js(i[a]))}else r=js(i);n.url=r}return e||(t.images[this.uuid]=n),n}}function js(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?hh.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let dh=0;const $s=new D;class Pe extends qn{constructor(t=Pe.DEFAULT_IMAGE,e=Pe.DEFAULT_MAPPING,n=Vn,i=Vn,r=en,a=Gn,o=$e,l=nn,c=Pe.DEFAULT_ANISOTROPY,h=Tn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:dh++}),this.uuid=Kn(),this.name="",this.source=new Da(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new ot(0,0),this.repeat=new ot(1,1),this.center=new ot(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Yt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize($s).x}get height(){return this.source.getSize($s).y}get depth(){return this.source.getSize($s).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){console.warn(`THREE.Texture.setValues(): property '${e}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==hl)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case ae:t.x=t.x-Math.floor(t.x);break;case Vn:t.x=t.x<0?0:1;break;case Hr:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case ae:t.y=t.y-Math.floor(t.y);break;case Vn:t.y=t.y<0?0:1;break;case Hr:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Pe.DEFAULT_IMAGE=null;Pe.DEFAULT_MAPPING=hl;Pe.DEFAULT_ANISOTROPY=1;class re{constructor(t=0,e=0,n=0,i=1){re.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*i+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*i+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*i+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*i+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,r;const l=t.elements,c=l[0],h=l[4],u=l[8],f=l[1],d=l[5],g=l[9],_=l[2],m=l[6],p=l[10];if(Math.abs(h-f)<.01&&Math.abs(u-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+d+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const M=(c+1)/2,x=(d+1)/2,w=(p+1)/2,b=(h+f)/4,A=(u+_)/4,P=(g+m)/4;return M>x&&M>w?M<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(M),i=b/n,r=A/n):x>w?x<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(x),n=b/i,r=P/i):w<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(w),n=A/r,i=P/r),this.set(n,i,r,e),this}let T=Math.sqrt((m-g)*(m-g)+(u-_)*(u-_)+(f-h)*(f-h));return Math.abs(T)<.001&&(T=1),this.x=(m-g)/T,this.y=(u-_)/T,this.z=(f-h)/T,this.w=Math.acos((c+d+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Zt(this.x,t.x,e.x),this.y=Zt(this.y,t.y,e.y),this.z=Zt(this.z,t.z,e.z),this.w=Zt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Zt(this.x,t,e),this.y=Zt(this.y,t,e),this.z=Zt(this.z,t,e),this.w=Zt(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Zt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class fh extends qn{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:en,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new re(0,0,t,e),this.scissorTest=!1,this.viewport=new re(0,0,t,e);const i={width:t,height:e,depth:n.depth},r=new Pe(i);this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(t={}){const e={minFilter:en,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n,this.textures[i].isArrayTexture=this.textures[i].image.depth>1;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const i=Object.assign({},t.textures[e].image);this.textures[e].source=new Da(i)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Xn extends fh{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class yl extends Pe{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Je,this.minFilter=Je,this.wrapR=Vn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class ph extends Pe{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Je,this.minFilter=Je,this.wrapR=Vn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Zn{constructor(t=new D(1/0,1/0,1/0),e=new D(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Ye.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Ye.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=Ye.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,Ye):Ye.fromBufferAttribute(r,a),Ye.applyMatrix4(t.matrixWorld),this.expandByPoint(Ye);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),es.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),es.copy(n.boundingBox)),es.applyMatrix4(t.matrixWorld),this.union(es)}const i=t.children;for(let r=0,a=i.length;r<a;r++)this.expandByObject(i[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Ye),Ye.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Ri),ns.subVectors(this.max,Ri),ti.subVectors(t.a,Ri),ei.subVectors(t.b,Ri),ni.subVectors(t.c,Ri),vn.subVectors(ei,ti),xn.subVectors(ni,ei),Ln.subVectors(ti,ni);let e=[0,-vn.z,vn.y,0,-xn.z,xn.y,0,-Ln.z,Ln.y,vn.z,0,-vn.x,xn.z,0,-xn.x,Ln.z,0,-Ln.x,-vn.y,vn.x,0,-xn.y,xn.x,0,-Ln.y,Ln.x,0];return!Js(e,ti,ei,ni,ns)||(e=[1,0,0,0,1,0,0,0,1],!Js(e,ti,ei,ni,ns))?!1:(is.crossVectors(vn,xn),e=[is.x,is.y,is.z],Js(e,ti,ei,ni,ns))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Ye).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Ye).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(an[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),an[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),an[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),an[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),an[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),an[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),an[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),an[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(an),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const an=[new D,new D,new D,new D,new D,new D,new D,new D],Ye=new D,es=new Zn,ti=new D,ei=new D,ni=new D,vn=new D,xn=new D,Ln=new D,Ri=new D,ns=new D,is=new D,In=new D;function Js(s,t,e,n,i){for(let r=0,a=s.length-3;r<=a;r+=3){In.fromArray(s,r);const o=i.x*Math.abs(In.x)+i.y*Math.abs(In.y)+i.z*Math.abs(In.z),l=t.dot(In),c=e.dot(In),h=n.dot(In);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const mh=new Zn,Di=new D,Qs=new D;class ks{constructor(t=new D,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):mh.setFromPoints(t).getCenter(n);let i=0;for(let r=0,a=t.length;r<a;r++)i=Math.max(i,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Di.subVectors(t,this.center);const e=Di.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(Di,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Qs.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Di.copy(t.center).add(Qs)),this.expandByPoint(Di.copy(t.center).sub(Qs))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}const on=new D,tr=new D,ss=new D,Mn=new D,er=new D,rs=new D,nr=new D;class Hs{constructor(t=new D,e=new D(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,on)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=on.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(on.copy(this.origin).addScaledVector(this.direction,e),on.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){tr.copy(t).add(e).multiplyScalar(.5),ss.copy(e).sub(t).normalize(),Mn.copy(this.origin).sub(tr);const r=t.distanceTo(e)*.5,a=-this.direction.dot(ss),o=Mn.dot(this.direction),l=-Mn.dot(ss),c=Mn.lengthSq(),h=Math.abs(1-a*a);let u,f,d,g;if(h>0)if(u=a*l-o,f=a*o-l,g=r*h,u>=0)if(f>=-g)if(f<=g){const _=1/h;u*=_,f*=_,d=u*(u+a*f+2*o)+f*(a*u+f+2*l)+c}else f=r,u=Math.max(0,-(a*f+o)),d=-u*u+f*(f+2*l)+c;else f=-r,u=Math.max(0,-(a*f+o)),d=-u*u+f*(f+2*l)+c;else f<=-g?(u=Math.max(0,-(-a*r+o)),f=u>0?-r:Math.min(Math.max(-r,-l),r),d=-u*u+f*(f+2*l)+c):f<=g?(u=0,f=Math.min(Math.max(-r,-l),r),d=f*(f+2*l)+c):(u=Math.max(0,-(a*r+o)),f=u>0?r:Math.min(Math.max(-r,-l),r),d=-u*u+f*(f+2*l)+c);else f=a>0?-r:r,u=Math.max(0,-(a*f+o)),d=-u*u+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(tr).addScaledVector(ss,f),d}intersectSphere(t,e){on.subVectors(t.center,this.origin);const n=on.dot(this.direction),i=on.dot(on)-n*n,r=t.radius*t.radius;if(i>r)return null;const a=Math.sqrt(r-i),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,r,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return c>=0?(n=(t.min.x-f.x)*c,i=(t.max.x-f.x)*c):(n=(t.max.x-f.x)*c,i=(t.min.x-f.x)*c),h>=0?(r=(t.min.y-f.y)*h,a=(t.max.y-f.y)*h):(r=(t.max.y-f.y)*h,a=(t.min.y-f.y)*h),n>a||r>i||((r>n||isNaN(n))&&(n=r),(a<i||isNaN(i))&&(i=a),u>=0?(o=(t.min.z-f.z)*u,l=(t.max.z-f.z)*u):(o=(t.max.z-f.z)*u,l=(t.min.z-f.z)*u),n>l||o>i)||((o>n||n!==n)&&(n=o),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,on)!==null}intersectTriangle(t,e,n,i,r){er.subVectors(e,t),rs.subVectors(n,t),nr.crossVectors(er,rs);let a=this.direction.dot(nr),o;if(a>0){if(i)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Mn.subVectors(this.origin,t);const l=o*this.direction.dot(rs.crossVectors(Mn,rs));if(l<0)return null;const c=o*this.direction.dot(er.cross(Mn));if(c<0||l+c>a)return null;const h=-o*Mn.dot(nr);return h<0?null:this.at(h/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class oe{constructor(t,e,n,i,r,a,o,l,c,h,u,f,d,g,_,m){oe.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,a,o,l,c,h,u,f,d,g,_,m)}set(t,e,n,i,r,a,o,l,c,h,u,f,d,g,_,m){const p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=i,p[1]=r,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=h,p[10]=u,p[14]=f,p[3]=d,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new oe().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,i=1/ii.setFromMatrixColumn(t,0).length(),r=1/ii.setFromMatrixColumn(t,1).length(),a=1/ii.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,i=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const f=a*h,d=a*u,g=o*h,_=o*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=d+g*c,e[5]=f-_*c,e[9]=-o*l,e[2]=_-f*c,e[6]=g+d*c,e[10]=a*l}else if(t.order==="YXZ"){const f=l*h,d=l*u,g=c*h,_=c*u;e[0]=f+_*o,e[4]=g*o-d,e[8]=a*c,e[1]=a*u,e[5]=a*h,e[9]=-o,e[2]=d*o-g,e[6]=_+f*o,e[10]=a*l}else if(t.order==="ZXY"){const f=l*h,d=l*u,g=c*h,_=c*u;e[0]=f-_*o,e[4]=-a*u,e[8]=g+d*o,e[1]=d+g*o,e[5]=a*h,e[9]=_-f*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){const f=a*h,d=a*u,g=o*h,_=o*u;e[0]=l*h,e[4]=g*c-d,e[8]=f*c+_,e[1]=l*u,e[5]=_*c+f,e[9]=d*c-g,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){const f=a*l,d=a*c,g=o*l,_=o*c;e[0]=l*h,e[4]=_-f*u,e[8]=g*u+d,e[1]=u,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=d*u+g,e[10]=f-_*u}else if(t.order==="XZY"){const f=a*l,d=a*c,g=o*l,_=o*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=f*u+_,e[5]=a*h,e[9]=d*u-g,e[2]=g*u-d,e[6]=o*h,e[10]=_*u+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(gh,t,_h)}lookAt(t,e,n){const i=this.elements;return Ue.subVectors(t,e),Ue.lengthSq()===0&&(Ue.z=1),Ue.normalize(),yn.crossVectors(n,Ue),yn.lengthSq()===0&&(Math.abs(n.z)===1?Ue.x+=1e-4:Ue.z+=1e-4,Ue.normalize(),yn.crossVectors(n,Ue)),yn.normalize(),as.crossVectors(Ue,yn),i[0]=yn.x,i[4]=as.x,i[8]=Ue.x,i[1]=yn.y,i[5]=as.y,i[9]=Ue.y,i[2]=yn.z,i[6]=as.z,i[10]=Ue.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],u=n[5],f=n[9],d=n[13],g=n[2],_=n[6],m=n[10],p=n[14],T=n[3],M=n[7],x=n[11],w=n[15],b=i[0],A=i[4],P=i[8],E=i[12],y=i[1],R=i[5],z=i[9],F=i[13],H=i[2],U=i[6],N=i[10],X=i[14],k=i[3],Z=i[7],st=i[11],ft=i[15];return r[0]=a*b+o*y+l*H+c*k,r[4]=a*A+o*R+l*U+c*Z,r[8]=a*P+o*z+l*N+c*st,r[12]=a*E+o*F+l*X+c*ft,r[1]=h*b+u*y+f*H+d*k,r[5]=h*A+u*R+f*U+d*Z,r[9]=h*P+u*z+f*N+d*st,r[13]=h*E+u*F+f*X+d*ft,r[2]=g*b+_*y+m*H+p*k,r[6]=g*A+_*R+m*U+p*Z,r[10]=g*P+_*z+m*N+p*st,r[14]=g*E+_*F+m*X+p*ft,r[3]=T*b+M*y+x*H+w*k,r[7]=T*A+M*R+x*U+w*Z,r[11]=T*P+M*z+x*N+w*st,r[15]=T*E+M*F+x*X+w*ft,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],i=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],u=t[6],f=t[10],d=t[14],g=t[3],_=t[7],m=t[11],p=t[15];return g*(+r*l*u-i*c*u-r*o*f+n*c*f+i*o*d-n*l*d)+_*(+e*l*d-e*c*f+r*a*f-i*a*d+i*c*h-r*l*h)+m*(+e*c*u-e*o*d-r*a*u+n*a*d+r*o*h-n*c*h)+p*(-i*o*h-e*l*u+e*o*f+i*a*u-n*a*f+n*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=t[9],f=t[10],d=t[11],g=t[12],_=t[13],m=t[14],p=t[15],T=u*m*c-_*f*c+_*l*d-o*m*d-u*l*p+o*f*p,M=g*f*c-h*m*c-g*l*d+a*m*d+h*l*p-a*f*p,x=h*_*c-g*u*c+g*o*d-a*_*d-h*o*p+a*u*p,w=g*u*l-h*_*l-g*o*f+a*_*f+h*o*m-a*u*m,b=e*T+n*M+i*x+r*w;if(b===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/b;return t[0]=T*A,t[1]=(_*f*r-u*m*r-_*i*d+n*m*d+u*i*p-n*f*p)*A,t[2]=(o*m*r-_*l*r+_*i*c-n*m*c-o*i*p+n*l*p)*A,t[3]=(u*l*r-o*f*r-u*i*c+n*f*c+o*i*d-n*l*d)*A,t[4]=M*A,t[5]=(h*m*r-g*f*r+g*i*d-e*m*d-h*i*p+e*f*p)*A,t[6]=(g*l*r-a*m*r-g*i*c+e*m*c+a*i*p-e*l*p)*A,t[7]=(a*f*r-h*l*r+h*i*c-e*f*c-a*i*d+e*l*d)*A,t[8]=x*A,t[9]=(g*u*r-h*_*r-g*n*d+e*_*d+h*n*p-e*u*p)*A,t[10]=(a*_*r-g*o*r+g*n*c-e*_*c-a*n*p+e*o*p)*A,t[11]=(h*o*r-a*u*r-h*n*c+e*u*c+a*n*d-e*o*d)*A,t[12]=w*A,t[13]=(h*_*i-g*u*i+g*n*f-e*_*f-h*n*m+e*u*m)*A,t[14]=(g*o*i-a*_*i-g*n*l+e*_*l+a*n*m-e*o*m)*A,t[15]=(a*u*i-h*o*i+h*n*l-e*u*l-a*n*f+e*o*f)*A,this}scale(t){const e=this.elements,n=t.x,i=t.y,r=t.z;return e[0]*=n,e[4]*=i,e[8]*=r,e[1]*=n,e[5]*=i,e[9]*=r,e[2]*=n,e[6]*=i,e[10]*=r,e[3]*=n,e[7]*=i,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),i=Math.sin(e),r=1-n,a=t.x,o=t.y,l=t.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-i*l,c*l+i*o,0,c*o+i*l,h*o+n,h*l-i*a,0,c*l-i*o,h*l+i*a,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,r,a){return this.set(1,n,r,0,t,1,a,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){const i=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,h=a+a,u=o+o,f=r*c,d=r*h,g=r*u,_=a*h,m=a*u,p=o*u,T=l*c,M=l*h,x=l*u,w=n.x,b=n.y,A=n.z;return i[0]=(1-(_+p))*w,i[1]=(d+x)*w,i[2]=(g-M)*w,i[3]=0,i[4]=(d-x)*b,i[5]=(1-(f+p))*b,i[6]=(m+T)*b,i[7]=0,i[8]=(g+M)*A,i[9]=(m-T)*A,i[10]=(1-(f+_))*A,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){const i=this.elements;let r=ii.set(i[0],i[1],i[2]).length();const a=ii.set(i[4],i[5],i[6]).length(),o=ii.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),t.x=i[12],t.y=i[13],t.z=i[14],qe.copy(this);const c=1/r,h=1/a,u=1/o;return qe.elements[0]*=c,qe.elements[1]*=c,qe.elements[2]*=c,qe.elements[4]*=h,qe.elements[5]*=h,qe.elements[6]*=h,qe.elements[8]*=u,qe.elements[9]*=u,qe.elements[10]*=u,e.setFromRotationMatrix(qe),n.x=r,n.y=a,n.z=o,this}makePerspective(t,e,n,i,r,a,o=fn){const l=this.elements,c=2*r/(e-t),h=2*r/(n-i),u=(e+t)/(e-t),f=(n+i)/(n-i);let d,g;if(o===fn)d=-(a+r)/(a-r),g=-2*a*r/(a-r);else if(o===Os)d=-a/(a-r),g=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=d,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,i,r,a,o=fn){const l=this.elements,c=1/(e-t),h=1/(n-i),u=1/(a-r),f=(e+t)*c,d=(n+i)*h;let g,_;if(o===fn)g=(a+r)*u,_=-2*u;else if(o===Os)g=r*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-d,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const ii=new D,qe=new oe,gh=new D(0,0,0),_h=new D(1,1,1),yn=new D,as=new D,Ue=new D,oo=new oe,lo=new _n;class Qe{constructor(t=0,e=0,n=0,i=Qe.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const i=t.elements,r=i[0],a=i[4],o=i[8],l=i[1],c=i[5],h=i[9],u=i[2],f=i[6],d=i[10];switch(e){case"XYZ":this._y=Math.asin(Zt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Zt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Zt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Zt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Zt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,d));break;case"XZY":this._z=Math.asin(-Zt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return oo.makeRotationFromQuaternion(t),this.setFromRotationMatrix(oo,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return lo.setFromEuler(this),this.setFromQuaternion(lo,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Qe.DEFAULT_ORDER="XYZ";class Pa{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let vh=0;const co=new D,si=new _n,ln=new oe,os=new D,Pi=new D,xh=new D,Mh=new _n,ho=new D(1,0,0),uo=new D(0,1,0),fo=new D(0,0,1),po={type:"added"},yh={type:"removed"},ri={type:"childadded",child:null},ir={type:"childremoved",child:null};class _e extends qn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:vh++}),this.uuid=Kn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=_e.DEFAULT_UP.clone();const t=new D,e=new Qe,n=new _n,i=new D(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new oe},normalMatrix:{value:new Yt}}),this.matrix=new oe,this.matrixWorld=new oe,this.matrixAutoUpdate=_e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=_e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Pa,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return si.setFromAxisAngle(t,e),this.quaternion.multiply(si),this}rotateOnWorldAxis(t,e){return si.setFromAxisAngle(t,e),this.quaternion.premultiply(si),this}rotateX(t){return this.rotateOnAxis(ho,t)}rotateY(t){return this.rotateOnAxis(uo,t)}rotateZ(t){return this.rotateOnAxis(fo,t)}translateOnAxis(t,e){return co.copy(t).applyQuaternion(this.quaternion),this.position.add(co.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(ho,t)}translateY(t){return this.translateOnAxis(uo,t)}translateZ(t){return this.translateOnAxis(fo,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(ln.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?os.copy(t):os.set(t,e,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Pi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ln.lookAt(Pi,os,this.up):ln.lookAt(os,Pi,this.up),this.quaternion.setFromRotationMatrix(ln),i&&(ln.extractRotation(i.matrixWorld),si.setFromRotationMatrix(ln),this.quaternion.premultiply(si.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(po),ri.child=t,this.dispatchEvent(ri),ri.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(yh),ir.child=t,this.dispatchEvent(ir),ir.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),ln.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),ln.multiply(t.parent.matrixWorld)),t.applyMatrix4(ln),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(po),ri.child=t,this.dispatchEvent(ri),ri.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){const a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Pi,t,xh),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Pi,Mh,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(o=>({...o})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(t),i.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];r(t.shapes,u)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));i.material=o}else i.material=r(t.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];i.animations.push(r(t.animations,l))}}if(e){const o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),u=a(t.shapes),f=a(t.skeletons),d=a(t.animations),g=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),g.length>0&&(n.nodes=g)}return n.object=i,n;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const i=t.children[n];this.add(i.clone())}return this}}_e.DEFAULT_UP=new D(0,1,0);_e.DEFAULT_MATRIX_AUTO_UPDATE=!0;_e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Ke=new D,cn=new D,sr=new D,hn=new D,ai=new D,oi=new D,mo=new D,rr=new D,ar=new D,or=new D,lr=new re,cr=new re,hr=new re;class je{constructor(t=new D,e=new D,n=new D){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),Ke.subVectors(t,e),i.cross(Ke);const r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(t,e,n,i,r){Ke.subVectors(i,e),cn.subVectors(n,e),sr.subVectors(t,e);const a=Ke.dot(Ke),o=Ke.dot(cn),l=Ke.dot(sr),c=cn.dot(cn),h=cn.dot(sr),u=a*c-o*o;if(u===0)return r.set(0,0,0),null;const f=1/u,d=(c*l-o*h)*f,g=(a*h-o*l)*f;return r.set(1-d-g,g,d)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,hn)===null?!1:hn.x>=0&&hn.y>=0&&hn.x+hn.y<=1}static getInterpolation(t,e,n,i,r,a,o,l){return this.getBarycoord(t,e,n,i,hn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,hn.x),l.addScaledVector(a,hn.y),l.addScaledVector(o,hn.z),l)}static getInterpolatedAttribute(t,e,n,i,r,a){return lr.setScalar(0),cr.setScalar(0),hr.setScalar(0),lr.fromBufferAttribute(t,e),cr.fromBufferAttribute(t,n),hr.fromBufferAttribute(t,i),a.setScalar(0),a.addScaledVector(lr,r.x),a.addScaledVector(cr,r.y),a.addScaledVector(hr,r.z),a}static isFrontFacing(t,e,n,i){return Ke.subVectors(n,e),cn.subVectors(t,e),Ke.cross(cn).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Ke.subVectors(this.c,this.b),cn.subVectors(this.a,this.b),Ke.cross(cn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return je.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return je.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,r){return je.getInterpolation(t,this.a,this.b,this.c,e,n,i,r)}containsPoint(t){return je.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return je.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,i=this.b,r=this.c;let a,o;ai.subVectors(i,n),oi.subVectors(r,n),rr.subVectors(t,n);const l=ai.dot(rr),c=oi.dot(rr);if(l<=0&&c<=0)return e.copy(n);ar.subVectors(t,i);const h=ai.dot(ar),u=oi.dot(ar);if(h>=0&&u<=h)return e.copy(i);const f=l*u-h*c;if(f<=0&&l>=0&&h<=0)return a=l/(l-h),e.copy(n).addScaledVector(ai,a);or.subVectors(t,r);const d=ai.dot(or),g=oi.dot(or);if(g>=0&&d<=g)return e.copy(r);const _=d*c-l*g;if(_<=0&&c>=0&&g<=0)return o=c/(c-g),e.copy(n).addScaledVector(oi,o);const m=h*g-d*u;if(m<=0&&u-h>=0&&d-g>=0)return mo.subVectors(r,i),o=(u-h)/(u-h+(d-g)),e.copy(i).addScaledVector(mo,o);const p=1/(m+_+f);return a=_*p,o=f*p,e.copy(n).addScaledVector(ai,a).addScaledVector(oi,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Sl={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Sn={h:0,s:0,l:0},ls={h:0,s:0,l:0};function ur(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s}class qt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=ze){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Qt.colorSpaceToWorking(this,e),this}setRGB(t,e,n,i=Qt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Qt.colorSpaceToWorking(this,i),this}setHSL(t,e,n,i=Qt.workingColorSpace){if(t=Ra(t,1),e=Zt(e,0,1),n=Zt(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=ur(a,r,t+1/3),this.g=ur(a,r,t),this.b=ur(a,r,t-1/3)}return Qt.colorSpaceToWorking(this,i),this}setStyle(t,e=ze){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=i[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=ze){const n=Sl[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=mn(t.r),this.g=mn(t.g),this.b=mn(t.b),this}copyLinearToSRGB(t){return this.r=xi(t.r),this.g=xi(t.g),this.b=xi(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=ze){return Qt.workingToColorSpace(Te.copy(this),t),Math.round(Zt(Te.r*255,0,255))*65536+Math.round(Zt(Te.g*255,0,255))*256+Math.round(Zt(Te.b*255,0,255))}getHexString(t=ze){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Qt.workingColorSpace){Qt.workingToColorSpace(Te.copy(this),e);const n=Te.r,i=Te.g,r=Te.b,a=Math.max(n,i,r),o=Math.min(n,i,r);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const u=a-o;switch(c=h<=.5?u/(a+o):u/(2-a-o),a){case n:l=(i-r)/u+(i<r?6:0);break;case i:l=(r-n)/u+2;break;case r:l=(n-i)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=Qt.workingColorSpace){return Qt.workingToColorSpace(Te.copy(this),e),t.r=Te.r,t.g=Te.g,t.b=Te.b,t}getStyle(t=ze){Qt.workingToColorSpace(Te.copy(this),t);const e=Te.r,n=Te.g,i=Te.b;return t!==ze?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(Sn),this.setHSL(Sn.h+t,Sn.s+e,Sn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Sn),t.getHSL(ls);const n=Bi(Sn.h,ls.h,e),i=Bi(Sn.s,ls.s,e),r=Bi(Sn.l,ls.l,e);return this.setHSL(n,i,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,i=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*i,this.g=r[1]*e+r[4]*n+r[7]*i,this.b=r[2]*e+r[5]*n+r[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Te=new qt;qt.NAMES=Sl;let Sh=0;class jn extends qn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Sh++}),this.uuid=Kn(),this.name="",this.type="Material",this.blending=_i,this.side=An,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Dr,this.blendDst=Pr,this.blendEquation=zn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new qt(0,0,0),this.blendAlpha=0,this.depthFunc=Mi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Qa,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Jn,this.stencilZFail=Jn,this.stencilZPass=Jn,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==_i&&(n.blending=this.blending),this.side!==An&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Dr&&(n.blendSrc=this.blendSrc),this.blendDst!==Pr&&(n.blendDst=this.blendDst),this.blendEquation!==zn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Mi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Qa&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Jn&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Jn&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Jn&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(e){const r=i(t.textures),a=i(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const i=e.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class Ze extends jn{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new qt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Qe,this.combine=ya,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const me=new D,cs=new ot;let Eh=0;class De{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Eh++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=to,this.updateRanges=[],this.gpuType=dn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)cs.fromBufferAttribute(this,e),cs.applyMatrix3(t),this.setXY(e,cs.x,cs.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)me.fromBufferAttribute(this,e),me.applyMatrix3(t),this.setXYZ(e,me.x,me.y,me.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)me.fromBufferAttribute(this,e),me.applyMatrix4(t),this.setXYZ(e,me.x,me.y,me.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)me.fromBufferAttribute(this,e),me.applyNormalMatrix(t),this.setXYZ(e,me.x,me.y,me.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)me.fromBufferAttribute(this,e),me.transformDirection(t),this.setXYZ(e,me.x,me.y,me.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=fi(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Ae(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=fi(e,this.array)),e}setX(t,e){return this.normalized&&(e=Ae(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=fi(e,this.array)),e}setY(t,e){return this.normalized&&(e=Ae(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=fi(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Ae(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=fi(e,this.array)),e}setW(t,e){return this.normalized&&(e=Ae(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Ae(e,this.array),n=Ae(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=Ae(e,this.array),n=Ae(n,this.array),i=Ae(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t*=this.itemSize,this.normalized&&(e=Ae(e,this.array),n=Ae(n,this.array),i=Ae(i,this.array),r=Ae(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==to&&(t.usage=this.usage),t}}class El extends De{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Tl extends De{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class fe extends De{constructor(t,e,n){super(new Float32Array(t),e,n)}}let Th=0;const Ge=new oe,dr=new _e,li=new D,Fe=new Zn,Li=new Zn,Me=new D;class we extends qn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Th++}),this.uuid=Kn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Ml(t)?Tl:El)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Yt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Ge.makeRotationFromQuaternion(t),this.applyMatrix4(Ge),this}rotateX(t){return Ge.makeRotationX(t),this.applyMatrix4(Ge),this}rotateY(t){return Ge.makeRotationY(t),this.applyMatrix4(Ge),this}rotateZ(t){return Ge.makeRotationZ(t),this.applyMatrix4(Ge),this}translate(t,e,n){return Ge.makeTranslation(t,e,n),this.applyMatrix4(Ge),this}scale(t,e,n){return Ge.makeScale(t,e,n),this.applyMatrix4(Ge),this}lookAt(t){return dr.lookAt(t),dr.updateMatrix(),this.applyMatrix4(dr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(li).negate(),this.translate(li.x,li.y,li.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let i=0,r=t.length;i<r;i++){const a=t[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new fe(n,3))}else{const n=Math.min(t.length,e.count);for(let i=0;i<n;i++){const r=t[i];e.setXYZ(i,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Zn);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new D(-1/0,-1/0,-1/0),new D(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){const r=e[n];Fe.setFromBufferAttribute(r),this.morphTargetsRelative?(Me.addVectors(this.boundingBox.min,Fe.min),this.boundingBox.expandByPoint(Me),Me.addVectors(this.boundingBox.max,Fe.max),this.boundingBox.expandByPoint(Me)):(this.boundingBox.expandByPoint(Fe.min),this.boundingBox.expandByPoint(Fe.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ks);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new D,1/0);return}if(t){const n=this.boundingSphere.center;if(Fe.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const o=e[r];Li.setFromBufferAttribute(o),this.morphTargetsRelative?(Me.addVectors(Fe.min,Li.min),Fe.expandByPoint(Me),Me.addVectors(Fe.max,Li.max),Fe.expandByPoint(Me)):(Fe.expandByPoint(Li.min),Fe.expandByPoint(Li.max))}Fe.getCenter(n);let i=0;for(let r=0,a=t.count;r<a;r++)Me.fromBufferAttribute(t,r),i=Math.max(i,n.distanceToSquared(Me));if(e)for(let r=0,a=e.length;r<a;r++){const o=e[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Me.fromBufferAttribute(o,c),l&&(li.fromBufferAttribute(t,c),Me.add(li)),i=Math.max(i,n.distanceToSquared(Me))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,i=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new De(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let P=0;P<n.count;P++)o[P]=new D,l[P]=new D;const c=new D,h=new D,u=new D,f=new ot,d=new ot,g=new ot,_=new D,m=new D;function p(P,E,y){c.fromBufferAttribute(n,P),h.fromBufferAttribute(n,E),u.fromBufferAttribute(n,y),f.fromBufferAttribute(r,P),d.fromBufferAttribute(r,E),g.fromBufferAttribute(r,y),h.sub(c),u.sub(c),d.sub(f),g.sub(f);const R=1/(d.x*g.y-g.x*d.y);isFinite(R)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(u,-d.y).multiplyScalar(R),m.copy(u).multiplyScalar(d.x).addScaledVector(h,-g.x).multiplyScalar(R),o[P].add(_),o[E].add(_),o[y].add(_),l[P].add(m),l[E].add(m),l[y].add(m))}let T=this.groups;T.length===0&&(T=[{start:0,count:t.count}]);for(let P=0,E=T.length;P<E;++P){const y=T[P],R=y.start,z=y.count;for(let F=R,H=R+z;F<H;F+=3)p(t.getX(F+0),t.getX(F+1),t.getX(F+2))}const M=new D,x=new D,w=new D,b=new D;function A(P){w.fromBufferAttribute(i,P),b.copy(w);const E=o[P];M.copy(E),M.sub(w.multiplyScalar(w.dot(E))).normalize(),x.crossVectors(b,E);const R=x.dot(l[P])<0?-1:1;a.setXYZW(P,M.x,M.y,M.z,R)}for(let P=0,E=T.length;P<E;++P){const y=T[P],R=y.start,z=y.count;for(let F=R,H=R+z;F<H;F+=3)A(t.getX(F+0)),A(t.getX(F+1)),A(t.getX(F+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new De(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);const i=new D,r=new D,a=new D,o=new D,l=new D,c=new D,h=new D,u=new D;if(t)for(let f=0,d=t.count;f<d;f+=3){const g=t.getX(f+0),_=t.getX(f+1),m=t.getX(f+2);i.fromBufferAttribute(e,g),r.fromBufferAttribute(e,_),a.fromBufferAttribute(e,m),h.subVectors(a,r),u.subVectors(i,r),h.cross(u),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,m),o.add(h),l.add(h),c.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,d=e.count;f<d;f+=3)i.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),a.fromBufferAttribute(e,f+2),h.subVectors(a,r),u.subVectors(i,r),h.cross(u),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Me.fromBufferAttribute(t,e),Me.normalize(),t.setXYZ(e,Me.x,Me.y,Me.z)}toNonIndexed(){function t(o,l){const c=o.array,h=o.itemSize,u=o.normalized,f=new c.constructor(l.length*h);let d=0,g=0;for(let _=0,m=l.length;_<m;_++){o.isInterleavedBufferAttribute?d=l[_]*o.data.stride+o.offset:d=l[_]*h;for(let p=0;p<h;p++)f[g++]=c[d++]}return new De(f,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new we,n=this.index.array,i=this.attributes;for(const o in i){const l=i[o],c=t(l,n);e.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let h=0,u=c.length;h<u;h++){const f=c[h],d=t(f,n);l.push(d)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const i={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,f=c.length;u<f;u++){const d=c[u];h.push(d.toJSON(t.data))}h.length>0&&(i[l]=h,r=!0)}r&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone());const i=t.attributes;for(const c in i){const h=i[c];this.setAttribute(c,h.clone(e))}const r=t.morphAttributes;for(const c in r){const h=[],u=r[c];for(let f=0,d=u.length;f<d;f++)h.push(u[f].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let c=0,h=a.length;c<h;c++){const u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const go=new oe,Nn=new Hs,hs=new ks,_o=new D,us=new D,ds=new D,fs=new D,fr=new D,ps=new D,vo=new D,ms=new D;class Tt extends _e{constructor(t=new we,e=new Ze){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(i,t);const o=this.morphTargetInfluences;if(r&&o){ps.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=o[l],u=r[l];h!==0&&(fr.fromBufferAttribute(u,t),a?ps.addScaledVector(fr,h):ps.addScaledVector(fr.sub(e),h))}e.add(ps)}return e}raycast(t,e){const n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),hs.copy(n.boundingSphere),hs.applyMatrix4(r),Nn.copy(t.ray).recast(t.near),!(hs.containsPoint(Nn.origin)===!1&&(Nn.intersectSphere(hs,_o)===null||Nn.origin.distanceToSquared(_o)>(t.far-t.near)**2))&&(go.copy(r).invert(),Nn.copy(t.ray).applyMatrix4(go),!(n.boundingBox!==null&&Nn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Nn)))}_computeIntersections(t,e,n){let i;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,d=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,_=f.length;g<_;g++){const m=f[g],p=a[m.materialIndex],T=Math.max(m.start,d.start),M=Math.min(o.count,Math.min(m.start+m.count,d.start+d.count));for(let x=T,w=M;x<w;x+=3){const b=o.getX(x),A=o.getX(x+1),P=o.getX(x+2);i=gs(this,p,t,n,c,h,u,b,A,P),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{const g=Math.max(0,d.start),_=Math.min(o.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){const T=o.getX(m),M=o.getX(m+1),x=o.getX(m+2);i=gs(this,a,t,n,c,h,u,T,M,x),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,_=f.length;g<_;g++){const m=f[g],p=a[m.materialIndex],T=Math.max(m.start,d.start),M=Math.min(l.count,Math.min(m.start+m.count,d.start+d.count));for(let x=T,w=M;x<w;x+=3){const b=x,A=x+1,P=x+2;i=gs(this,p,t,n,c,h,u,b,A,P),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{const g=Math.max(0,d.start),_=Math.min(l.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){const T=m,M=m+1,x=m+2;i=gs(this,a,t,n,c,h,u,T,M,x),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}}}function bh(s,t,e,n,i,r,a,o){let l;if(t.side===be?l=n.intersectTriangle(a,r,i,!0,o):l=n.intersectTriangle(i,r,a,t.side===An,o),l===null)return null;ms.copy(o),ms.applyMatrix4(s.matrixWorld);const c=e.ray.origin.distanceTo(ms);return c<e.near||c>e.far?null:{distance:c,point:ms.clone(),object:s}}function gs(s,t,e,n,i,r,a,o,l,c){s.getVertexPosition(o,us),s.getVertexPosition(l,ds),s.getVertexPosition(c,fs);const h=bh(s,t,e,n,us,ds,fs,vo);if(h){const u=new D;je.getBarycoord(vo,us,ds,fs,u),i&&(h.uv=je.getInterpolatedAttribute(i,o,l,c,u,new ot)),r&&(h.uv1=je.getInterpolatedAttribute(r,o,l,c,u,new ot)),a&&(h.normal=je.getInterpolatedAttribute(a,o,l,c,u,new D),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const f={a:o,b:l,c,normal:new D,materialIndex:0};je.getNormal(us,ds,fs,f.normal),h.face=f,h.barycoord=u}return h}class kt extends we{constructor(t=1,e=1,n=1,i=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:r,depthSegments:a};const o=this;i=Math.floor(i),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],h=[],u=[];let f=0,d=0;g("z","y","x",-1,-1,n,e,t,a,r,0),g("z","y","x",1,-1,n,e,-t,a,r,1),g("x","z","y",1,1,t,n,e,i,a,2),g("x","z","y",1,-1,t,n,-e,i,a,3),g("x","y","z",1,-1,t,e,n,i,r,4),g("x","y","z",-1,-1,t,e,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new fe(c,3)),this.setAttribute("normal",new fe(h,3)),this.setAttribute("uv",new fe(u,2));function g(_,m,p,T,M,x,w,b,A,P,E){const y=x/A,R=w/P,z=x/2,F=w/2,H=b/2,U=A+1,N=P+1;let X=0,k=0;const Z=new D;for(let st=0;st<N;st++){const ft=st*R-F;for(let Rt=0;Rt<U;Rt++){const Gt=Rt*y-z;Z[_]=Gt*T,Z[m]=ft*M,Z[p]=H,c.push(Z.x,Z.y,Z.z),Z[_]=0,Z[m]=0,Z[p]=b>0?1:-1,h.push(Z.x,Z.y,Z.z),u.push(Rt/A),u.push(1-st/P),X+=1}}for(let st=0;st<P;st++)for(let ft=0;ft<A;ft++){const Rt=f+ft+U*st,Gt=f+ft+U*(st+1),Y=f+(ft+1)+U*(st+1),et=f+(ft+1)+U*st;l.push(Rt,Gt,et),l.push(Gt,Y,et),k+=6}o.addGroup(d,k,E),d+=k,f+=X}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new kt(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function bi(s){const t={};for(const e in s){t[e]={};for(const n in s[e]){const i=s[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function Re(s){const t={};for(let e=0;e<s.length;e++){const n=bi(s[e]);for(const i in n)t[i]=n[i]}return t}function wh(s){const t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t}function bl(s){const t=s.getRenderTarget();return t===null?s.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Qt.workingColorSpace}const Ch={clone:bi,merge:Re};var Ah=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Rh=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Rn extends jn{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Ah,this.fragmentShader=Rh,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=bi(t.uniforms),this.uniformsGroups=wh(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const i in this.uniforms){const a=this.uniforms[i].value;a&&a.isTexture?e.uniforms[i]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[i]={type:"m4",value:a.toArray()}:e.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class wl extends _e{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new oe,this.projectionMatrix=new oe,this.projectionMatrixInverse=new oe,this.coordinateSystem=fn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const En=new D,xo=new ot,Mo=new ot;class Ne extends wl{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Ti*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Fi*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Ti*2*Math.atan(Math.tan(Fi*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){En.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(En.x,En.y).multiplyScalar(-t/En.z),En.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(En.x,En.y).multiplyScalar(-t/En.z)}getViewSize(t,e){return this.getViewBounds(t,xo,Mo),e.subVectors(Mo,xo)}setViewOffset(t,e,n,i,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Fi*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,r=-.5*i;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*i/l,e-=a.offsetY*n/c,i*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const ci=-90,hi=1;class Dh extends _e{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new Ne(ci,hi,t,e);i.layers=this.layers,this.add(i);const r=new Ne(ci,hi,t,e);r.layers=this.layers,this.add(r);const a=new Ne(ci,hi,t,e);a.layers=this.layers,this.add(a);const o=new Ne(ci,hi,t,e);o.layers=this.layers,this.add(o);const l=new Ne(ci,hi,t,e);l.layers=this.layers,this.add(l);const c=new Ne(ci,hi,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,i,r,a,o,l]=e;for(const c of e)this.remove(c);if(t===fn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Os)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,h]=this.children,u=t.getRenderTarget(),f=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,i),t.render(e,r),t.setRenderTarget(n,1,i),t.render(e,a),t.setRenderTarget(n,2,i),t.render(e,o),t.setRenderTarget(n,3,i),t.render(e,l),t.setRenderTarget(n,4,i),t.render(e,c),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,i),t.render(e,h),t.setRenderTarget(u,f,d),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Cl extends Pe{constructor(t=[],e=yi,n,i,r,a,o,l,c,h){super(t,e,n,i,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Ph extends Xn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new Cl(i),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new kt(5,5,5),r=new Rn({name:"CubemapFromEquirect",uniforms:bi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:be,blending:wn});r.uniforms.tEquirect.value=e;const a=new Tt(i,r),o=e.minFilter;return e.minFilter===Gn&&(e.minFilter=en),new Dh(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,n=!0,i=!0){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,i);t.setRenderTarget(r)}}class bn extends _e{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Lh={type:"move"};class pr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new bn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new bn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new D,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new D),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new bn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new D,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new D),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(const _ of t.hand.values()){const m=e.getJointPose(_,n),p=this._getHandJoint(c,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],f=h.position.distanceTo(u.position),d=.02,g=.005;c.inputState.pinching&&f>d+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&f<=d-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Lh)))}return o!==null&&(o.visible=i!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new bn;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}class Ih extends _e{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Qe,this.environmentIntensity=1,this.environmentRotation=new Qe,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}const mr=new D,Nh=new D,Oh=new Yt;class ke{constructor(t=new D(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const i=mr.subVectors(n,e).cross(Nh.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(mr),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Oh.getNormalMatrix(t),i=this.coplanarPoint(mr).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const On=new ks,_s=new D;class La{constructor(t=new ke,e=new ke,n=new ke,i=new ke,r=new ke,a=new ke){this.planes=[t,e,n,i,r,a]}set(t,e,n,i,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(i),o[4].copy(r),o[5].copy(a),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=fn){const n=this.planes,i=t.elements,r=i[0],a=i[1],o=i[2],l=i[3],c=i[4],h=i[5],u=i[6],f=i[7],d=i[8],g=i[9],_=i[10],m=i[11],p=i[12],T=i[13],M=i[14],x=i[15];if(n[0].setComponents(l-r,f-c,m-d,x-p).normalize(),n[1].setComponents(l+r,f+c,m+d,x+p).normalize(),n[2].setComponents(l+a,f+h,m+g,x+T).normalize(),n[3].setComponents(l-a,f-h,m-g,x-T).normalize(),n[4].setComponents(l-o,f-u,m-_,x-M).normalize(),e===fn)n[5].setComponents(l+o,f+u,m+_,x+M).normalize();else if(e===Os)n[5].setComponents(o,u,_,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),On.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),On.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(On)}intersectsSprite(t){return On.center.set(0,0,0),On.radius=.7071067811865476,On.applyMatrix4(t.matrixWorld),this.intersectsSphere(On)}intersectsSphere(t){const e=this.planes,n=t.center,i=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const i=e[n];if(_s.x=i.normal.x>0?t.max.x:t.min.x,_s.y=i.normal.y>0?t.max.y:t.min.y,_s.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(_s)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Al extends jn{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new qt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Us=new D,Fs=new D,yo=new oe,Ii=new Hs,vs=new ks,gr=new D,So=new D;class Uh extends _e{constructor(t=new we,e=new Al){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let i=1,r=e.count;i<r;i++)Us.fromBufferAttribute(e,i-1),Fs.fromBufferAttribute(e,i),n[i]=n[i-1],n[i]+=Us.distanceTo(Fs);t.setAttribute("lineDistance",new fe(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,i=this.matrixWorld,r=t.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),vs.copy(n.boundingSphere),vs.applyMatrix4(i),vs.radius+=r,t.ray.intersectsSphere(vs)===!1)return;yo.copy(i).invert(),Ii.copy(t.ray).applyMatrix4(yo);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=n.index,f=n.attributes.position;if(h!==null){const d=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let _=d,m=g-1;_<m;_+=c){const p=h.getX(_),T=h.getX(_+1),M=xs(this,t,Ii,l,p,T,_);M&&e.push(M)}if(this.isLineLoop){const _=h.getX(g-1),m=h.getX(d),p=xs(this,t,Ii,l,_,m,g-1);p&&e.push(p)}}else{const d=Math.max(0,a.start),g=Math.min(f.count,a.start+a.count);for(let _=d,m=g-1;_<m;_+=c){const p=xs(this,t,Ii,l,_,_+1,_);p&&e.push(p)}if(this.isLineLoop){const _=xs(this,t,Ii,l,g-1,d,g-1);_&&e.push(_)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function xs(s,t,e,n,i,r,a){const o=s.geometry.attributes.position;if(Us.fromBufferAttribute(o,i),Fs.fromBufferAttribute(o,r),e.distanceSqToSegment(Us,Fs,gr,So)>n)return;gr.applyMatrix4(s.matrixWorld);const c=t.ray.origin.distanceTo(gr);if(!(c<t.near||c>t.far))return{distance:c,point:So.clone().applyMatrix4(s.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:s}}class Rl extends Pe{constructor(t,e,n=Wn,i,r,a,o=Je,l=Je,c,h=Xi,u=1){if(h!==Xi&&h!==Yi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:t,height:e,depth:u};super(f,i,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Da(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class Bs extends we{constructor(t=1,e=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:i},e=Math.max(3,e);const r=[],a=[],o=[],l=[],c=new D,h=new ot;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let u=0,f=3;u<=e;u++,f+=3){const d=n+u/e*i;c.x=t*Math.cos(d),c.y=t*Math.sin(d),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[f]/t+1)/2,h.y=(a[f+1]/t+1)/2,l.push(h.x,h.y)}for(let u=1;u<=e;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new fe(a,3)),this.setAttribute("normal",new fe(o,3)),this.setAttribute("uv",new fe(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Bs(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class pn extends we{constructor(t=1,e=1,n=1,i=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const c=this;i=Math.floor(i),r=Math.floor(r);const h=[],u=[],f=[],d=[];let g=0;const _=[],m=n/2;let p=0;T(),a===!1&&(t>0&&M(!0),e>0&&M(!1)),this.setIndex(h),this.setAttribute("position",new fe(u,3)),this.setAttribute("normal",new fe(f,3)),this.setAttribute("uv",new fe(d,2));function T(){const x=new D,w=new D;let b=0;const A=(e-t)/n;for(let P=0;P<=r;P++){const E=[],y=P/r,R=y*(e-t)+t;for(let z=0;z<=i;z++){const F=z/i,H=F*l+o,U=Math.sin(H),N=Math.cos(H);w.x=R*U,w.y=-y*n+m,w.z=R*N,u.push(w.x,w.y,w.z),x.set(U,A,N).normalize(),f.push(x.x,x.y,x.z),d.push(F,1-y),E.push(g++)}_.push(E)}for(let P=0;P<i;P++)for(let E=0;E<r;E++){const y=_[E][P],R=_[E+1][P],z=_[E+1][P+1],F=_[E][P+1];(t>0||E!==0)&&(h.push(y,R,F),b+=3),(e>0||E!==r-1)&&(h.push(R,z,F),b+=3)}c.addGroup(p,b,0),p+=b}function M(x){const w=g,b=new ot,A=new D;let P=0;const E=x===!0?t:e,y=x===!0?1:-1;for(let z=1;z<=i;z++)u.push(0,m*y,0),f.push(0,y,0),d.push(.5,.5),g++;const R=g;for(let z=0;z<=i;z++){const H=z/i*l+o,U=Math.cos(H),N=Math.sin(H);A.x=E*N,A.y=m*y,A.z=E*U,u.push(A.x,A.y,A.z),f.push(0,y,0),b.x=U*.5+.5,b.y=N*.5*y+.5,d.push(b.x,b.y),g++}for(let z=0;z<i;z++){const F=w+z,H=R+z;x===!0?h.push(H,H+1,F):h.push(H+1,H,F),P+=3}c.addGroup(p,P,x===!0?1:2),p+=P}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new pn(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class sn{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,i=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)n=this.getPoint(a/t),r+=n.distanceTo(i),e.push(r),i=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){const n=this.getLengths();let i=0;const r=n.length;let a;e?a=e:a=t*n[r-1];let o=0,l=r-1,c;for(;o<=l;)if(i=Math.floor(o+(l-o)/2),c=n[i]-a,c<0)o=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===a)return i/(r-1);const h=n[i],f=n[i+1]-h,d=(a-h)/f;return(i+d)/(r-1)}getTangent(t,e){let i=t-1e-4,r=t+1e-4;i<0&&(i=0),r>1&&(r=1);const a=this.getPoint(i),o=this.getPoint(r),l=e||(a.isVector2?new ot:new D);return l.copy(o).sub(a).normalize(),l}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){const n=new D,i=[],r=[],a=[],o=new D,l=new oe;for(let d=0;d<=t;d++){const g=d/t;i[d]=this.getTangentAt(g,new D)}r[0]=new D,a[0]=new D;let c=Number.MAX_VALUE;const h=Math.abs(i[0].x),u=Math.abs(i[0].y),f=Math.abs(i[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),f<=c&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],o),a[0].crossVectors(i[0],r[0]);for(let d=1;d<=t;d++){if(r[d]=r[d-1].clone(),a[d]=a[d-1].clone(),o.crossVectors(i[d-1],i[d]),o.length()>Number.EPSILON){o.normalize();const g=Math.acos(Zt(i[d-1].dot(i[d]),-1,1));r[d].applyMatrix4(l.makeRotationAxis(o,g))}a[d].crossVectors(i[d],r[d])}if(e===!0){let d=Math.acos(Zt(r[0].dot(r[t]),-1,1));d/=t,i[0].dot(o.crossVectors(r[0],r[t]))>0&&(d=-d);for(let g=1;g<=t;g++)r[g].applyMatrix4(l.makeRotationAxis(i[g],d*g)),a[g].crossVectors(i[g],r[g])}return{tangents:i,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class Ia extends sn{constructor(t=0,e=0,n=1,i=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(t,e=new ot){const n=e,i=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(a?r=0:r=i),this.aClockwise===!0&&!a&&(r===i?r=-i:r=r-i);const o=this.aStartAngle+t*r;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),f=l-this.aX,d=c-this.aY;l=f*h-d*u+this.aX,c=f*u+d*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class Fh extends Ia{constructor(t,e,n,i,r,a){super(t,e,n,n,i,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function Na(){let s=0,t=0,e=0,n=0;function i(r,a,o,l){s=r,t=o,e=-3*r+3*a-2*o-l,n=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){i(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,h,u){let f=(a-r)/c-(o-r)/(c+h)+(o-a)/h,d=(o-a)/h-(l-a)/(h+u)+(l-o)/u;f*=h,d*=h,i(a,o,f,d)},calc:function(r){const a=r*r,o=a*r;return s+t*r+e*a+n*o}}}const Ms=new D,_r=new Na,vr=new Na,xr=new Na;class Bh extends sn{constructor(t=[],e=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=i}getPoint(t,e=new D){const n=e,i=this.points,r=i.length,a=(r-(this.closed?0:1))*t;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,h;this.closed||o>0?c=i[(o-1)%r]:(Ms.subVectors(i[0],i[1]).add(i[0]),c=Ms);const u=i[o%r],f=i[(o+1)%r];if(this.closed||o+2<r?h=i[(o+2)%r]:(Ms.subVectors(i[r-1],i[r-2]).add(i[r-1]),h=Ms),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(u),d),_=Math.pow(u.distanceToSquared(f),d),m=Math.pow(f.distanceToSquared(h),d);_<1e-4&&(_=1),g<1e-4&&(g=_),m<1e-4&&(m=_),_r.initNonuniformCatmullRom(c.x,u.x,f.x,h.x,g,_,m),vr.initNonuniformCatmullRom(c.y,u.y,f.y,h.y,g,_,m),xr.initNonuniformCatmullRom(c.z,u.z,f.z,h.z,g,_,m)}else this.curveType==="catmullrom"&&(_r.initCatmullRom(c.x,u.x,f.x,h.x,this.tension),vr.initCatmullRom(c.y,u.y,f.y,h.y,this.tension),xr.initCatmullRom(c.z,u.z,f.z,h.z,this.tension));return n.set(_r.calc(l),vr.calc(l),xr.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new D().fromArray(i))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function Eo(s,t,e,n,i){const r=(n-t)*.5,a=(i-e)*.5,o=s*s,l=s*o;return(2*e-2*n+r+a)*l+(-3*e+3*n-2*r-a)*o+r*s+e}function zh(s,t){const e=1-s;return e*e*t}function kh(s,t){return 2*(1-s)*s*t}function Hh(s,t){return s*s*t}function zi(s,t,e,n){return zh(s,t)+kh(s,e)+Hh(s,n)}function Vh(s,t){const e=1-s;return e*e*e*t}function Gh(s,t){const e=1-s;return 3*e*e*s*t}function Wh(s,t){return 3*(1-s)*s*s*t}function Xh(s,t){return s*s*s*t}function ki(s,t,e,n,i){return Vh(s,t)+Gh(s,e)+Wh(s,n)+Xh(s,i)}class Dl extends sn{constructor(t=new ot,e=new ot,n=new ot,i=new ot){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new ot){const n=e,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(ki(t,i.x,r.x,a.x,o.x),ki(t,i.y,r.y,a.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Yh extends sn{constructor(t=new D,e=new D,n=new D,i=new D){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new D){const n=e,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(ki(t,i.x,r.x,a.x,o.x),ki(t,i.y,r.y,a.y,o.y),ki(t,i.z,r.z,a.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Pl extends sn{constructor(t=new ot,e=new ot){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new ot){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new ot){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class qh extends sn{constructor(t=new D,e=new D){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new D){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new D){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Ll extends sn{constructor(t=new ot,e=new ot,n=new ot){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new ot){const n=e,i=this.v0,r=this.v1,a=this.v2;return n.set(zi(t,i.x,r.x,a.x),zi(t,i.y,r.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Kh extends sn{constructor(t=new D,e=new D,n=new D){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new D){const n=e,i=this.v0,r=this.v1,a=this.v2;return n.set(zi(t,i.x,r.x,a.x),zi(t,i.y,r.y,a.y),zi(t,i.z,r.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Il extends sn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new ot){const n=e,i=this.points,r=(i.length-1)*t,a=Math.floor(r),o=r-a,l=i[a===0?a:a-1],c=i[a],h=i[a>i.length-2?i.length-1:a+1],u=i[a>i.length-3?i.length-1:a+2];return n.set(Eo(o,l.x,c.x,h.x,u.x),Eo(o,l.y,c.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new ot().fromArray(i))}return this}}var To=Object.freeze({__proto__:null,ArcCurve:Fh,CatmullRomCurve3:Bh,CubicBezierCurve:Dl,CubicBezierCurve3:Yh,EllipseCurve:Ia,LineCurve:Pl,LineCurve3:qh,QuadraticBezierCurve:Ll,QuadraticBezierCurve3:Kh,SplineCurve:Il});class Zh extends sn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new To[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),i=this.getCurveLengths();let r=0;for(;r<i.length;){if(i[r]>=n){const a=i[r]-n,o=this.curves[r],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,i=this.curves.length;n<i;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let i=0,r=this.curves;i<r.length;i++){const a=r[i],o=a.isEllipseCurve?t*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?t*a.points.length:t,l=a.getPoints(o);for(let c=0;c<l.length;c++){const h=l[c];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(i.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const i=this.curves[e];t.curves.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(new To[i.type]().fromJSON(i))}return this}}class bo extends Zh{constructor(t){super(),this.type="Path",this.currentPoint=new ot,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new Pl(this.currentPoint.clone(),new ot(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,i){const r=new Ll(this.currentPoint.clone(),new ot(t,e),new ot(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this}bezierCurveTo(t,e,n,i,r,a){const o=new Dl(this.currentPoint.clone(),new ot(t,e),new ot(n,i),new ot(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new Il(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,i,r,a){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+o,e+l,n,i,r,a),this}absarc(t,e,n,i,r,a){return this.absellipse(t,e,n,n,i,r,a),this}ellipse(t,e,n,i,r,a,o,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,n,i,r,a,o,l),this}absellipse(t,e,n,i,r,a,o,l){const c=new Ia(t,e,n,i,r,a,o,l);if(this.curves.length>0){const u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);const h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class Nl extends bo{constructor(t){super(t),this.uuid=Kn(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,i=this.holes.length;n<i;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const i=t.holes[e];this.holes.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const i=this.holes[e];t.holes.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const i=t.holes[e];this.holes.push(new bo().fromJSON(i))}return this}}function jh(s,t,e=2){const n=t&&t.length,i=n?t[0]*e:s.length;let r=Ol(s,0,i,e,!0);const a=[];if(!r||r.next===r.prev)return a;let o,l,c;if(n&&(r=eu(s,t,r,e)),s.length>80*e){o=1/0,l=1/0;let h=-1/0,u=-1/0;for(let f=e;f<i;f+=e){const d=s[f],g=s[f+1];d<o&&(o=d),g<l&&(l=g),d>h&&(h=d),g>u&&(u=g)}c=Math.max(h-o,u-l),c=c!==0?32767/c:0}return Ki(r,a,e,o,l,c,0),a}function Ol(s,t,e,n,i){let r;if(i===du(s,t,e,n)>0)for(let a=t;a<e;a+=n)r=wo(a/n|0,s[a],s[a+1],r);else for(let a=e-n;a>=t;a-=n)r=wo(a/n|0,s[a],s[a+1],r);return r&&wi(r,r.next)&&(ji(r),r=r.next),r}function Yn(s,t){if(!s)return s;t||(t=s);let e=s,n;do if(n=!1,!e.steiner&&(wi(e,e.next)||de(e.prev,e,e.next)===0)){if(ji(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function Ki(s,t,e,n,i,r,a){if(!s)return;!a&&r&&au(s,n,i,r);let o=s;for(;s.prev!==s.next;){const l=s.prev,c=s.next;if(r?Jh(s,n,i,r):$h(s)){t.push(l.i,s.i,c.i),ji(s),s=c.next,o=c.next;continue}if(s=c,s===o){a?a===1?(s=Qh(Yn(s),t),Ki(s,t,e,n,i,r,2)):a===2&&tu(s,t,e,n,i,r):Ki(Yn(s),t,e,n,i,r,1);break}}}function $h(s){const t=s.prev,e=s,n=s.next;if(de(t,e,n)>=0)return!1;const i=t.x,r=e.x,a=n.x,o=t.y,l=e.y,c=n.y,h=Math.min(i,r,a),u=Math.min(o,l,c),f=Math.max(i,r,a),d=Math.max(o,l,c);let g=n.next;for(;g!==t;){if(g.x>=h&&g.x<=f&&g.y>=u&&g.y<=d&&Oi(i,o,r,l,a,c,g.x,g.y)&&de(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function Jh(s,t,e,n){const i=s.prev,r=s,a=s.next;if(de(i,r,a)>=0)return!1;const o=i.x,l=r.x,c=a.x,h=i.y,u=r.y,f=a.y,d=Math.min(o,l,c),g=Math.min(h,u,f),_=Math.max(o,l,c),m=Math.max(h,u,f),p=ma(d,g,t,e,n),T=ma(_,m,t,e,n);let M=s.prevZ,x=s.nextZ;for(;M&&M.z>=p&&x&&x.z<=T;){if(M.x>=d&&M.x<=_&&M.y>=g&&M.y<=m&&M!==i&&M!==a&&Oi(o,h,l,u,c,f,M.x,M.y)&&de(M.prev,M,M.next)>=0||(M=M.prevZ,x.x>=d&&x.x<=_&&x.y>=g&&x.y<=m&&x!==i&&x!==a&&Oi(o,h,l,u,c,f,x.x,x.y)&&de(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;M&&M.z>=p;){if(M.x>=d&&M.x<=_&&M.y>=g&&M.y<=m&&M!==i&&M!==a&&Oi(o,h,l,u,c,f,M.x,M.y)&&de(M.prev,M,M.next)>=0)return!1;M=M.prevZ}for(;x&&x.z<=T;){if(x.x>=d&&x.x<=_&&x.y>=g&&x.y<=m&&x!==i&&x!==a&&Oi(o,h,l,u,c,f,x.x,x.y)&&de(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function Qh(s,t){let e=s;do{const n=e.prev,i=e.next.next;!wi(n,i)&&Fl(n,e,e.next,i)&&Zi(n,i)&&Zi(i,n)&&(t.push(n.i,e.i,i.i),ji(e),ji(e.next),e=s=i),e=e.next}while(e!==s);return Yn(e)}function tu(s,t,e,n,i,r){let a=s;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&cu(a,o)){let l=Bl(a,o);a=Yn(a,a.next),l=Yn(l,l.next),Ki(a,t,e,n,i,r,0),Ki(l,t,e,n,i,r,0);return}o=o.next}a=a.next}while(a!==s)}function eu(s,t,e,n){const i=[];for(let r=0,a=t.length;r<a;r++){const o=t[r]*n,l=r<a-1?t[r+1]*n:s.length,c=Ol(s,o,l,n,!1);c===c.next&&(c.steiner=!0),i.push(lu(c))}i.sort(nu);for(let r=0;r<i.length;r++)e=iu(i[r],e);return e}function nu(s,t){let e=s.x-t.x;if(e===0&&(e=s.y-t.y,e===0)){const n=(s.next.y-s.y)/(s.next.x-s.x),i=(t.next.y-t.y)/(t.next.x-t.x);e=n-i}return e}function iu(s,t){const e=su(s,t);if(!e)return t;const n=Bl(e,s);return Yn(n,n.next),Yn(e,e.next)}function su(s,t){let e=t;const n=s.x,i=s.y;let r=-1/0,a;if(wi(s,e))return e;do{if(wi(s,e.next))return e.next;if(i<=e.y&&i>=e.next.y&&e.next.y!==e.y){const u=e.x+(i-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(u<=n&&u>r&&(r=u,a=e.x<e.next.x?e:e.next,u===n))return a}e=e.next}while(e!==t);if(!a)return null;const o=a,l=a.x,c=a.y;let h=1/0;e=a;do{if(n>=e.x&&e.x>=l&&n!==e.x&&Ul(i<c?n:r,i,l,c,i<c?r:n,i,e.x,e.y)){const u=Math.abs(i-e.y)/(n-e.x);Zi(e,s)&&(u<h||u===h&&(e.x>a.x||e.x===a.x&&ru(a,e)))&&(a=e,h=u)}e=e.next}while(e!==o);return a}function ru(s,t){return de(s.prev,s,t.prev)<0&&de(t.next,s,s.next)<0}function au(s,t,e,n){let i=s;do i.z===0&&(i.z=ma(i.x,i.y,t,e,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==s);i.prevZ.nextZ=null,i.prevZ=null,ou(i)}function ou(s){let t,e=1;do{let n=s,i;s=null;let r=null;for(t=0;n;){t++;let a=n,o=0;for(let c=0;c<e&&(o++,a=a.nextZ,!!a);c++);let l=e;for(;o>0||l>0&&a;)o!==0&&(l===0||!a||n.z<=a.z)?(i=n,n=n.nextZ,o--):(i=a,a=a.nextZ,l--),r?r.nextZ=i:s=i,i.prevZ=r,r=i;n=a}r.nextZ=null,e*=2}while(t>1);return s}function ma(s,t,e,n,i){return s=(s-e)*i|0,t=(t-n)*i|0,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,s|t<<1}function lu(s){let t=s,e=s;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==s);return e}function Ul(s,t,e,n,i,r,a,o){return(i-a)*(t-o)>=(s-a)*(r-o)&&(s-a)*(n-o)>=(e-a)*(t-o)&&(e-a)*(r-o)>=(i-a)*(n-o)}function Oi(s,t,e,n,i,r,a,o){return!(s===a&&t===o)&&Ul(s,t,e,n,i,r,a,o)}function cu(s,t){return s.next.i!==t.i&&s.prev.i!==t.i&&!hu(s,t)&&(Zi(s,t)&&Zi(t,s)&&uu(s,t)&&(de(s.prev,s,t.prev)||de(s,t.prev,t))||wi(s,t)&&de(s.prev,s,s.next)>0&&de(t.prev,t,t.next)>0)}function de(s,t,e){return(t.y-s.y)*(e.x-t.x)-(t.x-s.x)*(e.y-t.y)}function wi(s,t){return s.x===t.x&&s.y===t.y}function Fl(s,t,e,n){const i=Ss(de(s,t,e)),r=Ss(de(s,t,n)),a=Ss(de(e,n,s)),o=Ss(de(e,n,t));return!!(i!==r&&a!==o||i===0&&ys(s,e,t)||r===0&&ys(s,n,t)||a===0&&ys(e,s,n)||o===0&&ys(e,t,n))}function ys(s,t,e){return t.x<=Math.max(s.x,e.x)&&t.x>=Math.min(s.x,e.x)&&t.y<=Math.max(s.y,e.y)&&t.y>=Math.min(s.y,e.y)}function Ss(s){return s>0?1:s<0?-1:0}function hu(s,t){let e=s;do{if(e.i!==s.i&&e.next.i!==s.i&&e.i!==t.i&&e.next.i!==t.i&&Fl(e,e.next,s,t))return!0;e=e.next}while(e!==s);return!1}function Zi(s,t){return de(s.prev,s,s.next)<0?de(s,t,s.next)>=0&&de(s,s.prev,t)>=0:de(s,t,s.prev)<0||de(s,s.next,t)<0}function uu(s,t){let e=s,n=!1;const i=(s.x+t.x)/2,r=(s.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&i<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==s);return n}function Bl(s,t){const e=ga(s.i,s.x,s.y),n=ga(t.i,t.x,t.y),i=s.next,r=t.prev;return s.next=t,t.prev=s,e.next=i,i.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function wo(s,t,e,n){const i=ga(s,t,e);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function ji(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function ga(s,t,e){return{i:s,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function du(s,t,e,n){let i=0;for(let r=t,a=e-n;r<e;r+=n)i+=(s[a]-s[r])*(s[r+1]+s[a+1]),a=r;return i}class fu{static triangulate(t,e,n=2){return jh(t,e,n)}}class Hi{static area(t){const e=t.length;let n=0;for(let i=e-1,r=0;r<e;i=r++)n+=t[i].x*t[r].y-t[r].x*t[i].y;return n*.5}static isClockWise(t){return Hi.area(t)<0}static triangulateShape(t,e){const n=[],i=[],r=[];Co(t),Ao(n,t);let a=t.length;e.forEach(Co);for(let l=0;l<e.length;l++)i.push(a),a+=e[l].length,Ao(n,e[l]);const o=fu.triangulate(n,i);for(let l=0;l<o.length;l+=3)r.push(o.slice(l,l+3));return r}}function Co(s){const t=s.length;t>2&&s[t-1].equals(s[0])&&s.pop()}function Ao(s,t){for(let e=0;e<t.length;e++)s.push(t[e].x),s.push(t[e].y)}class Be extends we{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};const r=t/2,a=e/2,o=Math.floor(n),l=Math.floor(i),c=o+1,h=l+1,u=t/o,f=e/l,d=[],g=[],_=[],m=[];for(let p=0;p<h;p++){const T=p*f-a;for(let M=0;M<c;M++){const x=M*u-r;g.push(x,-T,0),_.push(0,0,1),m.push(M/o),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let T=0;T<o;T++){const M=T+c*p,x=T+c*(p+1),w=T+1+c*(p+1),b=T+1+c*p;d.push(M,x,b),d.push(x,w,b)}this.setIndex(d),this.setAttribute("position",new fe(g,3)),this.setAttribute("normal",new fe(_,3)),this.setAttribute("uv",new fe(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Be(t.width,t.height,t.widthSegments,t.heightSegments)}}class Vi extends we{constructor(t=.5,e=1,n=32,i=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:i,thetaStart:r,thetaLength:a},n=Math.max(3,n),i=Math.max(1,i);const o=[],l=[],c=[],h=[];let u=t;const f=(e-t)/i,d=new D,g=new ot;for(let _=0;_<=i;_++){for(let m=0;m<=n;m++){const p=r+m/n*a;d.x=u*Math.cos(p),d.y=u*Math.sin(p),l.push(d.x,d.y,d.z),c.push(0,0,1),g.x=(d.x/e+1)/2,g.y=(d.y/e+1)/2,h.push(g.x,g.y)}u+=f}for(let _=0;_<i;_++){const m=_*(n+1);for(let p=0;p<n;p++){const T=p+m,M=T,x=T+n+1,w=T+n+2,b=T+1;o.push(M,x,b),o.push(x,w,b)}}this.setIndex(o),this.setAttribute("position",new fe(l,3)),this.setAttribute("normal",new fe(c,3)),this.setAttribute("uv",new fe(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Vi(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class Oa extends we{constructor(t=new Nl([new ot(0,.5),new ot(-.5,-.5),new ot(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};const n=[],i=[],r=[],a=[];let o=0,l=0;if(Array.isArray(t)===!1)c(t);else for(let h=0;h<t.length;h++)c(t[h]),this.addGroup(o,l,h),o+=l,l=0;this.setIndex(n),this.setAttribute("position",new fe(i,3)),this.setAttribute("normal",new fe(r,3)),this.setAttribute("uv",new fe(a,2));function c(h){const u=i.length/3,f=h.extractPoints(e);let d=f.shape;const g=f.holes;Hi.isClockWise(d)===!1&&(d=d.reverse());for(let m=0,p=g.length;m<p;m++){const T=g[m];Hi.isClockWise(T)===!0&&(g[m]=T.reverse())}const _=Hi.triangulateShape(d,g);for(let m=0,p=g.length;m<p;m++){const T=g[m];d=d.concat(T)}for(let m=0,p=d.length;m<p;m++){const T=d[m];i.push(T.x,T.y,0),r.push(0,0,1),a.push(T.x,T.y)}for(let m=0,p=_.length;m<p;m++){const T=_[m],M=T[0]+u,x=T[1]+u,w=T[2]+u;n.push(M,x,w),l+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes;return pu(e,t)}static fromJSON(t,e){const n=[];for(let i=0,r=t.shapes.length;i<r;i++){const a=e[t.shapes[i]];n.push(a)}return new Oa(n,t.curveSegments)}}function pu(s,t){if(t.shapes=[],Array.isArray(s))for(let e=0,n=s.length;e<n;e++){const i=s[e];t.shapes.push(i.uuid)}else t.shapes.push(s.uuid);return t}class Vs extends we{constructor(t=1,e=.4,n=12,i=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:i,arc:r},n=Math.floor(n),i=Math.floor(i);const a=[],o=[],l=[],c=[],h=new D,u=new D,f=new D;for(let d=0;d<=n;d++)for(let g=0;g<=i;g++){const _=g/i*r,m=d/n*Math.PI*2;u.x=(t+e*Math.cos(m))*Math.cos(_),u.y=(t+e*Math.cos(m))*Math.sin(_),u.z=e*Math.sin(m),o.push(u.x,u.y,u.z),h.x=t*Math.cos(_),h.y=t*Math.sin(_),f.subVectors(u,h).normalize(),l.push(f.x,f.y,f.z),c.push(g/i),c.push(d/n)}for(let d=1;d<=n;d++)for(let g=1;g<=i;g++){const _=(i+1)*d+g-1,m=(i+1)*(d-1)+g-1,p=(i+1)*(d-1)+g,T=(i+1)*d+g;a.push(_,m,T),a.push(m,p,T)}this.setIndex(a),this.setAttribute("position",new fe(o,3)),this.setAttribute("normal",new fe(l,3)),this.setAttribute("uv",new fe(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Vs(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class Se extends jn{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new qt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new qt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Aa,this.normalScale=new ot(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Qe,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Es extends jn{constructor(t){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new qt(16777215),this.specular=new qt(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new qt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Aa,this.normalScale=new ot(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Qe,this.combine=ya,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.specular.copy(t.specular),this.shininess=t.shininess,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class mu extends jn{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Ic,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class gu extends jn{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const Ro={enabled:!1,files:{},add:function(s,t){this.enabled!==!1&&(this.files[s]=t)},get:function(s){if(this.enabled!==!1)return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}};class _u{constructor(t,e,n){const i=this;let r=!1,a=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(h){o++,r===!1&&i.onStart!==void 0&&i.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,i.onProgress!==void 0&&i.onProgress(h,a,o),a===o&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){const u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,f=c.length;u<f;u+=2){const d=c[u],g=c[u+1];if(d.global&&(d.lastIndex=0),d.test(h))return g}return null}}}const vu=new _u;class Ua{constructor(t){this.manager=t!==void 0?t:vu,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){const n=this;return new Promise(function(i,r){n.load(t,i,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}}Ua.DEFAULT_MATERIAL_NAME="__DEFAULT";class xu extends Ua{constructor(t){super(t)}load(t,e,n,i){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const r=this,a=Ro.get(t);if(a!==void 0)return r.manager.itemStart(t),setTimeout(function(){e&&e(a),r.manager.itemEnd(t)},0),a;const o=qi("img");function l(){h(),Ro.add(t,this),e&&e(this),r.manager.itemEnd(t)}function c(u){h(),i&&i(u),r.manager.itemError(t),r.manager.itemEnd(t)}function h(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),r.manager.itemStart(t),o.src=t,o}}class Fa extends Ua{constructor(t){super(t)}load(t,e,n,i){const r=new Pe,a=new xu(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(t,function(o){r.image=o,r.needsUpdate=!0,e!==void 0&&e(r)},n,i),r}}class Gs extends _e{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new qt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}const Mr=new oe,Do=new D,Po=new D;class Ba{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ot(512,512),this.mapType=nn,this.map=null,this.mapPass=null,this.matrix=new oe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new La,this._frameExtents=new ot(1,1),this._viewportCount=1,this._viewports=[new re(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Do.setFromMatrixPosition(t.matrixWorld),e.position.copy(Do),Po.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Po),e.updateMatrixWorld(),Mr.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Mr),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Mr)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class Mu extends Ba{constructor(){super(new Ne(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(t){const e=this.camera,n=Ti*2*t.angle*this.focus,i=this.mapSize.width/this.mapSize.height*this.aspect,r=t.distance||e.far;(n!==e.fov||i!==e.aspect||r!==e.far)&&(e.fov=n,e.aspect=i,e.far=r,e.updateProjectionMatrix()),super.updateMatrices(t)}copy(t){return super.copy(t),this.focus=t.focus,this}}class yu extends Gs{constructor(t,e,n=0,i=Math.PI/3,r=0,a=2){super(t,e),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(_e.DEFAULT_UP),this.updateMatrix(),this.target=new _e,this.distance=n,this.angle=i,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new Mu}get power(){return this.intensity*Math.PI}set power(t){this.intensity=t/Math.PI}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}const Lo=new oe,Ni=new D,yr=new D;class Su extends Ba{constructor(){super(new Ne(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ot(4,2),this._viewportCount=6,this._viewports=[new re(2,1,1,1),new re(0,1,1,1),new re(3,1,1,1),new re(1,1,1,1),new re(3,0,1,1),new re(1,0,1,1)],this._cubeDirections=[new D(1,0,0),new D(-1,0,0),new D(0,0,1),new D(0,0,-1),new D(0,1,0),new D(0,-1,0)],this._cubeUps=[new D(0,1,0),new D(0,1,0),new D(0,1,0),new D(0,1,0),new D(0,0,1),new D(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,i=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Ni.setFromMatrixPosition(t.matrixWorld),n.position.copy(Ni),yr.copy(n.position),yr.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(yr),n.updateMatrixWorld(),i.makeTranslation(-Ni.x,-Ni.y,-Ni.z),Lo.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Lo)}}class Eu extends Gs{constructor(t,e,n=0,i=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new Su}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class zl extends wl{constructor(t=-1,e=1,n=1,i=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=n-t,a=n+t,o=i+e,l=i-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class Tu extends Ba{constructor(){super(new zl(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class bu extends Gs{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(_e.DEFAULT_UP),this.updateMatrix(),this.target=new _e,this.shadow=new Tu}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class wu extends Gs{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}class Cu extends Ne{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}const Io=new oe;class kl{constructor(t,e,n=0,i=1/0){this.ray=new Hs(t,e),this.near=n,this.far=i,this.camera=null,this.layers=new Pa,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Io.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Io),this}intersectObject(t,e=!0,n=[]){return _a(t,this,n,e),n.sort(No),n}intersectObjects(t,e=!0,n=[]){for(let i=0,r=t.length;i<r;i++)_a(t[i],this,n,e);return n.sort(No),n}}function No(s,t){return s.distance-t.distance}function _a(s,t,e,n){let i=!0;if(s.layers.test(t.layers)&&s.raycast(t,e)===!1&&(i=!1),i===!0&&n===!0){const r=s.children;for(let a=0,o=r.length;a<o;a++)_a(r[a],t,e,!0)}}class va{constructor(t=1,e=0,n=0){this.radius=t,this.phi=e,this.theta=n}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Zt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(Zt(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class Au extends qn{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){if(t===void 0){console.warn("THREE.Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}}function Oo(s,t,e,n){const i=Ru(n);switch(e){case pl:return s*t;case gl:return s*t/i.components*i.byteLength;case ba:return s*t/i.components*i.byteLength;case _l:return s*t*2/i.components*i.byteLength;case wa:return s*t*2/i.components*i.byteLength;case ml:return s*t*3/i.components*i.byteLength;case $e:return s*t*4/i.components*i.byteLength;case Ca:return s*t*4/i.components*i.byteLength;case As:case Rs:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case Ds:case Ps:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Gr:case Xr:return Math.max(s,16)*Math.max(t,8)/4;case Vr:case Wr:return Math.max(s,8)*Math.max(t,8)/2;case Yr:case qr:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case Kr:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Zr:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case jr:return Math.floor((s+4)/5)*Math.floor((t+3)/4)*16;case $r:return Math.floor((s+4)/5)*Math.floor((t+4)/5)*16;case Jr:return Math.floor((s+5)/6)*Math.floor((t+4)/5)*16;case Qr:return Math.floor((s+5)/6)*Math.floor((t+5)/6)*16;case ta:return Math.floor((s+7)/8)*Math.floor((t+4)/5)*16;case ea:return Math.floor((s+7)/8)*Math.floor((t+5)/6)*16;case na:return Math.floor((s+7)/8)*Math.floor((t+7)/8)*16;case ia:return Math.floor((s+9)/10)*Math.floor((t+4)/5)*16;case sa:return Math.floor((s+9)/10)*Math.floor((t+5)/6)*16;case ra:return Math.floor((s+9)/10)*Math.floor((t+7)/8)*16;case aa:return Math.floor((s+9)/10)*Math.floor((t+9)/10)*16;case oa:return Math.floor((s+11)/12)*Math.floor((t+9)/10)*16;case la:return Math.floor((s+11)/12)*Math.floor((t+11)/12)*16;case Ls:case ca:case ha:return Math.ceil(s/4)*Math.ceil(t/4)*16;case vl:case ua:return Math.ceil(s/4)*Math.ceil(t/4)*8;case da:case fa:return Math.ceil(s/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Ru(s){switch(s){case nn:case ul:return{byteLength:1,components:1};case Gi:case dl:case $i:return{byteLength:2,components:1};case Ea:case Ta:return{byteLength:2,components:4};case Wn:case Sa:case dn:return{byteLength:4,components:1};case fl:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ma}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ma);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Hl(){let s=null,t=!1,e=null,n=null;function i(r,a){e(r,a),n=s.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=s.requestAnimationFrame(i),t=!0)},stop:function(){s.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){s=r}}}function Du(s){const t=new WeakMap;function e(o,l){const c=o.array,h=o.usage,u=c.byteLength,f=s.createBuffer();s.bindBuffer(l,f),s.bufferData(l,c,h),o.onUploadCallback();let d;if(c instanceof Float32Array)d=s.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?d=s.HALF_FLOAT:d=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=s.SHORT;else if(c instanceof Uint32Array)d=s.UNSIGNED_INT;else if(c instanceof Int32Array)d=s.INT;else if(c instanceof Int8Array)d=s.BYTE;else if(c instanceof Uint8Array)d=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,l,c){const h=l.array,u=l.updateRanges;if(s.bindBuffer(c,o),u.length===0)s.bufferSubData(c,0,h);else{u.sort((d,g)=>d.start-g.start);let f=0;for(let d=1;d<u.length;d++){const g=u[f],_=u[d];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++f,u[f]=_)}u.length=f+1;for(let d=0,g=u.length;d<g;d++){const _=u[d];s.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=t.get(o);l&&(s.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:i,remove:r,update:a}}var Pu=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Lu=`#ifdef USE_ALPHAHASH
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
#endif`,Iu=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Nu=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Ou=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Uu=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Fu=`#ifdef USE_AOMAP
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
#endif`,Bu=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,zu=`#ifdef USE_BATCHING
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
#endif`,ku=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Hu=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Vu=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Gu=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Wu=`#ifdef USE_IRIDESCENCE
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
#endif`,Xu=`#ifdef USE_BUMPMAP
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
#endif`,Yu=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,qu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Ku=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Zu=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,ju=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,$u=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Ju=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Qu=`#if defined( USE_COLOR_ALPHA )
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
#endif`,td=`#define PI 3.141592653589793
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
} // validated`,ed=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,nd=`vec3 transformedNormal = objectNormal;
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
#endif`,id=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,sd=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,rd=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,ad=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,od="gl_FragColor = linearToOutputTexel( gl_FragColor );",ld=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,cd=`#ifdef USE_ENVMAP
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
#endif`,hd=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,ud=`#ifdef USE_ENVMAP
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
#endif`,dd=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,fd=`#ifdef USE_ENVMAP
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
#endif`,pd=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,md=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,gd=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,_d=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,vd=`#ifdef USE_GRADIENTMAP
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
}`,xd=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Md=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,yd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Sd=`uniform bool receiveShadow;
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
#endif`,Ed=`#ifdef USE_ENVMAP
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
#endif`,Td=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,bd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,wd=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Cd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Ad=`PhysicalMaterial material;
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
#endif`,Rd=`struct PhysicalMaterial {
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
}`,Dd=`
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
#endif`,Pd=`#if defined( RE_IndirectDiffuse )
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
#endif`,Ld=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Id=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Nd=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Od=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ud=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Fd=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Bd=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,zd=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,kd=`#if defined( USE_POINTS_UV )
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
#endif`,Hd=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Vd=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Gd=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Wd=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Xd=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Yd=`#ifdef USE_MORPHTARGETS
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
#endif`,qd=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Kd=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Zd=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,jd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,$d=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Jd=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Qd=`#ifdef USE_NORMALMAP
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
#endif`,tf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,ef=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,nf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,sf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,rf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,af=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,of=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,lf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,cf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,hf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,uf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,df=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,ff=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,pf=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,mf=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,gf=`float getShadowMask() {
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
}`,_f=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,vf=`#ifdef USE_SKINNING
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
#endif`,xf=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Mf=`#ifdef USE_SKINNING
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
#endif`,yf=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Sf=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Ef=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Tf=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,bf=`#ifdef USE_TRANSMISSION
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
#endif`,wf=`#ifdef USE_TRANSMISSION
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
#endif`,Cf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Af=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Rf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Df=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Pf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Lf=`uniform sampler2D t2D;
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
}`,If=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Nf=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Of=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Uf=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ff=`#include <common>
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
}`,Bf=`#if DEPTH_PACKING == 3200
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
}`,zf=`#define DISTANCE
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
}`,kf=`#define DISTANCE
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
}`,Hf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Vf=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Gf=`uniform float scale;
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
}`,Wf=`uniform vec3 diffuse;
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
}`,Xf=`#include <common>
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
}`,Yf=`uniform vec3 diffuse;
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
}`,qf=`#define LAMBERT
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
}`,Kf=`#define LAMBERT
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
}`,Zf=`#define MATCAP
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
}`,jf=`#define MATCAP
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
}`,$f=`#define NORMAL
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
}`,Jf=`#define NORMAL
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
}`,Qf=`#define PHONG
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
}`,tp=`#define PHONG
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
}`,ep=`#define STANDARD
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
}`,np=`#define STANDARD
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
}`,ip=`#define TOON
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
}`,sp=`#define TOON
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
}`,rp=`uniform float size;
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
}`,ap=`uniform vec3 diffuse;
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
}`,op=`#include <common>
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
}`,lp=`uniform vec3 color;
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
}`,cp=`uniform float rotation;
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
}`,hp=`uniform vec3 diffuse;
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
}`,Kt={alphahash_fragment:Pu,alphahash_pars_fragment:Lu,alphamap_fragment:Iu,alphamap_pars_fragment:Nu,alphatest_fragment:Ou,alphatest_pars_fragment:Uu,aomap_fragment:Fu,aomap_pars_fragment:Bu,batching_pars_vertex:zu,batching_vertex:ku,begin_vertex:Hu,beginnormal_vertex:Vu,bsdfs:Gu,iridescence_fragment:Wu,bumpmap_pars_fragment:Xu,clipping_planes_fragment:Yu,clipping_planes_pars_fragment:qu,clipping_planes_pars_vertex:Ku,clipping_planes_vertex:Zu,color_fragment:ju,color_pars_fragment:$u,color_pars_vertex:Ju,color_vertex:Qu,common:td,cube_uv_reflection_fragment:ed,defaultnormal_vertex:nd,displacementmap_pars_vertex:id,displacementmap_vertex:sd,emissivemap_fragment:rd,emissivemap_pars_fragment:ad,colorspace_fragment:od,colorspace_pars_fragment:ld,envmap_fragment:cd,envmap_common_pars_fragment:hd,envmap_pars_fragment:ud,envmap_pars_vertex:dd,envmap_physical_pars_fragment:Ed,envmap_vertex:fd,fog_vertex:pd,fog_pars_vertex:md,fog_fragment:gd,fog_pars_fragment:_d,gradientmap_pars_fragment:vd,lightmap_pars_fragment:xd,lights_lambert_fragment:Md,lights_lambert_pars_fragment:yd,lights_pars_begin:Sd,lights_toon_fragment:Td,lights_toon_pars_fragment:bd,lights_phong_fragment:wd,lights_phong_pars_fragment:Cd,lights_physical_fragment:Ad,lights_physical_pars_fragment:Rd,lights_fragment_begin:Dd,lights_fragment_maps:Pd,lights_fragment_end:Ld,logdepthbuf_fragment:Id,logdepthbuf_pars_fragment:Nd,logdepthbuf_pars_vertex:Od,logdepthbuf_vertex:Ud,map_fragment:Fd,map_pars_fragment:Bd,map_particle_fragment:zd,map_particle_pars_fragment:kd,metalnessmap_fragment:Hd,metalnessmap_pars_fragment:Vd,morphinstance_vertex:Gd,morphcolor_vertex:Wd,morphnormal_vertex:Xd,morphtarget_pars_vertex:Yd,morphtarget_vertex:qd,normal_fragment_begin:Kd,normal_fragment_maps:Zd,normal_pars_fragment:jd,normal_pars_vertex:$d,normal_vertex:Jd,normalmap_pars_fragment:Qd,clearcoat_normal_fragment_begin:tf,clearcoat_normal_fragment_maps:ef,clearcoat_pars_fragment:nf,iridescence_pars_fragment:sf,opaque_fragment:rf,packing:af,premultiplied_alpha_fragment:of,project_vertex:lf,dithering_fragment:cf,dithering_pars_fragment:hf,roughnessmap_fragment:uf,roughnessmap_pars_fragment:df,shadowmap_pars_fragment:ff,shadowmap_pars_vertex:pf,shadowmap_vertex:mf,shadowmask_pars_fragment:gf,skinbase_vertex:_f,skinning_pars_vertex:vf,skinning_vertex:xf,skinnormal_vertex:Mf,specularmap_fragment:yf,specularmap_pars_fragment:Sf,tonemapping_fragment:Ef,tonemapping_pars_fragment:Tf,transmission_fragment:bf,transmission_pars_fragment:wf,uv_pars_fragment:Cf,uv_pars_vertex:Af,uv_vertex:Rf,worldpos_vertex:Df,background_vert:Pf,background_frag:Lf,backgroundCube_vert:If,backgroundCube_frag:Nf,cube_vert:Of,cube_frag:Uf,depth_vert:Ff,depth_frag:Bf,distanceRGBA_vert:zf,distanceRGBA_frag:kf,equirect_vert:Hf,equirect_frag:Vf,linedashed_vert:Gf,linedashed_frag:Wf,meshbasic_vert:Xf,meshbasic_frag:Yf,meshlambert_vert:qf,meshlambert_frag:Kf,meshmatcap_vert:Zf,meshmatcap_frag:jf,meshnormal_vert:$f,meshnormal_frag:Jf,meshphong_vert:Qf,meshphong_frag:tp,meshphysical_vert:ep,meshphysical_frag:np,meshtoon_vert:ip,meshtoon_frag:sp,points_vert:rp,points_frag:ap,shadow_vert:op,shadow_frag:lp,sprite_vert:cp,sprite_frag:hp},ct={common:{diffuse:{value:new qt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Yt},alphaMap:{value:null},alphaMapTransform:{value:new Yt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Yt}},envmap:{envMap:{value:null},envMapRotation:{value:new Yt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Yt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Yt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Yt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Yt},normalScale:{value:new ot(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Yt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Yt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Yt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Yt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new qt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new qt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Yt},alphaTest:{value:0},uvTransform:{value:new Yt}},sprite:{diffuse:{value:new qt(16777215)},opacity:{value:1},center:{value:new ot(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Yt},alphaMap:{value:null},alphaMapTransform:{value:new Yt},alphaTest:{value:0}}},tn={basic:{uniforms:Re([ct.common,ct.specularmap,ct.envmap,ct.aomap,ct.lightmap,ct.fog]),vertexShader:Kt.meshbasic_vert,fragmentShader:Kt.meshbasic_frag},lambert:{uniforms:Re([ct.common,ct.specularmap,ct.envmap,ct.aomap,ct.lightmap,ct.emissivemap,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.fog,ct.lights,{emissive:{value:new qt(0)}}]),vertexShader:Kt.meshlambert_vert,fragmentShader:Kt.meshlambert_frag},phong:{uniforms:Re([ct.common,ct.specularmap,ct.envmap,ct.aomap,ct.lightmap,ct.emissivemap,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.fog,ct.lights,{emissive:{value:new qt(0)},specular:{value:new qt(1118481)},shininess:{value:30}}]),vertexShader:Kt.meshphong_vert,fragmentShader:Kt.meshphong_frag},standard:{uniforms:Re([ct.common,ct.envmap,ct.aomap,ct.lightmap,ct.emissivemap,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.roughnessmap,ct.metalnessmap,ct.fog,ct.lights,{emissive:{value:new qt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Kt.meshphysical_vert,fragmentShader:Kt.meshphysical_frag},toon:{uniforms:Re([ct.common,ct.aomap,ct.lightmap,ct.emissivemap,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.gradientmap,ct.fog,ct.lights,{emissive:{value:new qt(0)}}]),vertexShader:Kt.meshtoon_vert,fragmentShader:Kt.meshtoon_frag},matcap:{uniforms:Re([ct.common,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.fog,{matcap:{value:null}}]),vertexShader:Kt.meshmatcap_vert,fragmentShader:Kt.meshmatcap_frag},points:{uniforms:Re([ct.points,ct.fog]),vertexShader:Kt.points_vert,fragmentShader:Kt.points_frag},dashed:{uniforms:Re([ct.common,ct.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Kt.linedashed_vert,fragmentShader:Kt.linedashed_frag},depth:{uniforms:Re([ct.common,ct.displacementmap]),vertexShader:Kt.depth_vert,fragmentShader:Kt.depth_frag},normal:{uniforms:Re([ct.common,ct.bumpmap,ct.normalmap,ct.displacementmap,{opacity:{value:1}}]),vertexShader:Kt.meshnormal_vert,fragmentShader:Kt.meshnormal_frag},sprite:{uniforms:Re([ct.sprite,ct.fog]),vertexShader:Kt.sprite_vert,fragmentShader:Kt.sprite_frag},background:{uniforms:{uvTransform:{value:new Yt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Kt.background_vert,fragmentShader:Kt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Yt}},vertexShader:Kt.backgroundCube_vert,fragmentShader:Kt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Kt.cube_vert,fragmentShader:Kt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Kt.equirect_vert,fragmentShader:Kt.equirect_frag},distanceRGBA:{uniforms:Re([ct.common,ct.displacementmap,{referencePosition:{value:new D},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Kt.distanceRGBA_vert,fragmentShader:Kt.distanceRGBA_frag},shadow:{uniforms:Re([ct.lights,ct.fog,{color:{value:new qt(0)},opacity:{value:1}}]),vertexShader:Kt.shadow_vert,fragmentShader:Kt.shadow_frag}};tn.physical={uniforms:Re([tn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Yt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Yt},clearcoatNormalScale:{value:new ot(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Yt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Yt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Yt},sheen:{value:0},sheenColor:{value:new qt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Yt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Yt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Yt},transmissionSamplerSize:{value:new ot},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Yt},attenuationDistance:{value:0},attenuationColor:{value:new qt(0)},specularColor:{value:new qt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Yt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Yt},anisotropyVector:{value:new ot},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Yt}}]),vertexShader:Kt.meshphysical_vert,fragmentShader:Kt.meshphysical_frag};const Ts={r:0,b:0,g:0},Un=new Qe,up=new oe;function dp(s,t,e,n,i,r,a){const o=new qt(0);let l=r===!0?0:1,c,h,u=null,f=0,d=null;function g(M){let x=M.isScene===!0?M.background:null;return x&&x.isTexture&&(x=(M.backgroundBlurriness>0?e:t).get(x)),x}function _(M){let x=!1;const w=g(M);w===null?p(o,l):w&&w.isColor&&(p(w,1),x=!0);const b=s.xr.getEnvironmentBlendMode();b==="additive"?n.buffers.color.setClear(0,0,0,1,a):b==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(s.autoClear||x)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function m(M,x){const w=g(x);w&&(w.isCubeTexture||w.mapping===zs)?(h===void 0&&(h=new Tt(new kt(1,1,1),new Rn({name:"BackgroundCubeMaterial",uniforms:bi(tn.backgroundCube.uniforms),vertexShader:tn.backgroundCube.vertexShader,fragmentShader:tn.backgroundCube.fragmentShader,side:be,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(b,A,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),Un.copy(x.backgroundRotation),Un.x*=-1,Un.y*=-1,Un.z*=-1,w.isCubeTexture&&w.isRenderTargetTexture===!1&&(Un.y*=-1,Un.z*=-1),h.material.uniforms.envMap.value=w,h.material.uniforms.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(up.makeRotationFromEuler(Un)),h.material.toneMapped=Qt.getTransfer(w.colorSpace)!==ie,(u!==w||f!==w.version||d!==s.toneMapping)&&(h.material.needsUpdate=!0,u=w,f=w.version,d=s.toneMapping),h.layers.enableAll(),M.unshift(h,h.geometry,h.material,0,0,null)):w&&w.isTexture&&(c===void 0&&(c=new Tt(new Be(2,2),new Rn({name:"BackgroundMaterial",uniforms:bi(tn.background.uniforms),vertexShader:tn.background.vertexShader,fragmentShader:tn.background.fragmentShader,side:An,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=w,c.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,c.material.toneMapped=Qt.getTransfer(w.colorSpace)!==ie,w.matrixAutoUpdate===!0&&w.updateMatrix(),c.material.uniforms.uvTransform.value.copy(w.matrix),(u!==w||f!==w.version||d!==s.toneMapping)&&(c.material.needsUpdate=!0,u=w,f=w.version,d=s.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null))}function p(M,x){M.getRGB(Ts,bl(s)),n.buffers.color.setClear(Ts.r,Ts.g,Ts.b,x,a)}function T(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(M,x=1){o.set(M),l=x,p(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(M){l=M,p(o,l)},render:_,addToRenderList:m,dispose:T}}function fp(s,t){const e=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=f(null);let r=i,a=!1;function o(y,R,z,F,H){let U=!1;const N=u(F,z,R);r!==N&&(r=N,c(r.object)),U=d(y,F,z,H),U&&g(y,F,z,H),H!==null&&t.update(H,s.ELEMENT_ARRAY_BUFFER),(U||a)&&(a=!1,x(y,R,z,F),H!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(H).buffer))}function l(){return s.createVertexArray()}function c(y){return s.bindVertexArray(y)}function h(y){return s.deleteVertexArray(y)}function u(y,R,z){const F=z.wireframe===!0;let H=n[y.id];H===void 0&&(H={},n[y.id]=H);let U=H[R.id];U===void 0&&(U={},H[R.id]=U);let N=U[F];return N===void 0&&(N=f(l()),U[F]=N),N}function f(y){const R=[],z=[],F=[];for(let H=0;H<e;H++)R[H]=0,z[H]=0,F[H]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:R,enabledAttributes:z,attributeDivisors:F,object:y,attributes:{},index:null}}function d(y,R,z,F){const H=r.attributes,U=R.attributes;let N=0;const X=z.getAttributes();for(const k in X)if(X[k].location>=0){const st=H[k];let ft=U[k];if(ft===void 0&&(k==="instanceMatrix"&&y.instanceMatrix&&(ft=y.instanceMatrix),k==="instanceColor"&&y.instanceColor&&(ft=y.instanceColor)),st===void 0||st.attribute!==ft||ft&&st.data!==ft.data)return!0;N++}return r.attributesNum!==N||r.index!==F}function g(y,R,z,F){const H={},U=R.attributes;let N=0;const X=z.getAttributes();for(const k in X)if(X[k].location>=0){let st=U[k];st===void 0&&(k==="instanceMatrix"&&y.instanceMatrix&&(st=y.instanceMatrix),k==="instanceColor"&&y.instanceColor&&(st=y.instanceColor));const ft={};ft.attribute=st,st&&st.data&&(ft.data=st.data),H[k]=ft,N++}r.attributes=H,r.attributesNum=N,r.index=F}function _(){const y=r.newAttributes;for(let R=0,z=y.length;R<z;R++)y[R]=0}function m(y){p(y,0)}function p(y,R){const z=r.newAttributes,F=r.enabledAttributes,H=r.attributeDivisors;z[y]=1,F[y]===0&&(s.enableVertexAttribArray(y),F[y]=1),H[y]!==R&&(s.vertexAttribDivisor(y,R),H[y]=R)}function T(){const y=r.newAttributes,R=r.enabledAttributes;for(let z=0,F=R.length;z<F;z++)R[z]!==y[z]&&(s.disableVertexAttribArray(z),R[z]=0)}function M(y,R,z,F,H,U,N){N===!0?s.vertexAttribIPointer(y,R,z,H,U):s.vertexAttribPointer(y,R,z,F,H,U)}function x(y,R,z,F){_();const H=F.attributes,U=z.getAttributes(),N=R.defaultAttributeValues;for(const X in U){const k=U[X];if(k.location>=0){let Z=H[X];if(Z===void 0&&(X==="instanceMatrix"&&y.instanceMatrix&&(Z=y.instanceMatrix),X==="instanceColor"&&y.instanceColor&&(Z=y.instanceColor)),Z!==void 0){const st=Z.normalized,ft=Z.itemSize,Rt=t.get(Z);if(Rt===void 0)continue;const Gt=Rt.buffer,Y=Rt.type,et=Rt.bytesPerElement,mt=Y===s.INT||Y===s.UNSIGNED_INT||Z.gpuType===Sa;if(Z.isInterleavedBufferAttribute){const Q=Z.data,at=Q.stride,Ot=Z.offset;if(Q.isInstancedInterleavedBuffer){for(let bt=0;bt<k.locationSize;bt++)p(k.location+bt,Q.meshPerAttribute);y.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let bt=0;bt<k.locationSize;bt++)m(k.location+bt);s.bindBuffer(s.ARRAY_BUFFER,Gt);for(let bt=0;bt<k.locationSize;bt++)M(k.location+bt,ft/k.locationSize,Y,st,at*et,(Ot+ft/k.locationSize*bt)*et,mt)}else{if(Z.isInstancedBufferAttribute){for(let Q=0;Q<k.locationSize;Q++)p(k.location+Q,Z.meshPerAttribute);y.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=Z.meshPerAttribute*Z.count)}else for(let Q=0;Q<k.locationSize;Q++)m(k.location+Q);s.bindBuffer(s.ARRAY_BUFFER,Gt);for(let Q=0;Q<k.locationSize;Q++)M(k.location+Q,ft/k.locationSize,Y,st,ft*et,ft/k.locationSize*Q*et,mt)}}else if(N!==void 0){const st=N[X];if(st!==void 0)switch(st.length){case 2:s.vertexAttrib2fv(k.location,st);break;case 3:s.vertexAttrib3fv(k.location,st);break;case 4:s.vertexAttrib4fv(k.location,st);break;default:s.vertexAttrib1fv(k.location,st)}}}}T()}function w(){P();for(const y in n){const R=n[y];for(const z in R){const F=R[z];for(const H in F)h(F[H].object),delete F[H];delete R[z]}delete n[y]}}function b(y){if(n[y.id]===void 0)return;const R=n[y.id];for(const z in R){const F=R[z];for(const H in F)h(F[H].object),delete F[H];delete R[z]}delete n[y.id]}function A(y){for(const R in n){const z=n[R];if(z[y.id]===void 0)continue;const F=z[y.id];for(const H in F)h(F[H].object),delete F[H];delete z[y.id]}}function P(){E(),a=!0,r!==i&&(r=i,c(r.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:P,resetDefaultState:E,dispose:w,releaseStatesOfGeometry:b,releaseStatesOfProgram:A,initAttributes:_,enableAttribute:m,disableUnusedAttributes:T}}function pp(s,t,e){let n;function i(c){n=c}function r(c,h){s.drawArrays(n,c,h),e.update(h,n,1)}function a(c,h,u){u!==0&&(s.drawArraysInstanced(n,c,h,u),e.update(h,n,u))}function o(c,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,u);let d=0;for(let g=0;g<u;g++)d+=h[g];e.update(d,n,1)}function l(c,h,u,f){if(u===0)return;const d=t.get("WEBGL_multi_draw");if(d===null)for(let g=0;g<c.length;g++)a(c[g],h[g],f[g]);else{d.multiDrawArraysInstancedWEBGL(n,c,0,h,0,f,0,u);let g=0;for(let _=0;_<u;_++)g+=h[_]*f[_];e.update(g,n,1)}}this.setMode=i,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function mp(s,t,e,n){let i;function r(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){const A=t.get("EXT_texture_filter_anisotropic");i=s.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(A){return!(A!==$e&&n.convert(A)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(A){const P=A===$i&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(A!==nn&&n.convert(A)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==dn&&!P)}function l(A){if(A==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=e.logarithmicDepthBuffer===!0,f=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),d=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),g=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=s.getParameter(s.MAX_TEXTURE_SIZE),m=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),p=s.getParameter(s.MAX_VERTEX_ATTRIBS),T=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),M=s.getParameter(s.MAX_VARYING_VECTORS),x=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),w=g>0,b=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reverseDepthBuffer:f,maxTextures:d,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:T,maxVaryings:M,maxFragmentUniforms:x,vertexTextures:w,maxSamples:b}}function gp(s){const t=this;let e=null,n=0,i=!1,r=!1;const a=new ke,o=new Yt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){const d=u.length!==0||f||n!==0||i;return i=f,n=u.length,d},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){e=h(u,f,0)},this.setState=function(u,f,d){const g=u.clippingPlanes,_=u.clipIntersection,m=u.clipShadows,p=s.get(u);if(!i||g===null||g.length===0||r&&!m)r?h(null):c();else{const T=r?0:n,M=T*4;let x=p.clippingState||null;l.value=x,x=h(g,f,M,d);for(let w=0;w!==M;++w)x[w]=e[w];p.clippingState=x,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=T}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,f,d,g){const _=u!==null?u.length:0;let m=null;if(_!==0){if(m=l.value,g!==!0||m===null){const p=d+_*4,T=f.matrixWorldInverse;o.getNormalMatrix(T),(m===null||m.length<p)&&(m=new Float32Array(p));for(let M=0,x=d;M!==_;++M,x+=4)a.copy(u[M]).applyMatrix4(T,o),a.normal.toArray(m,x),m[x+3]=a.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,m}}function _p(s){let t=new WeakMap;function e(a,o){return o===zr?a.mapping=yi:o===kr&&(a.mapping=Si),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===zr||o===kr)if(t.has(a)){const l=t.get(a).texture;return e(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new Ph(l.height);return c.fromEquirectangularTexture(s,a),t.set(a,c),a.addEventListener("dispose",i),e(c.texture,a.mapping)}else return null}}return a}function i(a){const o=a.target;o.removeEventListener("dispose",i);const l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}const mi=4,Uo=[.125,.215,.35,.446,.526,.582],kn=20,Sr=new zl,Fo=new qt;let Er=null,Tr=0,br=0,wr=!1;const Bn=(1+Math.sqrt(5))/2,ui=1/Bn,Bo=[new D(-Bn,ui,0),new D(Bn,ui,0),new D(-ui,0,Bn),new D(ui,0,Bn),new D(0,Bn,-ui),new D(0,Bn,ui),new D(-1,1,-1),new D(1,1,-1),new D(-1,1,1),new D(1,1,1)],vp=new D;class zo{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100,r={}){const{size:a=256,position:o=vp}=r;Er=this._renderer.getRenderTarget(),Tr=this._renderer.getActiveCubeFace(),br=this._renderer.getActiveMipmapLevel(),wr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,n,i,l,o),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Vo(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ho(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Er,Tr,br),this._renderer.xr.enabled=wr,t.scissorTest=!1,bs(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===yi||t.mapping===Si?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Er=this._renderer.getRenderTarget(),Tr=this._renderer.getActiveCubeFace(),br=this._renderer.getActiveMipmapLevel(),wr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:en,minFilter:en,generateMipmaps:!1,type:$i,format:$e,colorSpace:Ei,depthBuffer:!1},i=ko(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=ko(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=xp(r)),this._blurMaterial=Mp(r,t,e)}return i}_compileMaterial(t){const e=new Tt(this._lodPlanes[0],t);this._renderer.compile(e,Sr)}_sceneToCubeUV(t,e,n,i,r){const l=new Ne(90,1,e,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,d=u.toneMapping;u.getClearColor(Fo),u.toneMapping=Cn,u.autoClear=!1;const g=new Ze({name:"PMREM.Background",side:be,depthWrite:!1,depthTest:!1}),_=new Tt(new kt,g);let m=!1;const p=t.background;p?p.isColor&&(g.color.copy(p),t.background=null,m=!0):(g.color.copy(Fo),m=!0);for(let T=0;T<6;T++){const M=T%3;M===0?(l.up.set(0,c[T],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[T],r.y,r.z)):M===1?(l.up.set(0,0,c[T]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[T],r.z)):(l.up.set(0,c[T],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[T]));const x=this._cubeSize;bs(i,M*x,T>2?x:0,x,x),u.setRenderTarget(i),m&&u.render(_,l),u.render(t,l)}_.geometry.dispose(),_.material.dispose(),u.toneMapping=d,u.autoClear=f,t.background=p}_textureToCubeUV(t,e){const n=this._renderer,i=t.mapping===yi||t.mapping===Si;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Vo()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ho());const r=i?this._cubemapMaterial:this._equirectMaterial,a=new Tt(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=t;const l=this._cubeSize;bs(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(a,Sr)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const i=this._lodPlanes.length;for(let r=1;r<i;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=Bo[(i-r-1)%Bo.length];this._blur(t,r-1,r,a,o)}e.autoClear=n}_blur(t,e,n,i,r){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,i,"latitudinal",r),this._halfBlur(a,t,n,n,i,"longitudinal",r)}_halfBlur(t,e,n,i,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new Tt(this._lodPlanes[i],c),f=c.uniforms,d=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*kn-1),_=r/g,m=isFinite(r)?1+Math.floor(h*_):kn;m>kn&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${kn}`);const p=[];let T=0;for(let A=0;A<kn;++A){const P=A/_,E=Math.exp(-P*P/2);p.push(E),A===0?T+=E:A<m&&(T+=2*E)}for(let A=0;A<p.length;A++)p[A]=p[A]/T;f.envMap.value=t.texture,f.samples.value=m,f.weights.value=p,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);const{_lodMax:M}=this;f.dTheta.value=g,f.mipInt.value=M-n;const x=this._sizeLods[i],w=3*x*(i>M-mi?i-M+mi:0),b=4*(this._cubeSize-x);bs(e,w,b,3*x,2*x),l.setRenderTarget(e),l.render(u,Sr)}}function xp(s){const t=[],e=[],n=[];let i=s;const r=s-mi+1+Uo.length;for(let a=0;a<r;a++){const o=Math.pow(2,i);e.push(o);let l=1/o;a>s-mi?l=Uo[a-s+mi-1]:a===0&&(l=0),n.push(l);const c=1/(o-2),h=-c,u=1+c,f=[h,h,u,h,u,u,h,h,u,u,h,u],d=6,g=6,_=3,m=2,p=1,T=new Float32Array(_*g*d),M=new Float32Array(m*g*d),x=new Float32Array(p*g*d);for(let b=0;b<d;b++){const A=b%3*2/3-1,P=b>2?0:-1,E=[A,P,0,A+2/3,P,0,A+2/3,P+1,0,A,P,0,A+2/3,P+1,0,A,P+1,0];T.set(E,_*g*b),M.set(f,m*g*b);const y=[b,b,b,b,b,b];x.set(y,p*g*b)}const w=new we;w.setAttribute("position",new De(T,_)),w.setAttribute("uv",new De(M,m)),w.setAttribute("faceIndex",new De(x,p)),t.push(w),i>mi&&i--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function ko(s,t,e){const n=new Xn(s,t,e);return n.texture.mapping=zs,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function bs(s,t,e,n,i){s.viewport.set(t,e,n,i),s.scissor.set(t,e,n,i)}function Mp(s,t,e){const n=new Float32Array(kn),i=new D(0,1,0);return new Rn({name:"SphericalGaussianBlur",defines:{n:kn,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:za(),fragmentShader:`

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
		`,blending:wn,depthTest:!1,depthWrite:!1})}function Ho(){return new Rn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:za(),fragmentShader:`

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
		`,blending:wn,depthTest:!1,depthWrite:!1})}function Vo(){return new Rn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:za(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:wn,depthTest:!1,depthWrite:!1})}function za(){return`

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
	`}function yp(s){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===zr||l===kr,h=l===yi||l===Si;if(c||h){let u=t.get(o);const f=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==f)return e===null&&(e=new zo(s)),u=c?e.fromEquirectangular(o,u):e.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),u.texture;if(u!==void 0)return u.texture;{const d=o.image;return c&&d&&d.height>0||h&&d&&i(d)?(e===null&&(e=new zo(s)),u=c?e.fromEquirectangular(o):e.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),o.addEventListener("dispose",r),u.texture):null}}}return o}function i(o){let l=0;const c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function r(o){const l=o.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:a}}function Sp(s){const t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const i=e(n);return i===null&&vi("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Ep(s,t,e,n){const i={},r=new WeakMap;function a(u){const f=u.target;f.index!==null&&t.remove(f.index);for(const g in f.attributes)t.remove(f.attributes[g]);f.removeEventListener("dispose",a),delete i[f.id];const d=r.get(f);d&&(t.remove(d),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function o(u,f){return i[f.id]===!0||(f.addEventListener("dispose",a),i[f.id]=!0,e.memory.geometries++),f}function l(u){const f=u.attributes;for(const d in f)t.update(f[d],s.ARRAY_BUFFER)}function c(u){const f=[],d=u.index,g=u.attributes.position;let _=0;if(d!==null){const T=d.array;_=d.version;for(let M=0,x=T.length;M<x;M+=3){const w=T[M+0],b=T[M+1],A=T[M+2];f.push(w,b,b,A,A,w)}}else if(g!==void 0){const T=g.array;_=g.version;for(let M=0,x=T.length/3-1;M<x;M+=3){const w=M+0,b=M+1,A=M+2;f.push(w,b,b,A,A,w)}}else return;const m=new(Ml(f)?Tl:El)(f,1);m.version=_;const p=r.get(u);p&&t.remove(p),r.set(u,m)}function h(u){const f=r.get(u);if(f){const d=u.index;d!==null&&f.version<d.version&&c(u)}else c(u);return r.get(u)}return{get:o,update:l,getWireframeAttribute:h}}function Tp(s,t,e){let n;function i(f){n=f}let r,a;function o(f){r=f.type,a=f.bytesPerElement}function l(f,d){s.drawElements(n,d,r,f*a),e.update(d,n,1)}function c(f,d,g){g!==0&&(s.drawElementsInstanced(n,d,r,f*a,g),e.update(d,n,g))}function h(f,d,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,f,0,g);let m=0;for(let p=0;p<g;p++)m+=d[p];e.update(m,n,1)}function u(f,d,g,_){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<f.length;p++)c(f[p]/a,d[p],_[p]);else{m.multiDrawElementsInstancedWEBGL(n,d,0,r,f,0,_,0,g);let p=0;for(let T=0;T<g;T++)p+=d[T]*_[T];e.update(p,n,1)}}this.setMode=i,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function bp(s){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case s.TRIANGLES:e.triangles+=o*(r/3);break;case s.LINES:e.lines+=o*(r/2);break;case s.LINE_STRIP:e.lines+=o*(r-1);break;case s.LINE_LOOP:e.lines+=o*r;break;case s.POINTS:e.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function wp(s,t,e){const n=new WeakMap,i=new re;function r(a,o,l){const c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0;let f=n.get(o);if(f===void 0||f.count!==u){let y=function(){P.dispose(),n.delete(o),o.removeEventListener("dispose",y)};var d=y;f!==void 0&&f.texture.dispose();const g=o.morphAttributes.position!==void 0,_=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],T=o.morphAttributes.normal||[],M=o.morphAttributes.color||[];let x=0;g===!0&&(x=1),_===!0&&(x=2),m===!0&&(x=3);let w=o.attributes.position.count*x,b=1;w>t.maxTextureSize&&(b=Math.ceil(w/t.maxTextureSize),w=t.maxTextureSize);const A=new Float32Array(w*b*4*u),P=new yl(A,w,b,u);P.type=dn,P.needsUpdate=!0;const E=x*4;for(let R=0;R<u;R++){const z=p[R],F=T[R],H=M[R],U=w*b*4*R;for(let N=0;N<z.count;N++){const X=N*E;g===!0&&(i.fromBufferAttribute(z,N),A[U+X+0]=i.x,A[U+X+1]=i.y,A[U+X+2]=i.z,A[U+X+3]=0),_===!0&&(i.fromBufferAttribute(F,N),A[U+X+4]=i.x,A[U+X+5]=i.y,A[U+X+6]=i.z,A[U+X+7]=0),m===!0&&(i.fromBufferAttribute(H,N),A[U+X+8]=i.x,A[U+X+9]=i.y,A[U+X+10]=i.z,A[U+X+11]=H.itemSize===4?i.w:1)}}f={count:u,texture:P,size:new ot(w,b)},n.set(o,f),o.addEventListener("dispose",y)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",a.morphTexture,e);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];const _=o.morphTargetsRelative?1:1-g;l.getUniforms().setValue(s,"morphTargetBaseInfluence",_),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",f.texture,e),l.getUniforms().setValue(s,"morphTargetsTextureSize",f.size)}return{update:r}}function Cp(s,t,e,n){let i=new WeakMap;function r(l){const c=n.render.frame,h=l.geometry,u=t.get(l,h);if(i.get(u)!==c&&(t.update(u),i.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),i.get(l)!==c&&(e.update(l.instanceMatrix,s.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,s.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;i.get(f)!==c&&(f.update(),i.set(f,c))}return u}function a(){i=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:a}}const Vl=new Pe,Go=new Rl(1,1),Gl=new yl,Wl=new ph,Xl=new Cl,Wo=[],Xo=[],Yo=new Float32Array(16),qo=new Float32Array(9),Ko=new Float32Array(4);function Ci(s,t,e){const n=s[0];if(n<=0||n>0)return s;const i=t*e;let r=Wo[i];if(r===void 0&&(r=new Float32Array(i),Wo[i]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,s[a].toArray(r,o)}return r}function ve(s,t){if(s.length!==t.length)return!1;for(let e=0,n=s.length;e<n;e++)if(s[e]!==t[e])return!1;return!0}function xe(s,t){for(let e=0,n=t.length;e<n;e++)s[e]=t[e]}function Ws(s,t){let e=Xo[t];e===void 0&&(e=new Int32Array(t),Xo[t]=e);for(let n=0;n!==t;++n)e[n]=s.allocateTextureUnit();return e}function Ap(s,t){const e=this.cache;e[0]!==t&&(s.uniform1f(this.addr,t),e[0]=t)}function Rp(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ve(e,t))return;s.uniform2fv(this.addr,t),xe(e,t)}}function Dp(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(ve(e,t))return;s.uniform3fv(this.addr,t),xe(e,t)}}function Pp(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ve(e,t))return;s.uniform4fv(this.addr,t),xe(e,t)}}function Lp(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(ve(e,t))return;s.uniformMatrix2fv(this.addr,!1,t),xe(e,t)}else{if(ve(e,n))return;Ko.set(n),s.uniformMatrix2fv(this.addr,!1,Ko),xe(e,n)}}function Ip(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(ve(e,t))return;s.uniformMatrix3fv(this.addr,!1,t),xe(e,t)}else{if(ve(e,n))return;qo.set(n),s.uniformMatrix3fv(this.addr,!1,qo),xe(e,n)}}function Np(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(ve(e,t))return;s.uniformMatrix4fv(this.addr,!1,t),xe(e,t)}else{if(ve(e,n))return;Yo.set(n),s.uniformMatrix4fv(this.addr,!1,Yo),xe(e,n)}}function Op(s,t){const e=this.cache;e[0]!==t&&(s.uniform1i(this.addr,t),e[0]=t)}function Up(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ve(e,t))return;s.uniform2iv(this.addr,t),xe(e,t)}}function Fp(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ve(e,t))return;s.uniform3iv(this.addr,t),xe(e,t)}}function Bp(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ve(e,t))return;s.uniform4iv(this.addr,t),xe(e,t)}}function zp(s,t){const e=this.cache;e[0]!==t&&(s.uniform1ui(this.addr,t),e[0]=t)}function kp(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ve(e,t))return;s.uniform2uiv(this.addr,t),xe(e,t)}}function Hp(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ve(e,t))return;s.uniform3uiv(this.addr,t),xe(e,t)}}function Vp(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ve(e,t))return;s.uniform4uiv(this.addr,t),xe(e,t)}}function Gp(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(Go.compareFunction=xl,r=Go):r=Vl,e.setTexture2D(t||r,i)}function Wp(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||Wl,i)}function Xp(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||Xl,i)}function Yp(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||Gl,i)}function qp(s){switch(s){case 5126:return Ap;case 35664:return Rp;case 35665:return Dp;case 35666:return Pp;case 35674:return Lp;case 35675:return Ip;case 35676:return Np;case 5124:case 35670:return Op;case 35667:case 35671:return Up;case 35668:case 35672:return Fp;case 35669:case 35673:return Bp;case 5125:return zp;case 36294:return kp;case 36295:return Hp;case 36296:return Vp;case 35678:case 36198:case 36298:case 36306:case 35682:return Gp;case 35679:case 36299:case 36307:return Wp;case 35680:case 36300:case 36308:case 36293:return Xp;case 36289:case 36303:case 36311:case 36292:return Yp}}function Kp(s,t){s.uniform1fv(this.addr,t)}function Zp(s,t){const e=Ci(t,this.size,2);s.uniform2fv(this.addr,e)}function jp(s,t){const e=Ci(t,this.size,3);s.uniform3fv(this.addr,e)}function $p(s,t){const e=Ci(t,this.size,4);s.uniform4fv(this.addr,e)}function Jp(s,t){const e=Ci(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,e)}function Qp(s,t){const e=Ci(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,e)}function tm(s,t){const e=Ci(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,e)}function em(s,t){s.uniform1iv(this.addr,t)}function nm(s,t){s.uniform2iv(this.addr,t)}function im(s,t){s.uniform3iv(this.addr,t)}function sm(s,t){s.uniform4iv(this.addr,t)}function rm(s,t){s.uniform1uiv(this.addr,t)}function am(s,t){s.uniform2uiv(this.addr,t)}function om(s,t){s.uniform3uiv(this.addr,t)}function lm(s,t){s.uniform4uiv(this.addr,t)}function cm(s,t,e){const n=this.cache,i=t.length,r=Ws(e,i);ve(n,r)||(s.uniform1iv(this.addr,r),xe(n,r));for(let a=0;a!==i;++a)e.setTexture2D(t[a]||Vl,r[a])}function hm(s,t,e){const n=this.cache,i=t.length,r=Ws(e,i);ve(n,r)||(s.uniform1iv(this.addr,r),xe(n,r));for(let a=0;a!==i;++a)e.setTexture3D(t[a]||Wl,r[a])}function um(s,t,e){const n=this.cache,i=t.length,r=Ws(e,i);ve(n,r)||(s.uniform1iv(this.addr,r),xe(n,r));for(let a=0;a!==i;++a)e.setTextureCube(t[a]||Xl,r[a])}function dm(s,t,e){const n=this.cache,i=t.length,r=Ws(e,i);ve(n,r)||(s.uniform1iv(this.addr,r),xe(n,r));for(let a=0;a!==i;++a)e.setTexture2DArray(t[a]||Gl,r[a])}function fm(s){switch(s){case 5126:return Kp;case 35664:return Zp;case 35665:return jp;case 35666:return $p;case 35674:return Jp;case 35675:return Qp;case 35676:return tm;case 5124:case 35670:return em;case 35667:case 35671:return nm;case 35668:case 35672:return im;case 35669:case 35673:return sm;case 5125:return rm;case 36294:return am;case 36295:return om;case 36296:return lm;case 35678:case 36198:case 36298:case 36306:case 35682:return cm;case 35679:case 36299:case 36307:return hm;case 35680:case 36300:case 36308:case 36293:return um;case 36289:case 36303:case 36311:case 36292:return dm}}class pm{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=qp(e.type)}}class mm{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=fm(e.type)}}class gm{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const i=this.seq;for(let r=0,a=i.length;r!==a;++r){const o=i[r];o.setValue(t,e[o.id],n)}}}const Cr=/(\w+)(\])?(\[|\.)?/g;function Zo(s,t){s.seq.push(t),s.map[t.id]=t}function _m(s,t,e){const n=s.name,i=n.length;for(Cr.lastIndex=0;;){const r=Cr.exec(n),a=Cr.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===i){Zo(e,c===void 0?new pm(o,s,t):new mm(o,s,t));break}else{let u=e.map[o];u===void 0&&(u=new gm(o),Zo(e,u)),e=u}}}class Is{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const r=t.getActiveUniform(e,i),a=t.getUniformLocation(e,r.name);_m(r,a,this)}}setValue(t,e,n,i){const r=this.map[e];r!==void 0&&r.setValue(t,n,i)}setOptional(t,e,n){const i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let r=0,a=e.length;r!==a;++r){const o=e[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,i)}}static seqWithValue(t,e){const n=[];for(let i=0,r=t.length;i!==r;++i){const a=t[i];a.id in e&&n.push(a)}return n}}function jo(s,t,e){const n=s.createShader(t);return s.shaderSource(n,e),s.compileShader(n),n}const vm=37297;let xm=0;function Mm(s,t){const e=s.split(`
`),n=[],i=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=i;a<r;a++){const o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}const $o=new Yt;function ym(s){Qt._getMatrix($o,Qt.workingColorSpace,s);const t=`mat3( ${$o.elements.map(e=>e.toFixed(4))} )`;switch(Qt.getTransfer(s)){case Ns:return[t,"LinearTransferOETF"];case ie:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",s),[t,"LinearTransferOETF"]}}function Jo(s,t,e){const n=s.getShaderParameter(t,s.COMPILE_STATUS),i=s.getShaderInfoLog(t).trim();if(n&&i==="")return"";const r=/ERROR: 0:(\d+)/.exec(i);if(r){const a=parseInt(r[1]);return e.toUpperCase()+`

`+i+`

`+Mm(s.getShaderSource(t),a)}else return i}function Sm(s,t){const e=ym(t);return[`vec4 ${s}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function Em(s,t){let e;switch(t){case bc:e="Linear";break;case wc:e="Reinhard";break;case Cc:e="Cineon";break;case Ac:e="ACESFilmic";break;case Dc:e="AgX";break;case Pc:e="Neutral";break;case Rc:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+s+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const ws=new D;function Tm(){Qt.getLuminanceCoefficients(ws);const s=ws.x.toFixed(4),t=ws.y.toFixed(4),e=ws.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function bm(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ui).join(`
`)}function wm(s){const t=[];for(const e in s){const n=s[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Cm(s,t){const e={},n=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const r=s.getActiveAttrib(t,i),a=r.name;let o=1;r.type===s.FLOAT_MAT2&&(o=2),r.type===s.FLOAT_MAT3&&(o=3),r.type===s.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:s.getAttribLocation(t,a),locationSize:o}}return e}function Ui(s){return s!==""}function Qo(s,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function tl(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Am=/^[ \t]*#include +<([\w\d./]+)>/gm;function xa(s){return s.replace(Am,Dm)}const Rm=new Map;function Dm(s,t){let e=Kt[t];if(e===void 0){const n=Rm.get(t);if(n!==void 0)e=Kt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return xa(e)}const Pm=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function el(s){return s.replace(Pm,Lm)}function Lm(s,t,e,n){let i="";for(let r=parseInt(t);r<parseInt(e);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function nl(s){let t=`precision ${s.precision} float;
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
#define LOW_PRECISION`),t}function Im(s){let t="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===cl?t="SHADOWMAP_TYPE_PCF":s.shadowMapType===sc?t="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===un&&(t="SHADOWMAP_TYPE_VSM"),t}function Nm(s){let t="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case yi:case Si:t="ENVMAP_TYPE_CUBE";break;case zs:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Om(s){let t="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case Si:t="ENVMAP_MODE_REFRACTION";break}return t}function Um(s){let t="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case ya:t="ENVMAP_BLENDING_MULTIPLY";break;case Ec:t="ENVMAP_BLENDING_MIX";break;case Tc:t="ENVMAP_BLENDING_ADD";break}return t}function Fm(s){const t=s.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function Bm(s,t,e,n){const i=s.getContext(),r=e.defines;let a=e.vertexShader,o=e.fragmentShader;const l=Im(e),c=Nm(e),h=Om(e),u=Um(e),f=Fm(e),d=bm(e),g=wm(r),_=i.createProgram();let m,p,T=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Ui).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Ui).join(`
`),p.length>0&&(p+=`
`)):(m=[nl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ui).join(`
`),p=[nl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Cn?"#define TONE_MAPPING":"",e.toneMapping!==Cn?Kt.tonemapping_pars_fragment:"",e.toneMapping!==Cn?Em("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Kt.colorspace_pars_fragment,Sm("linearToOutputTexel",e.outputColorSpace),Tm(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Ui).join(`
`)),a=xa(a),a=Qo(a,e),a=tl(a,e),o=xa(o),o=Qo(o,e),o=tl(o,e),a=el(a),o=el(o),e.isRawShaderMaterial!==!0&&(T=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===eo?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===eo?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const M=T+m+a,x=T+p+o,w=jo(i,i.VERTEX_SHADER,M),b=jo(i,i.FRAGMENT_SHADER,x);i.attachShader(_,w),i.attachShader(_,b),e.index0AttributeName!==void 0?i.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_);function A(R){if(s.debug.checkShaderErrors){const z=i.getProgramInfoLog(_).trim(),F=i.getShaderInfoLog(w).trim(),H=i.getShaderInfoLog(b).trim();let U=!0,N=!0;if(i.getProgramParameter(_,i.LINK_STATUS)===!1)if(U=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,_,w,b);else{const X=Jo(i,w,"vertex"),k=Jo(i,b,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,i.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+z+`
`+X+`
`+k)}else z!==""?console.warn("THREE.WebGLProgram: Program Info Log:",z):(F===""||H==="")&&(N=!1);N&&(R.diagnostics={runnable:U,programLog:z,vertexShader:{log:F,prefix:m},fragmentShader:{log:H,prefix:p}})}i.deleteShader(w),i.deleteShader(b),P=new Is(i,_),E=Cm(i,_)}let P;this.getUniforms=function(){return P===void 0&&A(this),P};let E;this.getAttributes=function(){return E===void 0&&A(this),E};let y=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=i.getProgramParameter(_,vm)),y},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=xm++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=w,this.fragmentShader=b,this}let zm=0;class km{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new Hm(t),e.set(t,n)),n}}class Hm{constructor(t){this.id=zm++,this.code=t,this.usedTimes=0}}function Vm(s,t,e,n,i,r,a){const o=new Pa,l=new km,c=new Set,h=[],u=i.logarithmicDepthBuffer,f=i.vertexTextures;let d=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(E){return c.add(E),E===0?"uv":`uv${E}`}function m(E,y,R,z,F){const H=z.fog,U=F.geometry,N=E.isMeshStandardMaterial?z.environment:null,X=(E.isMeshStandardMaterial?e:t).get(E.envMap||N),k=X&&X.mapping===zs?X.image.height:null,Z=g[E.type];E.precision!==null&&(d=i.getMaxPrecision(E.precision),d!==E.precision&&console.warn("THREE.WebGLProgram.getParameters:",E.precision,"not supported, using",d,"instead."));const st=U.morphAttributes.position||U.morphAttributes.normal||U.morphAttributes.color,ft=st!==void 0?st.length:0;let Rt=0;U.morphAttributes.position!==void 0&&(Rt=1),U.morphAttributes.normal!==void 0&&(Rt=2),U.morphAttributes.color!==void 0&&(Rt=3);let Gt,Y,et,mt;if(Z){const ee=tn[Z];Gt=ee.vertexShader,Y=ee.fragmentShader}else Gt=E.vertexShader,Y=E.fragmentShader,l.update(E),et=l.getVertexShaderID(E),mt=l.getFragmentShaderID(E);const Q=s.getRenderTarget(),at=s.state.buffers.depth.getReversed(),Ot=F.isInstancedMesh===!0,bt=F.isBatchedMesh===!0,Xt=!!E.map,Ft=!!E.matcap,jt=!!X,L=!!E.aoMap,Pt=!!E.lightMap,pt=!!E.bumpMap,Lt=!!E.normalMap,rt=!!E.displacementMap,wt=!!E.emissiveMap,gt=!!E.metalnessMap,St=!!E.roughnessMap,Ht=E.anisotropy>0,C=E.clearcoat>0,v=E.dispersion>0,V=E.iridescence>0,K=E.sheen>0,$=E.transmission>0,q=Ht&&!!E.anisotropyMap,Ct=C&&!!E.clearcoatMap,ht=C&&!!E.clearcoatNormalMap,Et=C&&!!E.clearcoatRoughnessMap,At=V&&!!E.iridescenceMap,J=V&&!!E.iridescenceThicknessMap,_t=K&&!!E.sheenColorMap,Ut=K&&!!E.sheenRoughnessMap,Nt=!!E.specularMap,lt=!!E.specularColorMap,Vt=!!E.specularIntensityMap,I=$&&!!E.transmissionMap,ut=$&&!!E.thicknessMap,tt=!!E.gradientMap,xt=!!E.alphaMap,nt=E.alphaTest>0,j=!!E.alphaHash,Mt=!!E.extensions;let Wt=Cn;E.toneMapped&&(Q===null||Q.isXRRenderTarget===!0)&&(Wt=s.toneMapping);const le={shaderID:Z,shaderType:E.type,shaderName:E.name,vertexShader:Gt,fragmentShader:Y,defines:E.defines,customVertexShaderID:et,customFragmentShaderID:mt,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:d,batching:bt,batchingColor:bt&&F._colorsTexture!==null,instancing:Ot,instancingColor:Ot&&F.instanceColor!==null,instancingMorph:Ot&&F.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:Q===null?s.outputColorSpace:Q.isXRRenderTarget===!0?Q.texture.colorSpace:Ei,alphaToCoverage:!!E.alphaToCoverage,map:Xt,matcap:Ft,envMap:jt,envMapMode:jt&&X.mapping,envMapCubeUVHeight:k,aoMap:L,lightMap:Pt,bumpMap:pt,normalMap:Lt,displacementMap:f&&rt,emissiveMap:wt,normalMapObjectSpace:Lt&&E.normalMapType===Oc,normalMapTangentSpace:Lt&&E.normalMapType===Aa,metalnessMap:gt,roughnessMap:St,anisotropy:Ht,anisotropyMap:q,clearcoat:C,clearcoatMap:Ct,clearcoatNormalMap:ht,clearcoatRoughnessMap:Et,dispersion:v,iridescence:V,iridescenceMap:At,iridescenceThicknessMap:J,sheen:K,sheenColorMap:_t,sheenRoughnessMap:Ut,specularMap:Nt,specularColorMap:lt,specularIntensityMap:Vt,transmission:$,transmissionMap:I,thicknessMap:ut,gradientMap:tt,opaque:E.transparent===!1&&E.blending===_i&&E.alphaToCoverage===!1,alphaMap:xt,alphaTest:nt,alphaHash:j,combine:E.combine,mapUv:Xt&&_(E.map.channel),aoMapUv:L&&_(E.aoMap.channel),lightMapUv:Pt&&_(E.lightMap.channel),bumpMapUv:pt&&_(E.bumpMap.channel),normalMapUv:Lt&&_(E.normalMap.channel),displacementMapUv:rt&&_(E.displacementMap.channel),emissiveMapUv:wt&&_(E.emissiveMap.channel),metalnessMapUv:gt&&_(E.metalnessMap.channel),roughnessMapUv:St&&_(E.roughnessMap.channel),anisotropyMapUv:q&&_(E.anisotropyMap.channel),clearcoatMapUv:Ct&&_(E.clearcoatMap.channel),clearcoatNormalMapUv:ht&&_(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Et&&_(E.clearcoatRoughnessMap.channel),iridescenceMapUv:At&&_(E.iridescenceMap.channel),iridescenceThicknessMapUv:J&&_(E.iridescenceThicknessMap.channel),sheenColorMapUv:_t&&_(E.sheenColorMap.channel),sheenRoughnessMapUv:Ut&&_(E.sheenRoughnessMap.channel),specularMapUv:Nt&&_(E.specularMap.channel),specularColorMapUv:lt&&_(E.specularColorMap.channel),specularIntensityMapUv:Vt&&_(E.specularIntensityMap.channel),transmissionMapUv:I&&_(E.transmissionMap.channel),thicknessMapUv:ut&&_(E.thicknessMap.channel),alphaMapUv:xt&&_(E.alphaMap.channel),vertexTangents:!!U.attributes.tangent&&(Lt||Ht),vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!U.attributes.color&&U.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!U.attributes.uv&&(Xt||xt),fog:!!H,useFog:E.fog===!0,fogExp2:!!H&&H.isFogExp2,flatShading:E.flatShading===!0,sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:at,skinning:F.isSkinnedMesh===!0,morphTargets:U.morphAttributes.position!==void 0,morphNormals:U.morphAttributes.normal!==void 0,morphColors:U.morphAttributes.color!==void 0,morphTargetsCount:ft,morphTextureStride:Rt,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:E.dithering,shadowMapEnabled:s.shadowMap.enabled&&R.length>0,shadowMapType:s.shadowMap.type,toneMapping:Wt,decodeVideoTexture:Xt&&E.map.isVideoTexture===!0&&Qt.getTransfer(E.map.colorSpace)===ie,decodeVideoTextureEmissive:wt&&E.emissiveMap.isVideoTexture===!0&&Qt.getTransfer(E.emissiveMap.colorSpace)===ie,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===ue,flipSided:E.side===be,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionClipCullDistance:Mt&&E.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Mt&&E.extensions.multiDraw===!0||bt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()};return le.vertexUv1s=c.has(1),le.vertexUv2s=c.has(2),le.vertexUv3s=c.has(3),c.clear(),le}function p(E){const y=[];if(E.shaderID?y.push(E.shaderID):(y.push(E.customVertexShaderID),y.push(E.customFragmentShaderID)),E.defines!==void 0)for(const R in E.defines)y.push(R),y.push(E.defines[R]);return E.isRawShaderMaterial===!1&&(T(y,E),M(y,E),y.push(s.outputColorSpace)),y.push(E.customProgramCacheKey),y.join()}function T(E,y){E.push(y.precision),E.push(y.outputColorSpace),E.push(y.envMapMode),E.push(y.envMapCubeUVHeight),E.push(y.mapUv),E.push(y.alphaMapUv),E.push(y.lightMapUv),E.push(y.aoMapUv),E.push(y.bumpMapUv),E.push(y.normalMapUv),E.push(y.displacementMapUv),E.push(y.emissiveMapUv),E.push(y.metalnessMapUv),E.push(y.roughnessMapUv),E.push(y.anisotropyMapUv),E.push(y.clearcoatMapUv),E.push(y.clearcoatNormalMapUv),E.push(y.clearcoatRoughnessMapUv),E.push(y.iridescenceMapUv),E.push(y.iridescenceThicknessMapUv),E.push(y.sheenColorMapUv),E.push(y.sheenRoughnessMapUv),E.push(y.specularMapUv),E.push(y.specularColorMapUv),E.push(y.specularIntensityMapUv),E.push(y.transmissionMapUv),E.push(y.thicknessMapUv),E.push(y.combine),E.push(y.fogExp2),E.push(y.sizeAttenuation),E.push(y.morphTargetsCount),E.push(y.morphAttributeCount),E.push(y.numDirLights),E.push(y.numPointLights),E.push(y.numSpotLights),E.push(y.numSpotLightMaps),E.push(y.numHemiLights),E.push(y.numRectAreaLights),E.push(y.numDirLightShadows),E.push(y.numPointLightShadows),E.push(y.numSpotLightShadows),E.push(y.numSpotLightShadowsWithMaps),E.push(y.numLightProbes),E.push(y.shadowMapType),E.push(y.toneMapping),E.push(y.numClippingPlanes),E.push(y.numClipIntersection),E.push(y.depthPacking)}function M(E,y){o.disableAll(),y.supportsVertexTextures&&o.enable(0),y.instancing&&o.enable(1),y.instancingColor&&o.enable(2),y.instancingMorph&&o.enable(3),y.matcap&&o.enable(4),y.envMap&&o.enable(5),y.normalMapObjectSpace&&o.enable(6),y.normalMapTangentSpace&&o.enable(7),y.clearcoat&&o.enable(8),y.iridescence&&o.enable(9),y.alphaTest&&o.enable(10),y.vertexColors&&o.enable(11),y.vertexAlphas&&o.enable(12),y.vertexUv1s&&o.enable(13),y.vertexUv2s&&o.enable(14),y.vertexUv3s&&o.enable(15),y.vertexTangents&&o.enable(16),y.anisotropy&&o.enable(17),y.alphaHash&&o.enable(18),y.batching&&o.enable(19),y.dispersion&&o.enable(20),y.batchingColor&&o.enable(21),E.push(o.mask),o.disableAll(),y.fog&&o.enable(0),y.useFog&&o.enable(1),y.flatShading&&o.enable(2),y.logarithmicDepthBuffer&&o.enable(3),y.reverseDepthBuffer&&o.enable(4),y.skinning&&o.enable(5),y.morphTargets&&o.enable(6),y.morphNormals&&o.enable(7),y.morphColors&&o.enable(8),y.premultipliedAlpha&&o.enable(9),y.shadowMapEnabled&&o.enable(10),y.doubleSided&&o.enable(11),y.flipSided&&o.enable(12),y.useDepthPacking&&o.enable(13),y.dithering&&o.enable(14),y.transmission&&o.enable(15),y.sheen&&o.enable(16),y.opaque&&o.enable(17),y.pointsUvs&&o.enable(18),y.decodeVideoTexture&&o.enable(19),y.decodeVideoTextureEmissive&&o.enable(20),y.alphaToCoverage&&o.enable(21),E.push(o.mask)}function x(E){const y=g[E.type];let R;if(y){const z=tn[y];R=Ch.clone(z.uniforms)}else R=E.uniforms;return R}function w(E,y){let R;for(let z=0,F=h.length;z<F;z++){const H=h[z];if(H.cacheKey===y){R=H,++R.usedTimes;break}}return R===void 0&&(R=new Bm(s,y,E,r),h.push(R)),R}function b(E){if(--E.usedTimes===0){const y=h.indexOf(E);h[y]=h[h.length-1],h.pop(),E.destroy()}}function A(E){l.remove(E)}function P(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:x,acquireProgram:w,releaseProgram:b,releaseShaderCache:A,programs:h,dispose:P}}function Gm(){let s=new WeakMap;function t(a){return s.has(a)}function e(a){let o=s.get(a);return o===void 0&&(o={},s.set(a,o)),o}function n(a){s.delete(a)}function i(a,o,l){s.get(a)[o]=l}function r(){s=new WeakMap}return{has:t,get:e,remove:n,update:i,dispose:r}}function Wm(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.z!==t.z?s.z-t.z:s.id-t.id}function il(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function sl(){const s=[];let t=0;const e=[],n=[],i=[];function r(){t=0,e.length=0,n.length=0,i.length=0}function a(u,f,d,g,_,m){let p=s[t];return p===void 0?(p={id:u.id,object:u,geometry:f,material:d,groupOrder:g,renderOrder:u.renderOrder,z:_,group:m},s[t]=p):(p.id=u.id,p.object=u,p.geometry=f,p.material=d,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=_,p.group=m),t++,p}function o(u,f,d,g,_,m){const p=a(u,f,d,g,_,m);d.transmission>0?n.push(p):d.transparent===!0?i.push(p):e.push(p)}function l(u,f,d,g,_,m){const p=a(u,f,d,g,_,m);d.transmission>0?n.unshift(p):d.transparent===!0?i.unshift(p):e.unshift(p)}function c(u,f){e.length>1&&e.sort(u||Wm),n.length>1&&n.sort(f||il),i.length>1&&i.sort(f||il)}function h(){for(let u=t,f=s.length;u<f;u++){const d=s[u];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:e,transmissive:n,transparent:i,init:r,push:o,unshift:l,finish:h,sort:c}}function Xm(){let s=new WeakMap;function t(n,i){const r=s.get(n);let a;return r===void 0?(a=new sl,s.set(n,[a])):i>=r.length?(a=new sl,r.push(a)):a=r[i],a}function e(){s=new WeakMap}return{get:t,dispose:e}}function Ym(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new D,color:new qt};break;case"SpotLight":e={position:new D,direction:new D,color:new qt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new D,color:new qt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new D,skyColor:new qt,groundColor:new qt};break;case"RectAreaLight":e={color:new qt,position:new D,halfWidth:new D,halfHeight:new D};break}return s[t.id]=e,e}}}function qm(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ot};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ot};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ot,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=e,e}}}let Km=0;function Zm(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function jm(s){const t=new Ym,e=qm(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new D);const i=new D,r=new oe,a=new oe;function o(c){let h=0,u=0,f=0;for(let E=0;E<9;E++)n.probe[E].set(0,0,0);let d=0,g=0,_=0,m=0,p=0,T=0,M=0,x=0,w=0,b=0,A=0;c.sort(Zm);for(let E=0,y=c.length;E<y;E++){const R=c[E],z=R.color,F=R.intensity,H=R.distance,U=R.shadow&&R.shadow.map?R.shadow.map.texture:null;if(R.isAmbientLight)h+=z.r*F,u+=z.g*F,f+=z.b*F;else if(R.isLightProbe){for(let N=0;N<9;N++)n.probe[N].addScaledVector(R.sh.coefficients[N],F);A++}else if(R.isDirectionalLight){const N=t.get(R);if(N.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){const X=R.shadow,k=e.get(R);k.shadowIntensity=X.intensity,k.shadowBias=X.bias,k.shadowNormalBias=X.normalBias,k.shadowRadius=X.radius,k.shadowMapSize=X.mapSize,n.directionalShadow[d]=k,n.directionalShadowMap[d]=U,n.directionalShadowMatrix[d]=R.shadow.matrix,T++}n.directional[d]=N,d++}else if(R.isSpotLight){const N=t.get(R);N.position.setFromMatrixPosition(R.matrixWorld),N.color.copy(z).multiplyScalar(F),N.distance=H,N.coneCos=Math.cos(R.angle),N.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),N.decay=R.decay,n.spot[_]=N;const X=R.shadow;if(R.map&&(n.spotLightMap[w]=R.map,w++,X.updateMatrices(R),R.castShadow&&b++),n.spotLightMatrix[_]=X.matrix,R.castShadow){const k=e.get(R);k.shadowIntensity=X.intensity,k.shadowBias=X.bias,k.shadowNormalBias=X.normalBias,k.shadowRadius=X.radius,k.shadowMapSize=X.mapSize,n.spotShadow[_]=k,n.spotShadowMap[_]=U,x++}_++}else if(R.isRectAreaLight){const N=t.get(R);N.color.copy(z).multiplyScalar(F),N.halfWidth.set(R.width*.5,0,0),N.halfHeight.set(0,R.height*.5,0),n.rectArea[m]=N,m++}else if(R.isPointLight){const N=t.get(R);if(N.color.copy(R.color).multiplyScalar(R.intensity),N.distance=R.distance,N.decay=R.decay,R.castShadow){const X=R.shadow,k=e.get(R);k.shadowIntensity=X.intensity,k.shadowBias=X.bias,k.shadowNormalBias=X.normalBias,k.shadowRadius=X.radius,k.shadowMapSize=X.mapSize,k.shadowCameraNear=X.camera.near,k.shadowCameraFar=X.camera.far,n.pointShadow[g]=k,n.pointShadowMap[g]=U,n.pointShadowMatrix[g]=R.shadow.matrix,M++}n.point[g]=N,g++}else if(R.isHemisphereLight){const N=t.get(R);N.skyColor.copy(R.color).multiplyScalar(F),N.groundColor.copy(R.groundColor).multiplyScalar(F),n.hemi[p]=N,p++}}m>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ct.LTC_FLOAT_1,n.rectAreaLTC2=ct.LTC_FLOAT_2):(n.rectAreaLTC1=ct.LTC_HALF_1,n.rectAreaLTC2=ct.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=f;const P=n.hash;(P.directionalLength!==d||P.pointLength!==g||P.spotLength!==_||P.rectAreaLength!==m||P.hemiLength!==p||P.numDirectionalShadows!==T||P.numPointShadows!==M||P.numSpotShadows!==x||P.numSpotMaps!==w||P.numLightProbes!==A)&&(n.directional.length=d,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=T,n.directionalShadowMap.length=T,n.pointShadow.length=M,n.pointShadowMap.length=M,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=T,n.pointShadowMatrix.length=M,n.spotLightMatrix.length=x+w-b,n.spotLightMap.length=w,n.numSpotLightShadowsWithMaps=b,n.numLightProbes=A,P.directionalLength=d,P.pointLength=g,P.spotLength=_,P.rectAreaLength=m,P.hemiLength=p,P.numDirectionalShadows=T,P.numPointShadows=M,P.numSpotShadows=x,P.numSpotMaps=w,P.numLightProbes=A,n.version=Km++)}function l(c,h){let u=0,f=0,d=0,g=0,_=0;const m=h.matrixWorldInverse;for(let p=0,T=c.length;p<T;p++){const M=c[p];if(M.isDirectionalLight){const x=n.directional[u];x.direction.setFromMatrixPosition(M.matrixWorld),i.setFromMatrixPosition(M.target.matrixWorld),x.direction.sub(i),x.direction.transformDirection(m),u++}else if(M.isSpotLight){const x=n.spot[d];x.position.setFromMatrixPosition(M.matrixWorld),x.position.applyMatrix4(m),x.direction.setFromMatrixPosition(M.matrixWorld),i.setFromMatrixPosition(M.target.matrixWorld),x.direction.sub(i),x.direction.transformDirection(m),d++}else if(M.isRectAreaLight){const x=n.rectArea[g];x.position.setFromMatrixPosition(M.matrixWorld),x.position.applyMatrix4(m),a.identity(),r.copy(M.matrixWorld),r.premultiply(m),a.extractRotation(r),x.halfWidth.set(M.width*.5,0,0),x.halfHeight.set(0,M.height*.5,0),x.halfWidth.applyMatrix4(a),x.halfHeight.applyMatrix4(a),g++}else if(M.isPointLight){const x=n.point[f];x.position.setFromMatrixPosition(M.matrixWorld),x.position.applyMatrix4(m),f++}else if(M.isHemisphereLight){const x=n.hemi[_];x.direction.setFromMatrixPosition(M.matrixWorld),x.direction.transformDirection(m),_++}}}return{setup:o,setupView:l,state:n}}function rl(s){const t=new jm(s),e=[],n=[];function i(h){c.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function a(h){n.push(h)}function o(){t.setup(e)}function l(h){t.setupView(e,h)}const c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function $m(s){let t=new WeakMap;function e(i,r=0){const a=t.get(i);let o;return a===void 0?(o=new rl(s),t.set(i,[o])):r>=a.length?(o=new rl(s),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}const Jm=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Qm=`uniform sampler2D shadow_pass;
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
}`;function tg(s,t,e){let n=new La;const i=new ot,r=new ot,a=new re,o=new mu({depthPacking:Nc}),l=new gu,c={},h=e.maxTextureSize,u={[An]:be,[be]:An,[ue]:ue},f=new Rn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ot},radius:{value:4}},vertexShader:Jm,fragmentShader:Qm}),d=f.clone();d.defines.HORIZONTAL_PASS=1;const g=new we;g.setAttribute("position",new De(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Tt(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=cl;let p=this.type;this.render=function(b,A,P){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||b.length===0)return;const E=s.getRenderTarget(),y=s.getActiveCubeFace(),R=s.getActiveMipmapLevel(),z=s.state;z.setBlending(wn),z.buffers.color.setClear(1,1,1,1),z.buffers.depth.setTest(!0),z.setScissorTest(!1);const F=p!==un&&this.type===un,H=p===un&&this.type!==un;for(let U=0,N=b.length;U<N;U++){const X=b[U],k=X.shadow;if(k===void 0){console.warn("THREE.WebGLShadowMap:",X,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;i.copy(k.mapSize);const Z=k.getFrameExtents();if(i.multiply(Z),r.copy(k.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/Z.x),i.x=r.x*Z.x,k.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/Z.y),i.y=r.y*Z.y,k.mapSize.y=r.y)),k.map===null||F===!0||H===!0){const ft=this.type!==un?{minFilter:Je,magFilter:Je}:{};k.map!==null&&k.map.dispose(),k.map=new Xn(i.x,i.y,ft),k.map.texture.name=X.name+".shadowMap",k.camera.updateProjectionMatrix()}s.setRenderTarget(k.map),s.clear();const st=k.getViewportCount();for(let ft=0;ft<st;ft++){const Rt=k.getViewport(ft);a.set(r.x*Rt.x,r.y*Rt.y,r.x*Rt.z,r.y*Rt.w),z.viewport(a),k.updateMatrices(X,ft),n=k.getFrustum(),x(A,P,k.camera,X,this.type)}k.isPointLightShadow!==!0&&this.type===un&&T(k,P),k.needsUpdate=!1}p=this.type,m.needsUpdate=!1,s.setRenderTarget(E,y,R)};function T(b,A){const P=t.update(_);f.defines.VSM_SAMPLES!==b.blurSamples&&(f.defines.VSM_SAMPLES=b.blurSamples,d.defines.VSM_SAMPLES=b.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),b.mapPass===null&&(b.mapPass=new Xn(i.x,i.y)),f.uniforms.shadow_pass.value=b.map.texture,f.uniforms.resolution.value=b.mapSize,f.uniforms.radius.value=b.radius,s.setRenderTarget(b.mapPass),s.clear(),s.renderBufferDirect(A,null,P,f,_,null),d.uniforms.shadow_pass.value=b.mapPass.texture,d.uniforms.resolution.value=b.mapSize,d.uniforms.radius.value=b.radius,s.setRenderTarget(b.map),s.clear(),s.renderBufferDirect(A,null,P,d,_,null)}function M(b,A,P,E){let y=null;const R=P.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(R!==void 0)y=R;else if(y=P.isPointLight===!0?l:o,s.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0||A.alphaToCoverage===!0){const z=y.uuid,F=A.uuid;let H=c[z];H===void 0&&(H={},c[z]=H);let U=H[F];U===void 0&&(U=y.clone(),H[F]=U,A.addEventListener("dispose",w)),y=U}if(y.visible=A.visible,y.wireframe=A.wireframe,E===un?y.side=A.shadowSide!==null?A.shadowSide:A.side:y.side=A.shadowSide!==null?A.shadowSide:u[A.side],y.alphaMap=A.alphaMap,y.alphaTest=A.alphaToCoverage===!0?.5:A.alphaTest,y.map=A.map,y.clipShadows=A.clipShadows,y.clippingPlanes=A.clippingPlanes,y.clipIntersection=A.clipIntersection,y.displacementMap=A.displacementMap,y.displacementScale=A.displacementScale,y.displacementBias=A.displacementBias,y.wireframeLinewidth=A.wireframeLinewidth,y.linewidth=A.linewidth,P.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const z=s.properties.get(y);z.light=P}return y}function x(b,A,P,E,y){if(b.visible===!1)return;if(b.layers.test(A.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&y===un)&&(!b.frustumCulled||n.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse,b.matrixWorld);const F=t.update(b),H=b.material;if(Array.isArray(H)){const U=F.groups;for(let N=0,X=U.length;N<X;N++){const k=U[N],Z=H[k.materialIndex];if(Z&&Z.visible){const st=M(b,Z,E,y);b.onBeforeShadow(s,b,A,P,F,st,k),s.renderBufferDirect(P,null,F,st,b,k),b.onAfterShadow(s,b,A,P,F,st,k)}}}else if(H.visible){const U=M(b,H,E,y);b.onBeforeShadow(s,b,A,P,F,U,null),s.renderBufferDirect(P,null,F,U,b,null),b.onAfterShadow(s,b,A,P,F,U,null)}}const z=b.children;for(let F=0,H=z.length;F<H;F++)x(z[F],A,P,E,y)}function w(b){b.target.removeEventListener("dispose",w);for(const P in c){const E=c[P],y=b.target.uuid;y in E&&(E[y].dispose(),delete E[y])}}}const eg={[Lr]:Ir,[Nr]:Fr,[Or]:Br,[Mi]:Ur,[Ir]:Lr,[Fr]:Nr,[Br]:Or,[Ur]:Mi};function ng(s,t){function e(){let I=!1;const ut=new re;let tt=null;const xt=new re(0,0,0,0);return{setMask:function(nt){tt!==nt&&!I&&(s.colorMask(nt,nt,nt,nt),tt=nt)},setLocked:function(nt){I=nt},setClear:function(nt,j,Mt,Wt,le){le===!0&&(nt*=Wt,j*=Wt,Mt*=Wt),ut.set(nt,j,Mt,Wt),xt.equals(ut)===!1&&(s.clearColor(nt,j,Mt,Wt),xt.copy(ut))},reset:function(){I=!1,tt=null,xt.set(-1,0,0,0)}}}function n(){let I=!1,ut=!1,tt=null,xt=null,nt=null;return{setReversed:function(j){if(ut!==j){const Mt=t.get("EXT_clip_control");j?Mt.clipControlEXT(Mt.LOWER_LEFT_EXT,Mt.ZERO_TO_ONE_EXT):Mt.clipControlEXT(Mt.LOWER_LEFT_EXT,Mt.NEGATIVE_ONE_TO_ONE_EXT),ut=j;const Wt=nt;nt=null,this.setClear(Wt)}},getReversed:function(){return ut},setTest:function(j){j?Q(s.DEPTH_TEST):at(s.DEPTH_TEST)},setMask:function(j){tt!==j&&!I&&(s.depthMask(j),tt=j)},setFunc:function(j){if(ut&&(j=eg[j]),xt!==j){switch(j){case Lr:s.depthFunc(s.NEVER);break;case Ir:s.depthFunc(s.ALWAYS);break;case Nr:s.depthFunc(s.LESS);break;case Mi:s.depthFunc(s.LEQUAL);break;case Or:s.depthFunc(s.EQUAL);break;case Ur:s.depthFunc(s.GEQUAL);break;case Fr:s.depthFunc(s.GREATER);break;case Br:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}xt=j}},setLocked:function(j){I=j},setClear:function(j){nt!==j&&(ut&&(j=1-j),s.clearDepth(j),nt=j)},reset:function(){I=!1,tt=null,xt=null,nt=null,ut=!1}}}function i(){let I=!1,ut=null,tt=null,xt=null,nt=null,j=null,Mt=null,Wt=null,le=null;return{setTest:function(ee){I||(ee?Q(s.STENCIL_TEST):at(s.STENCIL_TEST))},setMask:function(ee){ut!==ee&&!I&&(s.stencilMask(ee),ut=ee)},setFunc:function(ee,We,rn){(tt!==ee||xt!==We||nt!==rn)&&(s.stencilFunc(ee,We,rn),tt=ee,xt=We,nt=rn)},setOp:function(ee,We,rn){(j!==ee||Mt!==We||Wt!==rn)&&(s.stencilOp(ee,We,rn),j=ee,Mt=We,Wt=rn)},setLocked:function(ee){I=ee},setClear:function(ee){le!==ee&&(s.clearStencil(ee),le=ee)},reset:function(){I=!1,ut=null,tt=null,xt=null,nt=null,j=null,Mt=null,Wt=null,le=null}}}const r=new e,a=new n,o=new i,l=new WeakMap,c=new WeakMap;let h={},u={},f=new WeakMap,d=[],g=null,_=!1,m=null,p=null,T=null,M=null,x=null,w=null,b=null,A=new qt(0,0,0),P=0,E=!1,y=null,R=null,z=null,F=null,H=null;const U=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let N=!1,X=0;const k=s.getParameter(s.VERSION);k.indexOf("WebGL")!==-1?(X=parseFloat(/^WebGL (\d)/.exec(k)[1]),N=X>=1):k.indexOf("OpenGL ES")!==-1&&(X=parseFloat(/^OpenGL ES (\d)/.exec(k)[1]),N=X>=2);let Z=null,st={};const ft=s.getParameter(s.SCISSOR_BOX),Rt=s.getParameter(s.VIEWPORT),Gt=new re().fromArray(ft),Y=new re().fromArray(Rt);function et(I,ut,tt,xt){const nt=new Uint8Array(4),j=s.createTexture();s.bindTexture(I,j),s.texParameteri(I,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(I,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let Mt=0;Mt<tt;Mt++)I===s.TEXTURE_3D||I===s.TEXTURE_2D_ARRAY?s.texImage3D(ut,0,s.RGBA,1,1,xt,0,s.RGBA,s.UNSIGNED_BYTE,nt):s.texImage2D(ut+Mt,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,nt);return j}const mt={};mt[s.TEXTURE_2D]=et(s.TEXTURE_2D,s.TEXTURE_2D,1),mt[s.TEXTURE_CUBE_MAP]=et(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),mt[s.TEXTURE_2D_ARRAY]=et(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),mt[s.TEXTURE_3D]=et(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),Q(s.DEPTH_TEST),a.setFunc(Mi),pt(!1),Lt(Za),Q(s.CULL_FACE),L(wn);function Q(I){h[I]!==!0&&(s.enable(I),h[I]=!0)}function at(I){h[I]!==!1&&(s.disable(I),h[I]=!1)}function Ot(I,ut){return u[I]!==ut?(s.bindFramebuffer(I,ut),u[I]=ut,I===s.DRAW_FRAMEBUFFER&&(u[s.FRAMEBUFFER]=ut),I===s.FRAMEBUFFER&&(u[s.DRAW_FRAMEBUFFER]=ut),!0):!1}function bt(I,ut){let tt=d,xt=!1;if(I){tt=f.get(ut),tt===void 0&&(tt=[],f.set(ut,tt));const nt=I.textures;if(tt.length!==nt.length||tt[0]!==s.COLOR_ATTACHMENT0){for(let j=0,Mt=nt.length;j<Mt;j++)tt[j]=s.COLOR_ATTACHMENT0+j;tt.length=nt.length,xt=!0}}else tt[0]!==s.BACK&&(tt[0]=s.BACK,xt=!0);xt&&s.drawBuffers(tt)}function Xt(I){return g!==I?(s.useProgram(I),g=I,!0):!1}const Ft={[zn]:s.FUNC_ADD,[ac]:s.FUNC_SUBTRACT,[oc]:s.FUNC_REVERSE_SUBTRACT};Ft[lc]=s.MIN,Ft[cc]=s.MAX;const jt={[hc]:s.ZERO,[uc]:s.ONE,[dc]:s.SRC_COLOR,[Dr]:s.SRC_ALPHA,[vc]:s.SRC_ALPHA_SATURATE,[gc]:s.DST_COLOR,[pc]:s.DST_ALPHA,[fc]:s.ONE_MINUS_SRC_COLOR,[Pr]:s.ONE_MINUS_SRC_ALPHA,[_c]:s.ONE_MINUS_DST_COLOR,[mc]:s.ONE_MINUS_DST_ALPHA,[xc]:s.CONSTANT_COLOR,[Mc]:s.ONE_MINUS_CONSTANT_COLOR,[yc]:s.CONSTANT_ALPHA,[Sc]:s.ONE_MINUS_CONSTANT_ALPHA};function L(I,ut,tt,xt,nt,j,Mt,Wt,le,ee){if(I===wn){_===!0&&(at(s.BLEND),_=!1);return}if(_===!1&&(Q(s.BLEND),_=!0),I!==rc){if(I!==m||ee!==E){if((p!==zn||x!==zn)&&(s.blendEquation(s.FUNC_ADD),p=zn,x=zn),ee)switch(I){case _i:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case ja:s.blendFunc(s.ONE,s.ONE);break;case $a:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Ja:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}else switch(I){case _i:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case ja:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case $a:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Ja:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}T=null,M=null,w=null,b=null,A.set(0,0,0),P=0,m=I,E=ee}return}nt=nt||ut,j=j||tt,Mt=Mt||xt,(ut!==p||nt!==x)&&(s.blendEquationSeparate(Ft[ut],Ft[nt]),p=ut,x=nt),(tt!==T||xt!==M||j!==w||Mt!==b)&&(s.blendFuncSeparate(jt[tt],jt[xt],jt[j],jt[Mt]),T=tt,M=xt,w=j,b=Mt),(Wt.equals(A)===!1||le!==P)&&(s.blendColor(Wt.r,Wt.g,Wt.b,le),A.copy(Wt),P=le),m=I,E=!1}function Pt(I,ut){I.side===ue?at(s.CULL_FACE):Q(s.CULL_FACE);let tt=I.side===be;ut&&(tt=!tt),pt(tt),I.blending===_i&&I.transparent===!1?L(wn):L(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),a.setFunc(I.depthFunc),a.setTest(I.depthTest),a.setMask(I.depthWrite),r.setMask(I.colorWrite);const xt=I.stencilWrite;o.setTest(xt),xt&&(o.setMask(I.stencilWriteMask),o.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),o.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),wt(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?Q(s.SAMPLE_ALPHA_TO_COVERAGE):at(s.SAMPLE_ALPHA_TO_COVERAGE)}function pt(I){y!==I&&(I?s.frontFace(s.CW):s.frontFace(s.CCW),y=I)}function Lt(I){I!==nc?(Q(s.CULL_FACE),I!==R&&(I===Za?s.cullFace(s.BACK):I===ic?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):at(s.CULL_FACE),R=I}function rt(I){I!==z&&(N&&s.lineWidth(I),z=I)}function wt(I,ut,tt){I?(Q(s.POLYGON_OFFSET_FILL),(F!==ut||H!==tt)&&(s.polygonOffset(ut,tt),F=ut,H=tt)):at(s.POLYGON_OFFSET_FILL)}function gt(I){I?Q(s.SCISSOR_TEST):at(s.SCISSOR_TEST)}function St(I){I===void 0&&(I=s.TEXTURE0+U-1),Z!==I&&(s.activeTexture(I),Z=I)}function Ht(I,ut,tt){tt===void 0&&(Z===null?tt=s.TEXTURE0+U-1:tt=Z);let xt=st[tt];xt===void 0&&(xt={type:void 0,texture:void 0},st[tt]=xt),(xt.type!==I||xt.texture!==ut)&&(Z!==tt&&(s.activeTexture(tt),Z=tt),s.bindTexture(I,ut||mt[I]),xt.type=I,xt.texture=ut)}function C(){const I=st[Z];I!==void 0&&I.type!==void 0&&(s.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function v(){try{s.compressedTexImage2D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function V(){try{s.compressedTexImage3D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function K(){try{s.texSubImage2D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function $(){try{s.texSubImage3D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function q(){try{s.compressedTexSubImage2D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Ct(){try{s.compressedTexSubImage3D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ht(){try{s.texStorage2D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Et(){try{s.texStorage3D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function At(){try{s.texImage2D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function J(){try{s.texImage3D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function _t(I){Gt.equals(I)===!1&&(s.scissor(I.x,I.y,I.z,I.w),Gt.copy(I))}function Ut(I){Y.equals(I)===!1&&(s.viewport(I.x,I.y,I.z,I.w),Y.copy(I))}function Nt(I,ut){let tt=c.get(ut);tt===void 0&&(tt=new WeakMap,c.set(ut,tt));let xt=tt.get(I);xt===void 0&&(xt=s.getUniformBlockIndex(ut,I.name),tt.set(I,xt))}function lt(I,ut){const xt=c.get(ut).get(I);l.get(ut)!==xt&&(s.uniformBlockBinding(ut,xt,I.__bindingPointIndex),l.set(ut,xt))}function Vt(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),a.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),h={},Z=null,st={},u={},f=new WeakMap,d=[],g=null,_=!1,m=null,p=null,T=null,M=null,x=null,w=null,b=null,A=new qt(0,0,0),P=0,E=!1,y=null,R=null,z=null,F=null,H=null,Gt.set(0,0,s.canvas.width,s.canvas.height),Y.set(0,0,s.canvas.width,s.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:Q,disable:at,bindFramebuffer:Ot,drawBuffers:bt,useProgram:Xt,setBlending:L,setMaterial:Pt,setFlipSided:pt,setCullFace:Lt,setLineWidth:rt,setPolygonOffset:wt,setScissorTest:gt,activeTexture:St,bindTexture:Ht,unbindTexture:C,compressedTexImage2D:v,compressedTexImage3D:V,texImage2D:At,texImage3D:J,updateUBOMapping:Nt,uniformBlockBinding:lt,texStorage2D:ht,texStorage3D:Et,texSubImage2D:K,texSubImage3D:$,compressedTexSubImage2D:q,compressedTexSubImage3D:Ct,scissor:_t,viewport:Ut,reset:Vt}}function ig(s,t,e,n,i,r,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ot,h=new WeakMap;let u;const f=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(C,v){return d?new OffscreenCanvas(C,v):qi("canvas")}function _(C,v,V){let K=1;const $=Ht(C);if(($.width>V||$.height>V)&&(K=V/Math.max($.width,$.height)),K<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){const q=Math.floor(K*$.width),Ct=Math.floor(K*$.height);u===void 0&&(u=g(q,Ct));const ht=v?g(q,Ct):u;return ht.width=q,ht.height=Ct,ht.getContext("2d").drawImage(C,0,0,q,Ct),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+$.width+"x"+$.height+") to ("+q+"x"+Ct+")."),ht}else return"data"in C&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+$.width+"x"+$.height+")."),C;return C}function m(C){return C.generateMipmaps}function p(C){s.generateMipmap(C)}function T(C){return C.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?s.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function M(C,v,V,K,$=!1){if(C!==null){if(s[C]!==void 0)return s[C];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let q=v;if(v===s.RED&&(V===s.FLOAT&&(q=s.R32F),V===s.HALF_FLOAT&&(q=s.R16F),V===s.UNSIGNED_BYTE&&(q=s.R8)),v===s.RED_INTEGER&&(V===s.UNSIGNED_BYTE&&(q=s.R8UI),V===s.UNSIGNED_SHORT&&(q=s.R16UI),V===s.UNSIGNED_INT&&(q=s.R32UI),V===s.BYTE&&(q=s.R8I),V===s.SHORT&&(q=s.R16I),V===s.INT&&(q=s.R32I)),v===s.RG&&(V===s.FLOAT&&(q=s.RG32F),V===s.HALF_FLOAT&&(q=s.RG16F),V===s.UNSIGNED_BYTE&&(q=s.RG8)),v===s.RG_INTEGER&&(V===s.UNSIGNED_BYTE&&(q=s.RG8UI),V===s.UNSIGNED_SHORT&&(q=s.RG16UI),V===s.UNSIGNED_INT&&(q=s.RG32UI),V===s.BYTE&&(q=s.RG8I),V===s.SHORT&&(q=s.RG16I),V===s.INT&&(q=s.RG32I)),v===s.RGB_INTEGER&&(V===s.UNSIGNED_BYTE&&(q=s.RGB8UI),V===s.UNSIGNED_SHORT&&(q=s.RGB16UI),V===s.UNSIGNED_INT&&(q=s.RGB32UI),V===s.BYTE&&(q=s.RGB8I),V===s.SHORT&&(q=s.RGB16I),V===s.INT&&(q=s.RGB32I)),v===s.RGBA_INTEGER&&(V===s.UNSIGNED_BYTE&&(q=s.RGBA8UI),V===s.UNSIGNED_SHORT&&(q=s.RGBA16UI),V===s.UNSIGNED_INT&&(q=s.RGBA32UI),V===s.BYTE&&(q=s.RGBA8I),V===s.SHORT&&(q=s.RGBA16I),V===s.INT&&(q=s.RGBA32I)),v===s.RGB&&V===s.UNSIGNED_INT_5_9_9_9_REV&&(q=s.RGB9_E5),v===s.RGBA){const Ct=$?Ns:Qt.getTransfer(K);V===s.FLOAT&&(q=s.RGBA32F),V===s.HALF_FLOAT&&(q=s.RGBA16F),V===s.UNSIGNED_BYTE&&(q=Ct===ie?s.SRGB8_ALPHA8:s.RGBA8),V===s.UNSIGNED_SHORT_4_4_4_4&&(q=s.RGBA4),V===s.UNSIGNED_SHORT_5_5_5_1&&(q=s.RGB5_A1)}return(q===s.R16F||q===s.R32F||q===s.RG16F||q===s.RG32F||q===s.RGBA16F||q===s.RGBA32F)&&t.get("EXT_color_buffer_float"),q}function x(C,v){let V;return C?v===null||v===Wn||v===Wi?V=s.DEPTH24_STENCIL8:v===dn?V=s.DEPTH32F_STENCIL8:v===Gi&&(V=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===Wn||v===Wi?V=s.DEPTH_COMPONENT24:v===dn?V=s.DEPTH_COMPONENT32F:v===Gi&&(V=s.DEPTH_COMPONENT16),V}function w(C,v){return m(C)===!0||C.isFramebufferTexture&&C.minFilter!==Je&&C.minFilter!==en?Math.log2(Math.max(v.width,v.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?v.mipmaps.length:1}function b(C){const v=C.target;v.removeEventListener("dispose",b),P(v),v.isVideoTexture&&h.delete(v)}function A(C){const v=C.target;v.removeEventListener("dispose",A),y(v)}function P(C){const v=n.get(C);if(v.__webglInit===void 0)return;const V=C.source,K=f.get(V);if(K){const $=K[v.__cacheKey];$.usedTimes--,$.usedTimes===0&&E(C),Object.keys(K).length===0&&f.delete(V)}n.remove(C)}function E(C){const v=n.get(C);s.deleteTexture(v.__webglTexture);const V=C.source,K=f.get(V);delete K[v.__cacheKey],a.memory.textures--}function y(C){const v=n.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),n.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let K=0;K<6;K++){if(Array.isArray(v.__webglFramebuffer[K]))for(let $=0;$<v.__webglFramebuffer[K].length;$++)s.deleteFramebuffer(v.__webglFramebuffer[K][$]);else s.deleteFramebuffer(v.__webglFramebuffer[K]);v.__webglDepthbuffer&&s.deleteRenderbuffer(v.__webglDepthbuffer[K])}else{if(Array.isArray(v.__webglFramebuffer))for(let K=0;K<v.__webglFramebuffer.length;K++)s.deleteFramebuffer(v.__webglFramebuffer[K]);else s.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&s.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&s.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let K=0;K<v.__webglColorRenderbuffer.length;K++)v.__webglColorRenderbuffer[K]&&s.deleteRenderbuffer(v.__webglColorRenderbuffer[K]);v.__webglDepthRenderbuffer&&s.deleteRenderbuffer(v.__webglDepthRenderbuffer)}const V=C.textures;for(let K=0,$=V.length;K<$;K++){const q=n.get(V[K]);q.__webglTexture&&(s.deleteTexture(q.__webglTexture),a.memory.textures--),n.remove(V[K])}n.remove(C)}let R=0;function z(){R=0}function F(){const C=R;return C>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+i.maxTextures),R+=1,C}function H(C){const v=[];return v.push(C.wrapS),v.push(C.wrapT),v.push(C.wrapR||0),v.push(C.magFilter),v.push(C.minFilter),v.push(C.anisotropy),v.push(C.internalFormat),v.push(C.format),v.push(C.type),v.push(C.generateMipmaps),v.push(C.premultiplyAlpha),v.push(C.flipY),v.push(C.unpackAlignment),v.push(C.colorSpace),v.join()}function U(C,v){const V=n.get(C);if(C.isVideoTexture&&gt(C),C.isRenderTargetTexture===!1&&C.version>0&&V.__version!==C.version){const K=C.image;if(K===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(K.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{mt(V,C,v);return}}e.bindTexture(s.TEXTURE_2D,V.__webglTexture,s.TEXTURE0+v)}function N(C,v){const V=n.get(C);if(C.version>0&&V.__version!==C.version){mt(V,C,v);return}e.bindTexture(s.TEXTURE_2D_ARRAY,V.__webglTexture,s.TEXTURE0+v)}function X(C,v){const V=n.get(C);if(C.version>0&&V.__version!==C.version){mt(V,C,v);return}e.bindTexture(s.TEXTURE_3D,V.__webglTexture,s.TEXTURE0+v)}function k(C,v){const V=n.get(C);if(C.version>0&&V.__version!==C.version){Q(V,C,v);return}e.bindTexture(s.TEXTURE_CUBE_MAP,V.__webglTexture,s.TEXTURE0+v)}const Z={[ae]:s.REPEAT,[Vn]:s.CLAMP_TO_EDGE,[Hr]:s.MIRRORED_REPEAT},st={[Je]:s.NEAREST,[Lc]:s.NEAREST_MIPMAP_NEAREST,[ts]:s.NEAREST_MIPMAP_LINEAR,[en]:s.LINEAR,[qs]:s.LINEAR_MIPMAP_NEAREST,[Gn]:s.LINEAR_MIPMAP_LINEAR},ft={[Uc]:s.NEVER,[Vc]:s.ALWAYS,[Fc]:s.LESS,[xl]:s.LEQUAL,[Bc]:s.EQUAL,[Hc]:s.GEQUAL,[zc]:s.GREATER,[kc]:s.NOTEQUAL};function Rt(C,v){if(v.type===dn&&t.has("OES_texture_float_linear")===!1&&(v.magFilter===en||v.magFilter===qs||v.magFilter===ts||v.magFilter===Gn||v.minFilter===en||v.minFilter===qs||v.minFilter===ts||v.minFilter===Gn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(C,s.TEXTURE_WRAP_S,Z[v.wrapS]),s.texParameteri(C,s.TEXTURE_WRAP_T,Z[v.wrapT]),(C===s.TEXTURE_3D||C===s.TEXTURE_2D_ARRAY)&&s.texParameteri(C,s.TEXTURE_WRAP_R,Z[v.wrapR]),s.texParameteri(C,s.TEXTURE_MAG_FILTER,st[v.magFilter]),s.texParameteri(C,s.TEXTURE_MIN_FILTER,st[v.minFilter]),v.compareFunction&&(s.texParameteri(C,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(C,s.TEXTURE_COMPARE_FUNC,ft[v.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===Je||v.minFilter!==ts&&v.minFilter!==Gn||v.type===dn&&t.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||n.get(v).__currentAnisotropy){const V=t.get("EXT_texture_filter_anisotropic");s.texParameterf(C,V.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,i.getMaxAnisotropy())),n.get(v).__currentAnisotropy=v.anisotropy}}}function Gt(C,v){let V=!1;C.__webglInit===void 0&&(C.__webglInit=!0,v.addEventListener("dispose",b));const K=v.source;let $=f.get(K);$===void 0&&($={},f.set(K,$));const q=H(v);if(q!==C.__cacheKey){$[q]===void 0&&($[q]={texture:s.createTexture(),usedTimes:0},a.memory.textures++,V=!0),$[q].usedTimes++;const Ct=$[C.__cacheKey];Ct!==void 0&&($[C.__cacheKey].usedTimes--,Ct.usedTimes===0&&E(v)),C.__cacheKey=q,C.__webglTexture=$[q].texture}return V}function Y(C,v,V){return Math.floor(Math.floor(C/V)/v)}function et(C,v,V,K){const q=C.updateRanges;if(q.length===0)e.texSubImage2D(s.TEXTURE_2D,0,0,0,v.width,v.height,V,K,v.data);else{q.sort((J,_t)=>J.start-_t.start);let Ct=0;for(let J=1;J<q.length;J++){const _t=q[Ct],Ut=q[J],Nt=_t.start+_t.count,lt=Y(Ut.start,v.width,4),Vt=Y(_t.start,v.width,4);Ut.start<=Nt+1&&lt===Vt&&Y(Ut.start+Ut.count-1,v.width,4)===lt?_t.count=Math.max(_t.count,Ut.start+Ut.count-_t.start):(++Ct,q[Ct]=Ut)}q.length=Ct+1;const ht=s.getParameter(s.UNPACK_ROW_LENGTH),Et=s.getParameter(s.UNPACK_SKIP_PIXELS),At=s.getParameter(s.UNPACK_SKIP_ROWS);s.pixelStorei(s.UNPACK_ROW_LENGTH,v.width);for(let J=0,_t=q.length;J<_t;J++){const Ut=q[J],Nt=Math.floor(Ut.start/4),lt=Math.ceil(Ut.count/4),Vt=Nt%v.width,I=Math.floor(Nt/v.width),ut=lt,tt=1;s.pixelStorei(s.UNPACK_SKIP_PIXELS,Vt),s.pixelStorei(s.UNPACK_SKIP_ROWS,I),e.texSubImage2D(s.TEXTURE_2D,0,Vt,I,ut,tt,V,K,v.data)}C.clearUpdateRanges(),s.pixelStorei(s.UNPACK_ROW_LENGTH,ht),s.pixelStorei(s.UNPACK_SKIP_PIXELS,Et),s.pixelStorei(s.UNPACK_SKIP_ROWS,At)}}function mt(C,v,V){let K=s.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(K=s.TEXTURE_2D_ARRAY),v.isData3DTexture&&(K=s.TEXTURE_3D);const $=Gt(C,v),q=v.source;e.bindTexture(K,C.__webglTexture,s.TEXTURE0+V);const Ct=n.get(q);if(q.version!==Ct.__version||$===!0){e.activeTexture(s.TEXTURE0+V);const ht=Qt.getPrimaries(Qt.workingColorSpace),Et=v.colorSpace===Tn?null:Qt.getPrimaries(v.colorSpace),At=v.colorSpace===Tn||ht===Et?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,v.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,v.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,At);let J=_(v.image,!1,i.maxTextureSize);J=St(v,J);const _t=r.convert(v.format,v.colorSpace),Ut=r.convert(v.type);let Nt=M(v.internalFormat,_t,Ut,v.colorSpace,v.isVideoTexture);Rt(K,v);let lt;const Vt=v.mipmaps,I=v.isVideoTexture!==!0,ut=Ct.__version===void 0||$===!0,tt=q.dataReady,xt=w(v,J);if(v.isDepthTexture)Nt=x(v.format===Yi,v.type),ut&&(I?e.texStorage2D(s.TEXTURE_2D,1,Nt,J.width,J.height):e.texImage2D(s.TEXTURE_2D,0,Nt,J.width,J.height,0,_t,Ut,null));else if(v.isDataTexture)if(Vt.length>0){I&&ut&&e.texStorage2D(s.TEXTURE_2D,xt,Nt,Vt[0].width,Vt[0].height);for(let nt=0,j=Vt.length;nt<j;nt++)lt=Vt[nt],I?tt&&e.texSubImage2D(s.TEXTURE_2D,nt,0,0,lt.width,lt.height,_t,Ut,lt.data):e.texImage2D(s.TEXTURE_2D,nt,Nt,lt.width,lt.height,0,_t,Ut,lt.data);v.generateMipmaps=!1}else I?(ut&&e.texStorage2D(s.TEXTURE_2D,xt,Nt,J.width,J.height),tt&&et(v,J,_t,Ut)):e.texImage2D(s.TEXTURE_2D,0,Nt,J.width,J.height,0,_t,Ut,J.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){I&&ut&&e.texStorage3D(s.TEXTURE_2D_ARRAY,xt,Nt,Vt[0].width,Vt[0].height,J.depth);for(let nt=0,j=Vt.length;nt<j;nt++)if(lt=Vt[nt],v.format!==$e)if(_t!==null)if(I){if(tt)if(v.layerUpdates.size>0){const Mt=Oo(lt.width,lt.height,v.format,v.type);for(const Wt of v.layerUpdates){const le=lt.data.subarray(Wt*Mt/lt.data.BYTES_PER_ELEMENT,(Wt+1)*Mt/lt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,nt,0,0,Wt,lt.width,lt.height,1,_t,le)}v.clearLayerUpdates()}else e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,nt,0,0,0,lt.width,lt.height,J.depth,_t,lt.data)}else e.compressedTexImage3D(s.TEXTURE_2D_ARRAY,nt,Nt,lt.width,lt.height,J.depth,0,lt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else I?tt&&e.texSubImage3D(s.TEXTURE_2D_ARRAY,nt,0,0,0,lt.width,lt.height,J.depth,_t,Ut,lt.data):e.texImage3D(s.TEXTURE_2D_ARRAY,nt,Nt,lt.width,lt.height,J.depth,0,_t,Ut,lt.data)}else{I&&ut&&e.texStorage2D(s.TEXTURE_2D,xt,Nt,Vt[0].width,Vt[0].height);for(let nt=0,j=Vt.length;nt<j;nt++)lt=Vt[nt],v.format!==$e?_t!==null?I?tt&&e.compressedTexSubImage2D(s.TEXTURE_2D,nt,0,0,lt.width,lt.height,_t,lt.data):e.compressedTexImage2D(s.TEXTURE_2D,nt,Nt,lt.width,lt.height,0,lt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):I?tt&&e.texSubImage2D(s.TEXTURE_2D,nt,0,0,lt.width,lt.height,_t,Ut,lt.data):e.texImage2D(s.TEXTURE_2D,nt,Nt,lt.width,lt.height,0,_t,Ut,lt.data)}else if(v.isDataArrayTexture)if(I){if(ut&&e.texStorage3D(s.TEXTURE_2D_ARRAY,xt,Nt,J.width,J.height,J.depth),tt)if(v.layerUpdates.size>0){const nt=Oo(J.width,J.height,v.format,v.type);for(const j of v.layerUpdates){const Mt=J.data.subarray(j*nt/J.data.BYTES_PER_ELEMENT,(j+1)*nt/J.data.BYTES_PER_ELEMENT);e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,j,J.width,J.height,1,_t,Ut,Mt)}v.clearLayerUpdates()}else e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,J.width,J.height,J.depth,_t,Ut,J.data)}else e.texImage3D(s.TEXTURE_2D_ARRAY,0,Nt,J.width,J.height,J.depth,0,_t,Ut,J.data);else if(v.isData3DTexture)I?(ut&&e.texStorage3D(s.TEXTURE_3D,xt,Nt,J.width,J.height,J.depth),tt&&e.texSubImage3D(s.TEXTURE_3D,0,0,0,0,J.width,J.height,J.depth,_t,Ut,J.data)):e.texImage3D(s.TEXTURE_3D,0,Nt,J.width,J.height,J.depth,0,_t,Ut,J.data);else if(v.isFramebufferTexture){if(ut)if(I)e.texStorage2D(s.TEXTURE_2D,xt,Nt,J.width,J.height);else{let nt=J.width,j=J.height;for(let Mt=0;Mt<xt;Mt++)e.texImage2D(s.TEXTURE_2D,Mt,Nt,nt,j,0,_t,Ut,null),nt>>=1,j>>=1}}else if(Vt.length>0){if(I&&ut){const nt=Ht(Vt[0]);e.texStorage2D(s.TEXTURE_2D,xt,Nt,nt.width,nt.height)}for(let nt=0,j=Vt.length;nt<j;nt++)lt=Vt[nt],I?tt&&e.texSubImage2D(s.TEXTURE_2D,nt,0,0,_t,Ut,lt):e.texImage2D(s.TEXTURE_2D,nt,Nt,_t,Ut,lt);v.generateMipmaps=!1}else if(I){if(ut){const nt=Ht(J);e.texStorage2D(s.TEXTURE_2D,xt,Nt,nt.width,nt.height)}tt&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,_t,Ut,J)}else e.texImage2D(s.TEXTURE_2D,0,Nt,_t,Ut,J);m(v)&&p(K),Ct.__version=q.version,v.onUpdate&&v.onUpdate(v)}C.__version=v.version}function Q(C,v,V){if(v.image.length!==6)return;const K=Gt(C,v),$=v.source;e.bindTexture(s.TEXTURE_CUBE_MAP,C.__webglTexture,s.TEXTURE0+V);const q=n.get($);if($.version!==q.__version||K===!0){e.activeTexture(s.TEXTURE0+V);const Ct=Qt.getPrimaries(Qt.workingColorSpace),ht=v.colorSpace===Tn?null:Qt.getPrimaries(v.colorSpace),Et=v.colorSpace===Tn||Ct===ht?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,v.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,v.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Et);const At=v.isCompressedTexture||v.image[0].isCompressedTexture,J=v.image[0]&&v.image[0].isDataTexture,_t=[];for(let j=0;j<6;j++)!At&&!J?_t[j]=_(v.image[j],!0,i.maxCubemapSize):_t[j]=J?v.image[j].image:v.image[j],_t[j]=St(v,_t[j]);const Ut=_t[0],Nt=r.convert(v.format,v.colorSpace),lt=r.convert(v.type),Vt=M(v.internalFormat,Nt,lt,v.colorSpace),I=v.isVideoTexture!==!0,ut=q.__version===void 0||K===!0,tt=$.dataReady;let xt=w(v,Ut);Rt(s.TEXTURE_CUBE_MAP,v);let nt;if(At){I&&ut&&e.texStorage2D(s.TEXTURE_CUBE_MAP,xt,Vt,Ut.width,Ut.height);for(let j=0;j<6;j++){nt=_t[j].mipmaps;for(let Mt=0;Mt<nt.length;Mt++){const Wt=nt[Mt];v.format!==$e?Nt!==null?I?tt&&e.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,Mt,0,0,Wt.width,Wt.height,Nt,Wt.data):e.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,Mt,Vt,Wt.width,Wt.height,0,Wt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):I?tt&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,Mt,0,0,Wt.width,Wt.height,Nt,lt,Wt.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,Mt,Vt,Wt.width,Wt.height,0,Nt,lt,Wt.data)}}}else{if(nt=v.mipmaps,I&&ut){nt.length>0&&xt++;const j=Ht(_t[0]);e.texStorage2D(s.TEXTURE_CUBE_MAP,xt,Vt,j.width,j.height)}for(let j=0;j<6;j++)if(J){I?tt&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,_t[j].width,_t[j].height,Nt,lt,_t[j].data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,Vt,_t[j].width,_t[j].height,0,Nt,lt,_t[j].data);for(let Mt=0;Mt<nt.length;Mt++){const le=nt[Mt].image[j].image;I?tt&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,Mt+1,0,0,le.width,le.height,Nt,lt,le.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,Mt+1,Vt,le.width,le.height,0,Nt,lt,le.data)}}else{I?tt&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,Nt,lt,_t[j]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,Vt,Nt,lt,_t[j]);for(let Mt=0;Mt<nt.length;Mt++){const Wt=nt[Mt];I?tt&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,Mt+1,0,0,Nt,lt,Wt.image[j]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,Mt+1,Vt,Nt,lt,Wt.image[j])}}}m(v)&&p(s.TEXTURE_CUBE_MAP),q.__version=$.version,v.onUpdate&&v.onUpdate(v)}C.__version=v.version}function at(C,v,V,K,$,q){const Ct=r.convert(V.format,V.colorSpace),ht=r.convert(V.type),Et=M(V.internalFormat,Ct,ht,V.colorSpace),At=n.get(v),J=n.get(V);if(J.__renderTarget=v,!At.__hasExternalTextures){const _t=Math.max(1,v.width>>q),Ut=Math.max(1,v.height>>q);$===s.TEXTURE_3D||$===s.TEXTURE_2D_ARRAY?e.texImage3D($,q,Et,_t,Ut,v.depth,0,Ct,ht,null):e.texImage2D($,q,Et,_t,Ut,0,Ct,ht,null)}e.bindFramebuffer(s.FRAMEBUFFER,C),wt(v)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,K,$,J.__webglTexture,0,rt(v)):($===s.TEXTURE_2D||$>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&$<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,K,$,J.__webglTexture,q),e.bindFramebuffer(s.FRAMEBUFFER,null)}function Ot(C,v,V){if(s.bindRenderbuffer(s.RENDERBUFFER,C),v.depthBuffer){const K=v.depthTexture,$=K&&K.isDepthTexture?K.type:null,q=x(v.stencilBuffer,$),Ct=v.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ht=rt(v);wt(v)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,ht,q,v.width,v.height):V?s.renderbufferStorageMultisample(s.RENDERBUFFER,ht,q,v.width,v.height):s.renderbufferStorage(s.RENDERBUFFER,q,v.width,v.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,Ct,s.RENDERBUFFER,C)}else{const K=v.textures;for(let $=0;$<K.length;$++){const q=K[$],Ct=r.convert(q.format,q.colorSpace),ht=r.convert(q.type),Et=M(q.internalFormat,Ct,ht,q.colorSpace),At=rt(v);V&&wt(v)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,At,Et,v.width,v.height):wt(v)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,At,Et,v.width,v.height):s.renderbufferStorage(s.RENDERBUFFER,Et,v.width,v.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function bt(C,v){if(v&&v.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(s.FRAMEBUFFER,C),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const K=n.get(v.depthTexture);K.__renderTarget=v,(!K.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),U(v.depthTexture,0);const $=K.__webglTexture,q=rt(v);if(v.depthTexture.format===Xi)wt(v)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,$,0,q):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,$,0);else if(v.depthTexture.format===Yi)wt(v)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,$,0,q):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,$,0);else throw new Error("Unknown depthTexture format")}function Xt(C){const v=n.get(C),V=C.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==C.depthTexture){const K=C.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),K){const $=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,K.removeEventListener("dispose",$)};K.addEventListener("dispose",$),v.__depthDisposeCallback=$}v.__boundDepthTexture=K}if(C.depthTexture&&!v.__autoAllocateDepthBuffer){if(V)throw new Error("target.depthTexture not supported in Cube render targets");const K=C.texture.mipmaps;K&&K.length>0?bt(v.__webglFramebuffer[0],C):bt(v.__webglFramebuffer,C)}else if(V){v.__webglDepthbuffer=[];for(let K=0;K<6;K++)if(e.bindFramebuffer(s.FRAMEBUFFER,v.__webglFramebuffer[K]),v.__webglDepthbuffer[K]===void 0)v.__webglDepthbuffer[K]=s.createRenderbuffer(),Ot(v.__webglDepthbuffer[K],C,!1);else{const $=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,q=v.__webglDepthbuffer[K];s.bindRenderbuffer(s.RENDERBUFFER,q),s.framebufferRenderbuffer(s.FRAMEBUFFER,$,s.RENDERBUFFER,q)}}else{const K=C.texture.mipmaps;if(K&&K.length>0?e.bindFramebuffer(s.FRAMEBUFFER,v.__webglFramebuffer[0]):e.bindFramebuffer(s.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=s.createRenderbuffer(),Ot(v.__webglDepthbuffer,C,!1);else{const $=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,q=v.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,q),s.framebufferRenderbuffer(s.FRAMEBUFFER,$,s.RENDERBUFFER,q)}}e.bindFramebuffer(s.FRAMEBUFFER,null)}function Ft(C,v,V){const K=n.get(C);v!==void 0&&at(K.__webglFramebuffer,C,C.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),V!==void 0&&Xt(C)}function jt(C){const v=C.texture,V=n.get(C),K=n.get(v);C.addEventListener("dispose",A);const $=C.textures,q=C.isWebGLCubeRenderTarget===!0,Ct=$.length>1;if(Ct||(K.__webglTexture===void 0&&(K.__webglTexture=s.createTexture()),K.__version=v.version,a.memory.textures++),q){V.__webglFramebuffer=[];for(let ht=0;ht<6;ht++)if(v.mipmaps&&v.mipmaps.length>0){V.__webglFramebuffer[ht]=[];for(let Et=0;Et<v.mipmaps.length;Et++)V.__webglFramebuffer[ht][Et]=s.createFramebuffer()}else V.__webglFramebuffer[ht]=s.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){V.__webglFramebuffer=[];for(let ht=0;ht<v.mipmaps.length;ht++)V.__webglFramebuffer[ht]=s.createFramebuffer()}else V.__webglFramebuffer=s.createFramebuffer();if(Ct)for(let ht=0,Et=$.length;ht<Et;ht++){const At=n.get($[ht]);At.__webglTexture===void 0&&(At.__webglTexture=s.createTexture(),a.memory.textures++)}if(C.samples>0&&wt(C)===!1){V.__webglMultisampledFramebuffer=s.createFramebuffer(),V.__webglColorRenderbuffer=[],e.bindFramebuffer(s.FRAMEBUFFER,V.__webglMultisampledFramebuffer);for(let ht=0;ht<$.length;ht++){const Et=$[ht];V.__webglColorRenderbuffer[ht]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,V.__webglColorRenderbuffer[ht]);const At=r.convert(Et.format,Et.colorSpace),J=r.convert(Et.type),_t=M(Et.internalFormat,At,J,Et.colorSpace,C.isXRRenderTarget===!0),Ut=rt(C);s.renderbufferStorageMultisample(s.RENDERBUFFER,Ut,_t,C.width,C.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ht,s.RENDERBUFFER,V.__webglColorRenderbuffer[ht])}s.bindRenderbuffer(s.RENDERBUFFER,null),C.depthBuffer&&(V.__webglDepthRenderbuffer=s.createRenderbuffer(),Ot(V.__webglDepthRenderbuffer,C,!0)),e.bindFramebuffer(s.FRAMEBUFFER,null)}}if(q){e.bindTexture(s.TEXTURE_CUBE_MAP,K.__webglTexture),Rt(s.TEXTURE_CUBE_MAP,v);for(let ht=0;ht<6;ht++)if(v.mipmaps&&v.mipmaps.length>0)for(let Et=0;Et<v.mipmaps.length;Et++)at(V.__webglFramebuffer[ht][Et],C,v,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ht,Et);else at(V.__webglFramebuffer[ht],C,v,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ht,0);m(v)&&p(s.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Ct){for(let ht=0,Et=$.length;ht<Et;ht++){const At=$[ht],J=n.get(At);e.bindTexture(s.TEXTURE_2D,J.__webglTexture),Rt(s.TEXTURE_2D,At),at(V.__webglFramebuffer,C,At,s.COLOR_ATTACHMENT0+ht,s.TEXTURE_2D,0),m(At)&&p(s.TEXTURE_2D)}e.unbindTexture()}else{let ht=s.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(ht=C.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(ht,K.__webglTexture),Rt(ht,v),v.mipmaps&&v.mipmaps.length>0)for(let Et=0;Et<v.mipmaps.length;Et++)at(V.__webglFramebuffer[Et],C,v,s.COLOR_ATTACHMENT0,ht,Et);else at(V.__webglFramebuffer,C,v,s.COLOR_ATTACHMENT0,ht,0);m(v)&&p(ht),e.unbindTexture()}C.depthBuffer&&Xt(C)}function L(C){const v=C.textures;for(let V=0,K=v.length;V<K;V++){const $=v[V];if(m($)){const q=T(C),Ct=n.get($).__webglTexture;e.bindTexture(q,Ct),p(q),e.unbindTexture()}}}const Pt=[],pt=[];function Lt(C){if(C.samples>0){if(wt(C)===!1){const v=C.textures,V=C.width,K=C.height;let $=s.COLOR_BUFFER_BIT;const q=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Ct=n.get(C),ht=v.length>1;if(ht)for(let At=0;At<v.length;At++)e.bindFramebuffer(s.FRAMEBUFFER,Ct.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+At,s.RENDERBUFFER,null),e.bindFramebuffer(s.FRAMEBUFFER,Ct.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+At,s.TEXTURE_2D,null,0);e.bindFramebuffer(s.READ_FRAMEBUFFER,Ct.__webglMultisampledFramebuffer);const Et=C.texture.mipmaps;Et&&Et.length>0?e.bindFramebuffer(s.DRAW_FRAMEBUFFER,Ct.__webglFramebuffer[0]):e.bindFramebuffer(s.DRAW_FRAMEBUFFER,Ct.__webglFramebuffer);for(let At=0;At<v.length;At++){if(C.resolveDepthBuffer&&(C.depthBuffer&&($|=s.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&($|=s.STENCIL_BUFFER_BIT)),ht){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,Ct.__webglColorRenderbuffer[At]);const J=n.get(v[At]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,J,0)}s.blitFramebuffer(0,0,V,K,0,0,V,K,$,s.NEAREST),l===!0&&(Pt.length=0,pt.length=0,Pt.push(s.COLOR_ATTACHMENT0+At),C.depthBuffer&&C.resolveDepthBuffer===!1&&(Pt.push(q),pt.push(q),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,pt)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,Pt))}if(e.bindFramebuffer(s.READ_FRAMEBUFFER,null),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),ht)for(let At=0;At<v.length;At++){e.bindFramebuffer(s.FRAMEBUFFER,Ct.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+At,s.RENDERBUFFER,Ct.__webglColorRenderbuffer[At]);const J=n.get(v[At]).__webglTexture;e.bindFramebuffer(s.FRAMEBUFFER,Ct.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+At,s.TEXTURE_2D,J,0)}e.bindFramebuffer(s.DRAW_FRAMEBUFFER,Ct.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&l){const v=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[v])}}}function rt(C){return Math.min(i.maxSamples,C.samples)}function wt(C){const v=n.get(C);return C.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function gt(C){const v=a.render.frame;h.get(C)!==v&&(h.set(C,v),C.update())}function St(C,v){const V=C.colorSpace,K=C.format,$=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||V!==Ei&&V!==Tn&&(Qt.getTransfer(V)===ie?(K!==$e||$!==nn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",V)),v}function Ht(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(c.width=C.naturalWidth||C.width,c.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(c.width=C.displayWidth,c.height=C.displayHeight):(c.width=C.width,c.height=C.height),c}this.allocateTextureUnit=F,this.resetTextureUnits=z,this.setTexture2D=U,this.setTexture2DArray=N,this.setTexture3D=X,this.setTextureCube=k,this.rebindTextures=Ft,this.setupRenderTarget=jt,this.updateRenderTargetMipmap=L,this.updateMultisampleRenderTarget=Lt,this.setupDepthRenderbuffer=Xt,this.setupFrameBufferTexture=at,this.useMultisampledRTT=wt}function sg(s,t){function e(n,i=Tn){let r;const a=Qt.getTransfer(i);if(n===nn)return s.UNSIGNED_BYTE;if(n===Ea)return s.UNSIGNED_SHORT_4_4_4_4;if(n===Ta)return s.UNSIGNED_SHORT_5_5_5_1;if(n===fl)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===ul)return s.BYTE;if(n===dl)return s.SHORT;if(n===Gi)return s.UNSIGNED_SHORT;if(n===Sa)return s.INT;if(n===Wn)return s.UNSIGNED_INT;if(n===dn)return s.FLOAT;if(n===$i)return s.HALF_FLOAT;if(n===pl)return s.ALPHA;if(n===ml)return s.RGB;if(n===$e)return s.RGBA;if(n===Xi)return s.DEPTH_COMPONENT;if(n===Yi)return s.DEPTH_STENCIL;if(n===gl)return s.RED;if(n===ba)return s.RED_INTEGER;if(n===_l)return s.RG;if(n===wa)return s.RG_INTEGER;if(n===Ca)return s.RGBA_INTEGER;if(n===As||n===Rs||n===Ds||n===Ps)if(a===ie)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===As)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Rs)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Ds)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Ps)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===As)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Rs)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Ds)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Ps)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Vr||n===Gr||n===Wr||n===Xr)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Vr)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Gr)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Wr)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Xr)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Yr||n===qr||n===Kr)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Yr||n===qr)return a===ie?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Kr)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Zr||n===jr||n===$r||n===Jr||n===Qr||n===ta||n===ea||n===na||n===ia||n===sa||n===ra||n===aa||n===oa||n===la)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Zr)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===jr)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===$r)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Jr)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Qr)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===ta)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===ea)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===na)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===ia)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===sa)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===ra)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===aa)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===oa)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===la)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ls||n===ca||n===ha)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Ls)return a===ie?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===ca)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===ha)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===vl||n===ua||n===da||n===fa)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Ls)return r.COMPRESSED_RED_RGTC1_EXT;if(n===ua)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===da)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===fa)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Wi?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:e}}const rg=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,ag=`
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

}`;class og{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const i=new Pe,r=t.properties.get(i);r.__webglTexture=e.texture,(e.depthNear!==n.depthNear||e.depthFar!==n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Rn({vertexShader:rg,fragmentShader:ag,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Tt(new Be(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class lg extends qn{constructor(t,e){super();const n=this;let i=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,u=null,f=null,d=null,g=null;const _=new og,m=e.getContextAttributes();let p=null,T=null;const M=[],x=[],w=new ot;let b=null;const A=new Ne;A.viewport=new re;const P=new Ne;P.viewport=new re;const E=[A,P],y=new Cu;let R=null,z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let et=M[Y];return et===void 0&&(et=new pr,M[Y]=et),et.getTargetRaySpace()},this.getControllerGrip=function(Y){let et=M[Y];return et===void 0&&(et=new pr,M[Y]=et),et.getGripSpace()},this.getHand=function(Y){let et=M[Y];return et===void 0&&(et=new pr,M[Y]=et),et.getHandSpace()};function F(Y){const et=x.indexOf(Y.inputSource);if(et===-1)return;const mt=M[et];mt!==void 0&&(mt.update(Y.inputSource,Y.frame,c||a),mt.dispatchEvent({type:Y.type,data:Y.inputSource}))}function H(){i.removeEventListener("select",F),i.removeEventListener("selectstart",F),i.removeEventListener("selectend",F),i.removeEventListener("squeeze",F),i.removeEventListener("squeezestart",F),i.removeEventListener("squeezeend",F),i.removeEventListener("end",H),i.removeEventListener("inputsourceschange",U);for(let Y=0;Y<M.length;Y++){const et=x[Y];et!==null&&(x[Y]=null,M[Y].disconnect(et))}R=null,z=null,_.reset(),t.setRenderTarget(p),d=null,f=null,u=null,i=null,T=null,Gt.stop(),n.isPresenting=!1,t.setPixelRatio(b),t.setSize(w.width,w.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){r=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){o=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(Y){c=Y},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(Y){if(i=Y,i!==null){if(p=t.getRenderTarget(),i.addEventListener("select",F),i.addEventListener("selectstart",F),i.addEventListener("selectend",F),i.addEventListener("squeeze",F),i.addEventListener("squeezestart",F),i.addEventListener("squeezeend",F),i.addEventListener("end",H),i.addEventListener("inputsourceschange",U),m.xrCompatible!==!0&&await e.makeXRCompatible(),b=t.getPixelRatio(),t.getSize(w),typeof XRWebGLBinding<"u"&&"createProjectionLayer"in XRWebGLBinding.prototype){let mt=null,Q=null,at=null;m.depth&&(at=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,mt=m.stencil?Yi:Xi,Q=m.stencil?Wi:Wn);const Ot={colorFormat:e.RGBA8,depthFormat:at,scaleFactor:r};u=new XRWebGLBinding(i,e),f=u.createProjectionLayer(Ot),i.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),T=new Xn(f.textureWidth,f.textureHeight,{format:$e,type:nn,depthTexture:new Rl(f.textureWidth,f.textureHeight,Q,void 0,void 0,void 0,void 0,void 0,void 0,mt),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{const mt={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(i,e,mt),i.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),T=new Xn(d.framebufferWidth,d.framebufferHeight,{format:$e,type:nn,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}T.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await i.requestReferenceSpace(o),Gt.setContext(i),Gt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function U(Y){for(let et=0;et<Y.removed.length;et++){const mt=Y.removed[et],Q=x.indexOf(mt);Q>=0&&(x[Q]=null,M[Q].disconnect(mt))}for(let et=0;et<Y.added.length;et++){const mt=Y.added[et];let Q=x.indexOf(mt);if(Q===-1){for(let Ot=0;Ot<M.length;Ot++)if(Ot>=x.length){x.push(mt),Q=Ot;break}else if(x[Ot]===null){x[Ot]=mt,Q=Ot;break}if(Q===-1)break}const at=M[Q];at&&at.connect(mt)}}const N=new D,X=new D;function k(Y,et,mt){N.setFromMatrixPosition(et.matrixWorld),X.setFromMatrixPosition(mt.matrixWorld);const Q=N.distanceTo(X),at=et.projectionMatrix.elements,Ot=mt.projectionMatrix.elements,bt=at[14]/(at[10]-1),Xt=at[14]/(at[10]+1),Ft=(at[9]+1)/at[5],jt=(at[9]-1)/at[5],L=(at[8]-1)/at[0],Pt=(Ot[8]+1)/Ot[0],pt=bt*L,Lt=bt*Pt,rt=Q/(-L+Pt),wt=rt*-L;if(et.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(wt),Y.translateZ(rt),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),at[10]===-1)Y.projectionMatrix.copy(et.projectionMatrix),Y.projectionMatrixInverse.copy(et.projectionMatrixInverse);else{const gt=bt+rt,St=Xt+rt,Ht=pt-wt,C=Lt+(Q-wt),v=Ft*Xt/St*gt,V=jt*Xt/St*gt;Y.projectionMatrix.makePerspective(Ht,C,v,V,gt,St),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function Z(Y,et){et===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(et.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(i===null)return;let et=Y.near,mt=Y.far;_.texture!==null&&(_.depthNear>0&&(et=_.depthNear),_.depthFar>0&&(mt=_.depthFar)),y.near=P.near=A.near=et,y.far=P.far=A.far=mt,(R!==y.near||z!==y.far)&&(i.updateRenderState({depthNear:y.near,depthFar:y.far}),R=y.near,z=y.far),A.layers.mask=Y.layers.mask|2,P.layers.mask=Y.layers.mask|4,y.layers.mask=A.layers.mask|P.layers.mask;const Q=Y.parent,at=y.cameras;Z(y,Q);for(let Ot=0;Ot<at.length;Ot++)Z(at[Ot],Q);at.length===2?k(y,A,P):y.projectionMatrix.copy(A.projectionMatrix),st(Y,y,Q)};function st(Y,et,mt){mt===null?Y.matrix.copy(et.matrixWorld):(Y.matrix.copy(mt.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(et.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(et.projectionMatrix),Y.projectionMatrixInverse.copy(et.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=Ti*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(f===null&&d===null))return l},this.setFoveation=function(Y){l=Y,f!==null&&(f.fixedFoveation=Y),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=Y)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(y)};let ft=null;function Rt(Y,et){if(h=et.getViewerPose(c||a),g=et,h!==null){const mt=h.views;d!==null&&(t.setRenderTargetFramebuffer(T,d.framebuffer),t.setRenderTarget(T));let Q=!1;mt.length!==y.cameras.length&&(y.cameras.length=0,Q=!0);for(let bt=0;bt<mt.length;bt++){const Xt=mt[bt];let Ft=null;if(d!==null)Ft=d.getViewport(Xt);else{const L=u.getViewSubImage(f,Xt);Ft=L.viewport,bt===0&&(t.setRenderTargetTextures(T,L.colorTexture,L.depthStencilTexture),t.setRenderTarget(T))}let jt=E[bt];jt===void 0&&(jt=new Ne,jt.layers.enable(bt),jt.viewport=new re,E[bt]=jt),jt.matrix.fromArray(Xt.transform.matrix),jt.matrix.decompose(jt.position,jt.quaternion,jt.scale),jt.projectionMatrix.fromArray(Xt.projectionMatrix),jt.projectionMatrixInverse.copy(jt.projectionMatrix).invert(),jt.viewport.set(Ft.x,Ft.y,Ft.width,Ft.height),bt===0&&(y.matrix.copy(jt.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),Q===!0&&y.cameras.push(jt)}const at=i.enabledFeatures;if(at&&at.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&u){const bt=u.getDepthInformation(mt[0]);bt&&bt.isValid&&bt.texture&&_.init(t,bt,i.renderState)}}for(let mt=0;mt<M.length;mt++){const Q=x[mt],at=M[mt];Q!==null&&at!==void 0&&at.update(Q,et,c||a)}ft&&ft(Y,et),et.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:et}),g=null}const Gt=new Hl;Gt.setAnimationLoop(Rt),this.setAnimationLoop=function(Y){ft=Y},this.dispose=function(){}}}const Fn=new Qe,cg=new oe;function hg(s,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,bl(s)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function i(m,p,T,M,x){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p)):p.isMeshStandardMaterial?(r(m,p),f(m,p),p.isMeshPhysicalMaterial&&d(m,p,x)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),_(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?l(m,p,T,M):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===be&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===be&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const T=t.get(p),M=T.envMap,x=T.envMapRotation;M&&(m.envMap.value=M,Fn.copy(x),Fn.x*=-1,Fn.y*=-1,Fn.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(Fn.y*=-1,Fn.z*=-1),m.envMapRotation.value.setFromMatrix4(cg.makeRotationFromEuler(Fn)),m.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,T,M){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*T,m.scale.value=M*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,T){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===be&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=T.texture,m.transmissionSamplerSize.value.set(T.width,T.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){const T=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(T.matrixWorld),m.nearDistance.value=T.shadow.camera.near,m.farDistance.value=T.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function ug(s,t,e,n){let i={},r={},a=[];const o=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function l(T,M){const x=M.program;n.uniformBlockBinding(T,x)}function c(T,M){let x=i[T.id];x===void 0&&(g(T),x=h(T),i[T.id]=x,T.addEventListener("dispose",m));const w=M.program;n.updateUBOMapping(T,w);const b=t.render.frame;r[T.id]!==b&&(f(T),r[T.id]=b)}function h(T){const M=u();T.__bindingPointIndex=M;const x=s.createBuffer(),w=T.__size,b=T.usage;return s.bindBuffer(s.UNIFORM_BUFFER,x),s.bufferData(s.UNIFORM_BUFFER,w,b),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,M,x),x}function u(){for(let T=0;T<o;T++)if(a.indexOf(T)===-1)return a.push(T),T;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(T){const M=i[T.id],x=T.uniforms,w=T.__cache;s.bindBuffer(s.UNIFORM_BUFFER,M);for(let b=0,A=x.length;b<A;b++){const P=Array.isArray(x[b])?x[b]:[x[b]];for(let E=0,y=P.length;E<y;E++){const R=P[E];if(d(R,b,E,w)===!0){const z=R.__offset,F=Array.isArray(R.value)?R.value:[R.value];let H=0;for(let U=0;U<F.length;U++){const N=F[U],X=_(N);typeof N=="number"||typeof N=="boolean"?(R.__data[0]=N,s.bufferSubData(s.UNIFORM_BUFFER,z+H,R.__data)):N.isMatrix3?(R.__data[0]=N.elements[0],R.__data[1]=N.elements[1],R.__data[2]=N.elements[2],R.__data[3]=0,R.__data[4]=N.elements[3],R.__data[5]=N.elements[4],R.__data[6]=N.elements[5],R.__data[7]=0,R.__data[8]=N.elements[6],R.__data[9]=N.elements[7],R.__data[10]=N.elements[8],R.__data[11]=0):(N.toArray(R.__data,H),H+=X.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,z,R.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function d(T,M,x,w){const b=T.value,A=M+"_"+x;if(w[A]===void 0)return typeof b=="number"||typeof b=="boolean"?w[A]=b:w[A]=b.clone(),!0;{const P=w[A];if(typeof b=="number"||typeof b=="boolean"){if(P!==b)return w[A]=b,!0}else if(P.equals(b)===!1)return P.copy(b),!0}return!1}function g(T){const M=T.uniforms;let x=0;const w=16;for(let A=0,P=M.length;A<P;A++){const E=Array.isArray(M[A])?M[A]:[M[A]];for(let y=0,R=E.length;y<R;y++){const z=E[y],F=Array.isArray(z.value)?z.value:[z.value];for(let H=0,U=F.length;H<U;H++){const N=F[H],X=_(N),k=x%w,Z=k%X.boundary,st=k+Z;x+=Z,st!==0&&w-st<X.storage&&(x+=w-st),z.__data=new Float32Array(X.storage/Float32Array.BYTES_PER_ELEMENT),z.__offset=x,x+=X.storage}}}const b=x%w;return b>0&&(x+=w-b),T.__size=x,T.__cache={},this}function _(T){const M={boundary:0,storage:0};return typeof T=="number"||typeof T=="boolean"?(M.boundary=4,M.storage=4):T.isVector2?(M.boundary=8,M.storage=8):T.isVector3||T.isColor?(M.boundary=16,M.storage=12):T.isVector4?(M.boundary=16,M.storage=16):T.isMatrix3?(M.boundary=48,M.storage=48):T.isMatrix4?(M.boundary=64,M.storage=64):T.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",T),M}function m(T){const M=T.target;M.removeEventListener("dispose",m);const x=a.indexOf(M.__bindingPointIndex);a.splice(x,1),s.deleteBuffer(i[M.id]),delete i[M.id],delete r[M.id]}function p(){for(const T in i)s.deleteBuffer(i[T]);a=[],i={},r={}}return{bind:l,update:c,dispose:p}}class dg{constructor(t={}){const{canvas:e=rh(),context:n=null,depth:i=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:f=!1}=t;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=a;const g=new Uint32Array(4),_=new Int32Array(4);let m=null,p=null;const T=[],M=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Cn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const x=this;let w=!1;this._outputColorSpace=ze;let b=0,A=0,P=null,E=-1,y=null;const R=new re,z=new re;let F=null;const H=new qt(0);let U=0,N=e.width,X=e.height,k=1,Z=null,st=null;const ft=new re(0,0,N,X),Rt=new re(0,0,N,X);let Gt=!1;const Y=new La;let et=!1,mt=!1;const Q=new oe,at=new oe,Ot=new D,bt=new re,Xt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ft=!1;function jt(){return P===null?k:1}let L=n;function Pt(S,O){return e.getContext(S,O)}try{const S={alpha:!0,depth:i,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Ma}`),e.addEventListener("webglcontextlost",xt,!1),e.addEventListener("webglcontextrestored",nt,!1),e.addEventListener("webglcontextcreationerror",j,!1),L===null){const O="webgl2";if(L=Pt(O,S),L===null)throw Pt(O)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(S){throw console.error("THREE.WebGLRenderer: "+S.message),S}let pt,Lt,rt,wt,gt,St,Ht,C,v,V,K,$,q,Ct,ht,Et,At,J,_t,Ut,Nt,lt,Vt,I;function ut(){pt=new Sp(L),pt.init(),lt=new sg(L,pt),Lt=new mp(L,pt,t,lt),rt=new ng(L,pt),Lt.reverseDepthBuffer&&f&&rt.buffers.depth.setReversed(!0),wt=new bp(L),gt=new Gm,St=new ig(L,pt,rt,gt,Lt,lt,wt),Ht=new _p(x),C=new yp(x),v=new Du(L),Vt=new fp(L,v),V=new Ep(L,v,wt,Vt),K=new Cp(L,V,v,wt),_t=new wp(L,Lt,St),Et=new gp(gt),$=new Vm(x,Ht,C,pt,Lt,Vt,Et),q=new hg(x,gt),Ct=new Xm,ht=new $m(pt),J=new dp(x,Ht,C,rt,K,d,l),At=new tg(x,K,Lt),I=new ug(L,wt,Lt,rt),Ut=new pp(L,pt,wt),Nt=new Tp(L,pt,wt),wt.programs=$.programs,x.capabilities=Lt,x.extensions=pt,x.properties=gt,x.renderLists=Ct,x.shadowMap=At,x.state=rt,x.info=wt}ut();const tt=new lg(x,L);this.xr=tt,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){const S=pt.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=pt.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return k},this.setPixelRatio=function(S){S!==void 0&&(k=S,this.setSize(N,X,!1))},this.getSize=function(S){return S.set(N,X)},this.setSize=function(S,O,G=!0){if(tt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}N=S,X=O,e.width=Math.floor(S*k),e.height=Math.floor(O*k),G===!0&&(e.style.width=S+"px",e.style.height=O+"px"),this.setViewport(0,0,S,O)},this.getDrawingBufferSize=function(S){return S.set(N*k,X*k).floor()},this.setDrawingBufferSize=function(S,O,G){N=S,X=O,k=G,e.width=Math.floor(S*G),e.height=Math.floor(O*G),this.setViewport(0,0,S,O)},this.getCurrentViewport=function(S){return S.copy(R)},this.getViewport=function(S){return S.copy(ft)},this.setViewport=function(S,O,G,W){S.isVector4?ft.set(S.x,S.y,S.z,S.w):ft.set(S,O,G,W),rt.viewport(R.copy(ft).multiplyScalar(k).round())},this.getScissor=function(S){return S.copy(Rt)},this.setScissor=function(S,O,G,W){S.isVector4?Rt.set(S.x,S.y,S.z,S.w):Rt.set(S,O,G,W),rt.scissor(z.copy(Rt).multiplyScalar(k).round())},this.getScissorTest=function(){return Gt},this.setScissorTest=function(S){rt.setScissorTest(Gt=S)},this.setOpaqueSort=function(S){Z=S},this.setTransparentSort=function(S){st=S},this.getClearColor=function(S){return S.copy(J.getClearColor())},this.setClearColor=function(){J.setClearColor(...arguments)},this.getClearAlpha=function(){return J.getClearAlpha()},this.setClearAlpha=function(){J.setClearAlpha(...arguments)},this.clear=function(S=!0,O=!0,G=!0){let W=0;if(S){let B=!1;if(P!==null){const it=P.texture.format;B=it===Ca||it===wa||it===ba}if(B){const it=P.texture.type,dt=it===nn||it===Wn||it===Gi||it===Wi||it===Ea||it===Ta,yt=J.getClearColor(),vt=J.getClearAlpha(),Bt=yt.r,zt=yt.g,Dt=yt.b;dt?(g[0]=Bt,g[1]=zt,g[2]=Dt,g[3]=vt,L.clearBufferuiv(L.COLOR,0,g)):(_[0]=Bt,_[1]=zt,_[2]=Dt,_[3]=vt,L.clearBufferiv(L.COLOR,0,_))}else W|=L.COLOR_BUFFER_BIT}O&&(W|=L.DEPTH_BUFFER_BIT),G&&(W|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),L.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",xt,!1),e.removeEventListener("webglcontextrestored",nt,!1),e.removeEventListener("webglcontextcreationerror",j,!1),J.dispose(),Ct.dispose(),ht.dispose(),gt.dispose(),Ht.dispose(),C.dispose(),K.dispose(),Vt.dispose(),I.dispose(),$.dispose(),tt.dispose(),tt.removeEventListener("sessionstart",Ha),tt.removeEventListener("sessionend",Va),Dn.stop()};function xt(S){S.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),w=!0}function nt(){console.log("THREE.WebGLRenderer: Context Restored."),w=!1;const S=wt.autoReset,O=At.enabled,G=At.autoUpdate,W=At.needsUpdate,B=At.type;ut(),wt.autoReset=S,At.enabled=O,At.autoUpdate=G,At.needsUpdate=W,At.type=B}function j(S){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function Mt(S){const O=S.target;O.removeEventListener("dispose",Mt),Wt(O)}function Wt(S){le(S),gt.remove(S)}function le(S){const O=gt.get(S).programs;O!==void 0&&(O.forEach(function(G){$.releaseProgram(G)}),S.isShaderMaterial&&$.releaseShaderCache(S))}this.renderBufferDirect=function(S,O,G,W,B,it){O===null&&(O=Xt);const dt=B.isMesh&&B.matrixWorld.determinant()<0,yt=Kl(S,O,G,W,B);rt.setMaterial(W,dt);let vt=G.index,Bt=1;if(W.wireframe===!0){if(vt=V.getWireframeAttribute(G),vt===void 0)return;Bt=2}const zt=G.drawRange,Dt=G.attributes.position;let $t=zt.start*Bt,ne=(zt.start+zt.count)*Bt;it!==null&&($t=Math.max($t,it.start*Bt),ne=Math.min(ne,(it.start+it.count)*Bt)),vt!==null?($t=Math.max($t,0),ne=Math.min(ne,vt.count)):Dt!=null&&($t=Math.max($t,0),ne=Math.min(ne,Dt.count));const he=ne-$t;if(he<0||he===1/0)return;Vt.setup(B,W,yt,G,vt);let pe,Jt=Ut;if(vt!==null&&(pe=v.get(vt),Jt=Nt,Jt.setIndex(pe)),B.isMesh)W.wireframe===!0?(rt.setLineWidth(W.wireframeLinewidth*jt()),Jt.setMode(L.LINES)):Jt.setMode(L.TRIANGLES);else if(B.isLine){let It=W.linewidth;It===void 0&&(It=1),rt.setLineWidth(It*jt()),B.isLineSegments?Jt.setMode(L.LINES):B.isLineLoop?Jt.setMode(L.LINE_LOOP):Jt.setMode(L.LINE_STRIP)}else B.isPoints?Jt.setMode(L.POINTS):B.isSprite&&Jt.setMode(L.TRIANGLES);if(B.isBatchedMesh)if(B._multiDrawInstances!==null)vi("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),Jt.renderMultiDrawInstances(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount,B._multiDrawInstances);else if(pt.get("WEBGL_multi_draw"))Jt.renderMultiDraw(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount);else{const It=B._multiDrawStarts,ye=B._multiDrawCounts,te=B._multiDrawCount,Xe=vt?v.get(vt).bytesPerElement:1,$n=gt.get(W).currentProgram.getUniforms();for(let Oe=0;Oe<te;Oe++)$n.setValue(L,"_gl_DrawID",Oe),Jt.render(It[Oe]/Xe,ye[Oe])}else if(B.isInstancedMesh)Jt.renderInstances($t,he,B.count);else if(G.isInstancedBufferGeometry){const It=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,ye=Math.min(G.instanceCount,It);Jt.renderInstances($t,he,ye)}else Jt.render($t,he)};function ee(S,O,G){S.transparent===!0&&S.side===ue&&S.forceSinglePass===!1?(S.side=be,S.needsUpdate=!0,Qi(S,O,G),S.side=An,S.needsUpdate=!0,Qi(S,O,G),S.side=ue):Qi(S,O,G)}this.compile=function(S,O,G=null){G===null&&(G=S),p=ht.get(G),p.init(O),M.push(p),G.traverseVisible(function(B){B.isLight&&B.layers.test(O.layers)&&(p.pushLight(B),B.castShadow&&p.pushShadow(B))}),S!==G&&S.traverseVisible(function(B){B.isLight&&B.layers.test(O.layers)&&(p.pushLight(B),B.castShadow&&p.pushShadow(B))}),p.setupLights();const W=new Set;return S.traverse(function(B){if(!(B.isMesh||B.isPoints||B.isLine||B.isSprite))return;const it=B.material;if(it)if(Array.isArray(it))for(let dt=0;dt<it.length;dt++){const yt=it[dt];ee(yt,G,B),W.add(yt)}else ee(it,G,B),W.add(it)}),p=M.pop(),W},this.compileAsync=function(S,O,G=null){const W=this.compile(S,O,G);return new Promise(B=>{function it(){if(W.forEach(function(dt){gt.get(dt).currentProgram.isReady()&&W.delete(dt)}),W.size===0){B(S);return}setTimeout(it,10)}pt.get("KHR_parallel_shader_compile")!==null?it():setTimeout(it,10)})};let We=null;function rn(S){We&&We(S)}function Ha(){Dn.stop()}function Va(){Dn.start()}const Dn=new Hl;Dn.setAnimationLoop(rn),typeof self<"u"&&Dn.setContext(self),this.setAnimationLoop=function(S){We=S,tt.setAnimationLoop(S),S===null?Dn.stop():Dn.start()},tt.addEventListener("sessionstart",Ha),tt.addEventListener("sessionend",Va),this.render=function(S,O){if(O!==void 0&&O.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(w===!0)return;if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),tt.enabled===!0&&tt.isPresenting===!0&&(tt.cameraAutoUpdate===!0&&tt.updateCamera(O),O=tt.getCamera()),S.isScene===!0&&S.onBeforeRender(x,S,O,P),p=ht.get(S,M.length),p.init(O),M.push(p),at.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),Y.setFromProjectionMatrix(at),mt=this.localClippingEnabled,et=Et.init(this.clippingPlanes,mt),m=Ct.get(S,T.length),m.init(),T.push(m),tt.enabled===!0&&tt.isPresenting===!0){const it=x.xr.getDepthSensingMesh();it!==null&&Xs(it,O,-1/0,x.sortObjects)}Xs(S,O,0,x.sortObjects),m.finish(),x.sortObjects===!0&&m.sort(Z,st),Ft=tt.enabled===!1||tt.isPresenting===!1||tt.hasDepthSensing()===!1,Ft&&J.addToRenderList(m,S),this.info.render.frame++,et===!0&&Et.beginShadows();const G=p.state.shadowsArray;At.render(G,S,O),et===!0&&Et.endShadows(),this.info.autoReset===!0&&this.info.reset();const W=m.opaque,B=m.transmissive;if(p.setupLights(),O.isArrayCamera){const it=O.cameras;if(B.length>0)for(let dt=0,yt=it.length;dt<yt;dt++){const vt=it[dt];Wa(W,B,S,vt)}Ft&&J.render(S);for(let dt=0,yt=it.length;dt<yt;dt++){const vt=it[dt];Ga(m,S,vt,vt.viewport)}}else B.length>0&&Wa(W,B,S,O),Ft&&J.render(S),Ga(m,S,O);P!==null&&A===0&&(St.updateMultisampleRenderTarget(P),St.updateRenderTargetMipmap(P)),S.isScene===!0&&S.onAfterRender(x,S,O),Vt.resetDefaultState(),E=-1,y=null,M.pop(),M.length>0?(p=M[M.length-1],et===!0&&Et.setGlobalState(x.clippingPlanes,p.state.camera)):p=null,T.pop(),T.length>0?m=T[T.length-1]:m=null};function Xs(S,O,G,W){if(S.visible===!1)return;if(S.layers.test(O.layers)){if(S.isGroup)G=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(O);else if(S.isLight)p.pushLight(S),S.castShadow&&p.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||Y.intersectsSprite(S)){W&&bt.setFromMatrixPosition(S.matrixWorld).applyMatrix4(at);const dt=K.update(S),yt=S.material;yt.visible&&m.push(S,dt,yt,G,bt.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||Y.intersectsObject(S))){const dt=K.update(S),yt=S.material;if(W&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),bt.copy(S.boundingSphere.center)):(dt.boundingSphere===null&&dt.computeBoundingSphere(),bt.copy(dt.boundingSphere.center)),bt.applyMatrix4(S.matrixWorld).applyMatrix4(at)),Array.isArray(yt)){const vt=dt.groups;for(let Bt=0,zt=vt.length;Bt<zt;Bt++){const Dt=vt[Bt],$t=yt[Dt.materialIndex];$t&&$t.visible&&m.push(S,dt,$t,G,bt.z,Dt)}}else yt.visible&&m.push(S,dt,yt,G,bt.z,null)}}const it=S.children;for(let dt=0,yt=it.length;dt<yt;dt++)Xs(it[dt],O,G,W)}function Ga(S,O,G,W){const B=S.opaque,it=S.transmissive,dt=S.transparent;p.setupLightsView(G),et===!0&&Et.setGlobalState(x.clippingPlanes,G),W&&rt.viewport(R.copy(W)),B.length>0&&Ji(B,O,G),it.length>0&&Ji(it,O,G),dt.length>0&&Ji(dt,O,G),rt.buffers.depth.setTest(!0),rt.buffers.depth.setMask(!0),rt.buffers.color.setMask(!0),rt.setPolygonOffset(!1)}function Wa(S,O,G,W){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[W.id]===void 0&&(p.state.transmissionRenderTarget[W.id]=new Xn(1,1,{generateMipmaps:!0,type:pt.has("EXT_color_buffer_half_float")||pt.has("EXT_color_buffer_float")?$i:nn,minFilter:Gn,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Qt.workingColorSpace}));const it=p.state.transmissionRenderTarget[W.id],dt=W.viewport||R;it.setSize(dt.z*x.transmissionResolutionScale,dt.w*x.transmissionResolutionScale);const yt=x.getRenderTarget();x.setRenderTarget(it),x.getClearColor(H),U=x.getClearAlpha(),U<1&&x.setClearColor(16777215,.5),x.clear(),Ft&&J.render(G);const vt=x.toneMapping;x.toneMapping=Cn;const Bt=W.viewport;if(W.viewport!==void 0&&(W.viewport=void 0),p.setupLightsView(W),et===!0&&Et.setGlobalState(x.clippingPlanes,W),Ji(S,G,W),St.updateMultisampleRenderTarget(it),St.updateRenderTargetMipmap(it),pt.has("WEBGL_multisampled_render_to_texture")===!1){let zt=!1;for(let Dt=0,$t=O.length;Dt<$t;Dt++){const ne=O[Dt],he=ne.object,pe=ne.geometry,Jt=ne.material,It=ne.group;if(Jt.side===ue&&he.layers.test(W.layers)){const ye=Jt.side;Jt.side=be,Jt.needsUpdate=!0,Xa(he,G,W,pe,Jt,It),Jt.side=ye,Jt.needsUpdate=!0,zt=!0}}zt===!0&&(St.updateMultisampleRenderTarget(it),St.updateRenderTargetMipmap(it))}x.setRenderTarget(yt),x.setClearColor(H,U),Bt!==void 0&&(W.viewport=Bt),x.toneMapping=vt}function Ji(S,O,G){const W=O.isScene===!0?O.overrideMaterial:null;for(let B=0,it=S.length;B<it;B++){const dt=S[B],yt=dt.object,vt=dt.geometry,Bt=dt.group;let zt=dt.material;zt.allowOverride===!0&&W!==null&&(zt=W),yt.layers.test(G.layers)&&Xa(yt,O,G,vt,zt,Bt)}}function Xa(S,O,G,W,B,it){S.onBeforeRender(x,O,G,W,B,it),S.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),B.onBeforeRender(x,O,G,W,S,it),B.transparent===!0&&B.side===ue&&B.forceSinglePass===!1?(B.side=be,B.needsUpdate=!0,x.renderBufferDirect(G,O,W,B,S,it),B.side=An,B.needsUpdate=!0,x.renderBufferDirect(G,O,W,B,S,it),B.side=ue):x.renderBufferDirect(G,O,W,B,S,it),S.onAfterRender(x,O,G,W,B,it)}function Qi(S,O,G){O.isScene!==!0&&(O=Xt);const W=gt.get(S),B=p.state.lights,it=p.state.shadowsArray,dt=B.state.version,yt=$.getParameters(S,B.state,it,O,G),vt=$.getProgramCacheKey(yt);let Bt=W.programs;W.environment=S.isMeshStandardMaterial?O.environment:null,W.fog=O.fog,W.envMap=(S.isMeshStandardMaterial?C:Ht).get(S.envMap||W.environment),W.envMapRotation=W.environment!==null&&S.envMap===null?O.environmentRotation:S.envMapRotation,Bt===void 0&&(S.addEventListener("dispose",Mt),Bt=new Map,W.programs=Bt);let zt=Bt.get(vt);if(zt!==void 0){if(W.currentProgram===zt&&W.lightsStateVersion===dt)return qa(S,yt),zt}else yt.uniforms=$.getUniforms(S),S.onBeforeCompile(yt,x),zt=$.acquireProgram(yt,vt),Bt.set(vt,zt),W.uniforms=yt.uniforms;const Dt=W.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(Dt.clippingPlanes=Et.uniform),qa(S,yt),W.needsLights=jl(S),W.lightsStateVersion=dt,W.needsLights&&(Dt.ambientLightColor.value=B.state.ambient,Dt.lightProbe.value=B.state.probe,Dt.directionalLights.value=B.state.directional,Dt.directionalLightShadows.value=B.state.directionalShadow,Dt.spotLights.value=B.state.spot,Dt.spotLightShadows.value=B.state.spotShadow,Dt.rectAreaLights.value=B.state.rectArea,Dt.ltc_1.value=B.state.rectAreaLTC1,Dt.ltc_2.value=B.state.rectAreaLTC2,Dt.pointLights.value=B.state.point,Dt.pointLightShadows.value=B.state.pointShadow,Dt.hemisphereLights.value=B.state.hemi,Dt.directionalShadowMap.value=B.state.directionalShadowMap,Dt.directionalShadowMatrix.value=B.state.directionalShadowMatrix,Dt.spotShadowMap.value=B.state.spotShadowMap,Dt.spotLightMatrix.value=B.state.spotLightMatrix,Dt.spotLightMap.value=B.state.spotLightMap,Dt.pointShadowMap.value=B.state.pointShadowMap,Dt.pointShadowMatrix.value=B.state.pointShadowMatrix),W.currentProgram=zt,W.uniformsList=null,zt}function Ya(S){if(S.uniformsList===null){const O=S.currentProgram.getUniforms();S.uniformsList=Is.seqWithValue(O.seq,S.uniforms)}return S.uniformsList}function qa(S,O){const G=gt.get(S);G.outputColorSpace=O.outputColorSpace,G.batching=O.batching,G.batchingColor=O.batchingColor,G.instancing=O.instancing,G.instancingColor=O.instancingColor,G.instancingMorph=O.instancingMorph,G.skinning=O.skinning,G.morphTargets=O.morphTargets,G.morphNormals=O.morphNormals,G.morphColors=O.morphColors,G.morphTargetsCount=O.morphTargetsCount,G.numClippingPlanes=O.numClippingPlanes,G.numIntersection=O.numClipIntersection,G.vertexAlphas=O.vertexAlphas,G.vertexTangents=O.vertexTangents,G.toneMapping=O.toneMapping}function Kl(S,O,G,W,B){O.isScene!==!0&&(O=Xt),St.resetTextureUnits();const it=O.fog,dt=W.isMeshStandardMaterial?O.environment:null,yt=P===null?x.outputColorSpace:P.isXRRenderTarget===!0?P.texture.colorSpace:Ei,vt=(W.isMeshStandardMaterial?C:Ht).get(W.envMap||dt),Bt=W.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,zt=!!G.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),Dt=!!G.morphAttributes.position,$t=!!G.morphAttributes.normal,ne=!!G.morphAttributes.color;let he=Cn;W.toneMapped&&(P===null||P.isXRRenderTarget===!0)&&(he=x.toneMapping);const pe=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,Jt=pe!==void 0?pe.length:0,It=gt.get(W),ye=p.state.lights;if(et===!0&&(mt===!0||S!==y)){const Ce=S===y&&W.id===E;Et.setState(W,S,Ce)}let te=!1;W.version===It.__version?(It.needsLights&&It.lightsStateVersion!==ye.state.version||It.outputColorSpace!==yt||B.isBatchedMesh&&It.batching===!1||!B.isBatchedMesh&&It.batching===!0||B.isBatchedMesh&&It.batchingColor===!0&&B.colorTexture===null||B.isBatchedMesh&&It.batchingColor===!1&&B.colorTexture!==null||B.isInstancedMesh&&It.instancing===!1||!B.isInstancedMesh&&It.instancing===!0||B.isSkinnedMesh&&It.skinning===!1||!B.isSkinnedMesh&&It.skinning===!0||B.isInstancedMesh&&It.instancingColor===!0&&B.instanceColor===null||B.isInstancedMesh&&It.instancingColor===!1&&B.instanceColor!==null||B.isInstancedMesh&&It.instancingMorph===!0&&B.morphTexture===null||B.isInstancedMesh&&It.instancingMorph===!1&&B.morphTexture!==null||It.envMap!==vt||W.fog===!0&&It.fog!==it||It.numClippingPlanes!==void 0&&(It.numClippingPlanes!==Et.numPlanes||It.numIntersection!==Et.numIntersection)||It.vertexAlphas!==Bt||It.vertexTangents!==zt||It.morphTargets!==Dt||It.morphNormals!==$t||It.morphColors!==ne||It.toneMapping!==he||It.morphTargetsCount!==Jt)&&(te=!0):(te=!0,It.__version=W.version);let Xe=It.currentProgram;te===!0&&(Xe=Qi(W,O,B));let $n=!1,Oe=!1,Ai=!1;const ce=Xe.getUniforms(),He=It.uniforms;if(rt.useProgram(Xe.program)&&($n=!0,Oe=!0,Ai=!0),W.id!==E&&(E=W.id,Oe=!0),$n||y!==S){rt.buffers.depth.getReversed()?(Q.copy(S.projectionMatrix),oh(Q),lh(Q),ce.setValue(L,"projectionMatrix",Q)):ce.setValue(L,"projectionMatrix",S.projectionMatrix),ce.setValue(L,"viewMatrix",S.matrixWorldInverse);const Le=ce.map.cameraPosition;Le!==void 0&&Le.setValue(L,Ot.setFromMatrixPosition(S.matrixWorld)),Lt.logarithmicDepthBuffer&&ce.setValue(L,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&ce.setValue(L,"isOrthographic",S.isOrthographicCamera===!0),y!==S&&(y=S,Oe=!0,Ai=!0)}if(B.isSkinnedMesh){ce.setOptional(L,B,"bindMatrix"),ce.setOptional(L,B,"bindMatrixInverse");const Ce=B.skeleton;Ce&&(Ce.boneTexture===null&&Ce.computeBoneTexture(),ce.setValue(L,"boneTexture",Ce.boneTexture,St))}B.isBatchedMesh&&(ce.setOptional(L,B,"batchingTexture"),ce.setValue(L,"batchingTexture",B._matricesTexture,St),ce.setOptional(L,B,"batchingIdTexture"),ce.setValue(L,"batchingIdTexture",B._indirectTexture,St),ce.setOptional(L,B,"batchingColorTexture"),B._colorsTexture!==null&&ce.setValue(L,"batchingColorTexture",B._colorsTexture,St));const Ve=G.morphAttributes;if((Ve.position!==void 0||Ve.normal!==void 0||Ve.color!==void 0)&&_t.update(B,G,Xe),(Oe||It.receiveShadow!==B.receiveShadow)&&(It.receiveShadow=B.receiveShadow,ce.setValue(L,"receiveShadow",B.receiveShadow)),W.isMeshGouraudMaterial&&W.envMap!==null&&(He.envMap.value=vt,He.flipEnvMap.value=vt.isCubeTexture&&vt.isRenderTargetTexture===!1?-1:1),W.isMeshStandardMaterial&&W.envMap===null&&O.environment!==null&&(He.envMapIntensity.value=O.environmentIntensity),Oe&&(ce.setValue(L,"toneMappingExposure",x.toneMappingExposure),It.needsLights&&Zl(He,Ai),it&&W.fog===!0&&q.refreshFogUniforms(He,it),q.refreshMaterialUniforms(He,W,k,X,p.state.transmissionRenderTarget[S.id]),Is.upload(L,Ya(It),He,St)),W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(Is.upload(L,Ya(It),He,St),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&ce.setValue(L,"center",B.center),ce.setValue(L,"modelViewMatrix",B.modelViewMatrix),ce.setValue(L,"normalMatrix",B.normalMatrix),ce.setValue(L,"modelMatrix",B.matrixWorld),W.isShaderMaterial||W.isRawShaderMaterial){const Ce=W.uniformsGroups;for(let Le=0,Ys=Ce.length;Le<Ys;Le++){const Pn=Ce[Le];I.update(Pn,Xe),I.bind(Pn,Xe)}}return Xe}function Zl(S,O){S.ambientLightColor.needsUpdate=O,S.lightProbe.needsUpdate=O,S.directionalLights.needsUpdate=O,S.directionalLightShadows.needsUpdate=O,S.pointLights.needsUpdate=O,S.pointLightShadows.needsUpdate=O,S.spotLights.needsUpdate=O,S.spotLightShadows.needsUpdate=O,S.rectAreaLights.needsUpdate=O,S.hemisphereLights.needsUpdate=O}function jl(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return b},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return P},this.setRenderTargetTextures=function(S,O,G){const W=gt.get(S);W.__autoAllocateDepthBuffer=S.resolveDepthBuffer===!1,W.__autoAllocateDepthBuffer===!1&&(W.__useRenderToTexture=!1),gt.get(S.texture).__webglTexture=O,gt.get(S.depthTexture).__webglTexture=W.__autoAllocateDepthBuffer?void 0:G,W.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(S,O){const G=gt.get(S);G.__webglFramebuffer=O,G.__useDefaultFramebuffer=O===void 0};const $l=L.createFramebuffer();this.setRenderTarget=function(S,O=0,G=0){P=S,b=O,A=G;let W=!0,B=null,it=!1,dt=!1;if(S){const vt=gt.get(S);if(vt.__useDefaultFramebuffer!==void 0)rt.bindFramebuffer(L.FRAMEBUFFER,null),W=!1;else if(vt.__webglFramebuffer===void 0)St.setupRenderTarget(S);else if(vt.__hasExternalTextures)St.rebindTextures(S,gt.get(S.texture).__webglTexture,gt.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){const Dt=S.depthTexture;if(vt.__boundDepthTexture!==Dt){if(Dt!==null&&gt.has(Dt)&&(S.width!==Dt.image.width||S.height!==Dt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");St.setupDepthRenderbuffer(S)}}const Bt=S.texture;(Bt.isData3DTexture||Bt.isDataArrayTexture||Bt.isCompressedArrayTexture)&&(dt=!0);const zt=gt.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(zt[O])?B=zt[O][G]:B=zt[O],it=!0):S.samples>0&&St.useMultisampledRTT(S)===!1?B=gt.get(S).__webglMultisampledFramebuffer:Array.isArray(zt)?B=zt[G]:B=zt,R.copy(S.viewport),z.copy(S.scissor),F=S.scissorTest}else R.copy(ft).multiplyScalar(k).floor(),z.copy(Rt).multiplyScalar(k).floor(),F=Gt;if(G!==0&&(B=$l),rt.bindFramebuffer(L.FRAMEBUFFER,B)&&W&&rt.drawBuffers(S,B),rt.viewport(R),rt.scissor(z),rt.setScissorTest(F),it){const vt=gt.get(S.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+O,vt.__webglTexture,G)}else if(dt){const vt=gt.get(S.texture),Bt=O;L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,vt.__webglTexture,G,Bt)}else if(S!==null&&G!==0){const vt=gt.get(S.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,vt.__webglTexture,G)}E=-1},this.readRenderTargetPixels=function(S,O,G,W,B,it,dt,yt=0){if(!(S&&S.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let vt=gt.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&dt!==void 0&&(vt=vt[dt]),vt){rt.bindFramebuffer(L.FRAMEBUFFER,vt);try{const Bt=S.textures[yt],zt=Bt.format,Dt=Bt.type;if(!Lt.textureFormatReadable(zt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Lt.textureTypeReadable(Dt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=S.width-W&&G>=0&&G<=S.height-B&&(S.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+yt),L.readPixels(O,G,W,B,lt.convert(zt),lt.convert(Dt),it))}finally{const Bt=P!==null?gt.get(P).__webglFramebuffer:null;rt.bindFramebuffer(L.FRAMEBUFFER,Bt)}}},this.readRenderTargetPixelsAsync=async function(S,O,G,W,B,it,dt,yt=0){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let vt=gt.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&dt!==void 0&&(vt=vt[dt]),vt)if(O>=0&&O<=S.width-W&&G>=0&&G<=S.height-B){rt.bindFramebuffer(L.FRAMEBUFFER,vt);const Bt=S.textures[yt],zt=Bt.format,Dt=Bt.type;if(!Lt.textureFormatReadable(zt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Lt.textureTypeReadable(Dt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const $t=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,$t),L.bufferData(L.PIXEL_PACK_BUFFER,it.byteLength,L.STREAM_READ),S.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+yt),L.readPixels(O,G,W,B,lt.convert(zt),lt.convert(Dt),0);const ne=P!==null?gt.get(P).__webglFramebuffer:null;rt.bindFramebuffer(L.FRAMEBUFFER,ne);const he=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await ah(L,he,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,$t),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,it),L.deleteBuffer($t),L.deleteSync(he),it}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(S,O=null,G=0){const W=Math.pow(2,-G),B=Math.floor(S.image.width*W),it=Math.floor(S.image.height*W),dt=O!==null?O.x:0,yt=O!==null?O.y:0;St.setTexture2D(S,0),L.copyTexSubImage2D(L.TEXTURE_2D,G,0,0,dt,yt,B,it),rt.unbindTexture()};const Jl=L.createFramebuffer(),Ql=L.createFramebuffer();this.copyTextureToTexture=function(S,O,G=null,W=null,B=0,it=null){it===null&&(B!==0?(vi("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),it=B,B=0):it=0);let dt,yt,vt,Bt,zt,Dt,$t,ne,he;const pe=S.isCompressedTexture?S.mipmaps[it]:S.image;if(G!==null)dt=G.max.x-G.min.x,yt=G.max.y-G.min.y,vt=G.isBox3?G.max.z-G.min.z:1,Bt=G.min.x,zt=G.min.y,Dt=G.isBox3?G.min.z:0;else{const Ve=Math.pow(2,-B);dt=Math.floor(pe.width*Ve),yt=Math.floor(pe.height*Ve),S.isDataArrayTexture?vt=pe.depth:S.isData3DTexture?vt=Math.floor(pe.depth*Ve):vt=1,Bt=0,zt=0,Dt=0}W!==null?($t=W.x,ne=W.y,he=W.z):($t=0,ne=0,he=0);const Jt=lt.convert(O.format),It=lt.convert(O.type);let ye;O.isData3DTexture?(St.setTexture3D(O,0),ye=L.TEXTURE_3D):O.isDataArrayTexture||O.isCompressedArrayTexture?(St.setTexture2DArray(O,0),ye=L.TEXTURE_2D_ARRAY):(St.setTexture2D(O,0),ye=L.TEXTURE_2D),L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,O.flipY),L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),L.pixelStorei(L.UNPACK_ALIGNMENT,O.unpackAlignment);const te=L.getParameter(L.UNPACK_ROW_LENGTH),Xe=L.getParameter(L.UNPACK_IMAGE_HEIGHT),$n=L.getParameter(L.UNPACK_SKIP_PIXELS),Oe=L.getParameter(L.UNPACK_SKIP_ROWS),Ai=L.getParameter(L.UNPACK_SKIP_IMAGES);L.pixelStorei(L.UNPACK_ROW_LENGTH,pe.width),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,pe.height),L.pixelStorei(L.UNPACK_SKIP_PIXELS,Bt),L.pixelStorei(L.UNPACK_SKIP_ROWS,zt),L.pixelStorei(L.UNPACK_SKIP_IMAGES,Dt);const ce=S.isDataArrayTexture||S.isData3DTexture,He=O.isDataArrayTexture||O.isData3DTexture;if(S.isDepthTexture){const Ve=gt.get(S),Ce=gt.get(O),Le=gt.get(Ve.__renderTarget),Ys=gt.get(Ce.__renderTarget);rt.bindFramebuffer(L.READ_FRAMEBUFFER,Le.__webglFramebuffer),rt.bindFramebuffer(L.DRAW_FRAMEBUFFER,Ys.__webglFramebuffer);for(let Pn=0;Pn<vt;Pn++)ce&&(L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,gt.get(S).__webglTexture,B,Dt+Pn),L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,gt.get(O).__webglTexture,it,he+Pn)),L.blitFramebuffer(Bt,zt,dt,yt,$t,ne,dt,yt,L.DEPTH_BUFFER_BIT,L.NEAREST);rt.bindFramebuffer(L.READ_FRAMEBUFFER,null),rt.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else if(B!==0||S.isRenderTargetTexture||gt.has(S)){const Ve=gt.get(S),Ce=gt.get(O);rt.bindFramebuffer(L.READ_FRAMEBUFFER,Jl),rt.bindFramebuffer(L.DRAW_FRAMEBUFFER,Ql);for(let Le=0;Le<vt;Le++)ce?L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Ve.__webglTexture,B,Dt+Le):L.framebufferTexture2D(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,Ve.__webglTexture,B),He?L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Ce.__webglTexture,it,he+Le):L.framebufferTexture2D(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,Ce.__webglTexture,it),B!==0?L.blitFramebuffer(Bt,zt,dt,yt,$t,ne,dt,yt,L.COLOR_BUFFER_BIT,L.NEAREST):He?L.copyTexSubImage3D(ye,it,$t,ne,he+Le,Bt,zt,dt,yt):L.copyTexSubImage2D(ye,it,$t,ne,Bt,zt,dt,yt);rt.bindFramebuffer(L.READ_FRAMEBUFFER,null),rt.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else He?S.isDataTexture||S.isData3DTexture?L.texSubImage3D(ye,it,$t,ne,he,dt,yt,vt,Jt,It,pe.data):O.isCompressedArrayTexture?L.compressedTexSubImage3D(ye,it,$t,ne,he,dt,yt,vt,Jt,pe.data):L.texSubImage3D(ye,it,$t,ne,he,dt,yt,vt,Jt,It,pe):S.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,it,$t,ne,dt,yt,Jt,It,pe.data):S.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,it,$t,ne,pe.width,pe.height,Jt,pe.data):L.texSubImage2D(L.TEXTURE_2D,it,$t,ne,dt,yt,Jt,It,pe);L.pixelStorei(L.UNPACK_ROW_LENGTH,te),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,Xe),L.pixelStorei(L.UNPACK_SKIP_PIXELS,$n),L.pixelStorei(L.UNPACK_SKIP_ROWS,Oe),L.pixelStorei(L.UNPACK_SKIP_IMAGES,Ai),it===0&&O.generateMipmaps&&L.generateMipmap(ye),rt.unbindTexture()},this.copyTextureToTexture3D=function(S,O,G=null,W=null,B=0){return vi('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(S,O,G,W,B)},this.initRenderTarget=function(S){gt.get(S).__webglFramebuffer===void 0&&St.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?St.setTextureCube(S,0):S.isData3DTexture?St.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?St.setTexture2DArray(S,0):St.setTexture2D(S,0),rt.unbindTexture()},this.resetState=function(){b=0,A=0,P=null,rt.reset(),Vt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return fn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=Qt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Qt._getUnpackColorSpace()}}class fg{constructor(t){this.scene=t,this.fieldWidth=32*1.5,this.fieldDepth=24*1.5,this.wallHeight=8,this.walls={},this.floor=null,this.textureLoader=new Fa,this.wallMaterial=null,this.obstacles=[],this.portals=[],this.portalLights=[],this.DOOR_WIDTH=4,this.DOOR_HEIGHT=5.2,this.doorWall=null,this.doorSlab=null,this.doorFrameMeshes=[],this._frameMat=null,this._slabMat=null,this._voidMesh=null,this._doorLight=null,this._doorLightTime=0,this.doorIsOpen=!1,this._doorAnimating=!1,this._doorAnimProgress=0,this._doorSlabStartY=0,this._doorSlabEndY=0,this._doorOpeningCenter=null,this._doorIsNS=!0,this.circleRadius=null,this._circularWalls=null,this.nextShape=null,this.hexRings=null,this._hexFloorMeshes=[],this._hexFloorMat=null,this._hexPitMat=null,this._hexOuterWalls=[],this.bullseyeRings=null,this._bullseyeColumnMeshes=[],this.donutInnerRadius=null}applyWallUVs(t,e,n,i){const r=t.attributes.uv,a=t.attributes.normal;for(let o=0;o<r.count;o++){let l=r.getX(o),c=r.getY(o);const h=Math.abs(a.getX(o)),u=Math.abs(a.getY(o));h>.5?(l*=i/6,c*=n/6):u>.5?(l*=e/6,c*=i/6):(l*=e/6,c*=n/6),r.setXY(o,l,c)}r.needsUpdate=!0}applyCylinderUVs(t,e,n){const i=t.attributes.uv,r=t.attributes.normal,a=2*Math.PI*e;for(let o=0;o<i.count;o++){let l=i.getX(o),c=i.getY(o);Math.abs(r.getY(o))<.5?(l*=a/6,c*=n/6):(l*=e*2/6,c*=e*2/6),i.setXY(o,l,c)}i.needsUpdate=!0}getAllWalls(){const t=Object.values(this.walls).filter(e=>e!==void 0);return this.doorSlab&&!this.doorIsOpen&&t.push(this.doorSlab),this._bullseyeColumnMeshes&&this._bullseyeColumnMeshes.length&&t.push(...this._bullseyeColumnMeshes),t}getVisualWalls(){const t=[];for(const e of Object.values(this.walls))e&&e.material instanceof Se&&t.push(e);for(const e of this.doorFrameMeshes)e.material instanceof Se&&t.push(e);this.doorSlab&&t.push(this.doorSlab);for(const e of this._hexOuterWalls||[])e.material instanceof Se&&t.push(e);for(const e of this._bullseyeColumnMeshes||[])e.material instanceof Se&&t.push(e);return t}_initTransparency(){for(const t of this.getVisualWalls()){const e=t.material.clone();e.transparent=!0,e.opacity=1,t.material=e}}load(){const t=this.nextShape||(Math.random()<.4?"circle":"rect");this.nextShape=null,t==="circle"?this._loadCircular():t==="hexagon"?this._loadHexagon():t==="bullseye"?this._loadBullseye():t==="donut"?this._loadDonut():this._loadRectangular()}_loadRectangular(){this.circleRadius=null,this._circularWalls=null,this.fieldWidth=32*1.5,this.fieldDepth=24*1.5;const t=new Be(this.fieldWidth,this.fieldDepth),e=this.textureLoader.load("images/tile-stone-1.png");e.wrapS=ae,e.wrapT=ae,e.repeat.set(this.fieldWidth/6,this.fieldDepth/6);const n=new Se({map:e,roughness:.6,metalness:.2,side:ue}),i=this.textureLoader.load("images/tile-stone-1.png");i.wrapS=ae,i.wrapT=ae,this.wallMaterial=new Se({map:i,roughness:.6,metalness:.2}),this.floor=new Tt(t,n),this.floor.rotation.x=-Math.PI/2,this.floor.receiveShadow=!0,this.scene.add(this.floor);const r=new kt(this.fieldWidth,this.wallHeight,.5);this.applyWallUVs(r,this.fieldWidth,this.wallHeight,.5),this.walls.north=new Tt(r,this.wallMaterial),this.walls.north.position.set(0,this.wallHeight/2,-this.fieldDepth/2),this.walls.north.castShadow=!0,this.walls.north.receiveShadow=!0,this.scene.add(this.walls.north);const a=new kt(this.fieldWidth,this.wallHeight,.5);this.applyWallUVs(a,this.fieldWidth,this.wallHeight,.5),this.walls.south=new Tt(a,this.wallMaterial),this.walls.south.position.set(0,this.wallHeight/2,this.fieldDepth/2),this.walls.south.castShadow=!0,this.walls.south.receiveShadow=!0,this.scene.add(this.walls.south);const o=new kt(.5,this.wallHeight,this.fieldDepth);this.applyWallUVs(o,.5,this.wallHeight,this.fieldDepth),this.walls.east=new Tt(o,this.wallMaterial),this.walls.east.position.set(this.fieldWidth/2,this.wallHeight/2,0),this.walls.east.castShadow=!0,this.walls.east.receiveShadow=!0,this.scene.add(this.walls.east);const l=new kt(.5,this.wallHeight,this.fieldDepth);this.applyWallUVs(l,.5,this.wallHeight,this.fieldDepth),this.walls.west=new Tt(l,this.wallMaterial),this.walls.west.position.set(-this.fieldWidth/2,this.wallHeight/2,0),this.walls.west.castShadow=!0,this.walls.west.receiveShadow=!0,this.scene.add(this.walls.west),this.generateRandomObstacles(),this._createDoor(),this._initTransparency(),this._scatterVineTilesOnWalls(),this._addLighting()}_loadCircular(){const i=this.wallHeight,r=this.DOOR_WIDTH,a=this.DOOR_HEIGHT;this.circleRadius=24,this._circularWalls=[],this.fieldWidth=24*4,this.fieldDepth=24*4;const o=this.textureLoader.load("images/tile-stone-1.png");o.wrapS=ae,o.wrapT=ae,o.repeat.set(24*2/6,24*2/6),this.floor=new Tt(new Bs(24,48),new Se({map:o,roughness:.6,metalness:.2,side:ue})),this.floor.rotation.x=-Math.PI/2,this.floor.receiveShadow=!0,this.scene.add(this.floor);const l=this.textureLoader.load("images/tile-stone-1.png");l.wrapS=ae,l.wrapT=ae,this.wallMaterial=new Se({map:l,roughness:.6,metalness:.2});const c=2*24*Math.tan(Math.PI/12),h=(R,z,F,H,U=0)=>{const N=new Tt(R,this.wallMaterial);return N.position.set(z,F,H),U!==0&&(N.rotation.y=U),N.castShadow=!0,N.receiveShadow=!0,this.scene.add(N),N},u=12/2,f=u*(2*Math.PI/12),d=Math.cos(f)*24;this.doorWall="north",this._doorIsNS=!0,this._doorOpeningCenter={x:0,z:d},this._doorSlabStartY=a/2,this._doorSlabEndY=i+a,this._frameMat=this.wallMaterial.clone(),this._frameMat.color.setHex(10066329),this._frameMat.emissive=new qt(0),this._frameMat.emissiveIntensity=0,this._slabMat=this.wallMaterial.clone(),this._slabMat.color.setHex(10066329),this._slabMat.clippingPlanes=[new ke(new D(0,-1,0),i)],this._slabMat.clipShadows=!0;const g=(R,z,F,H)=>{const U=new Tt(R,this._frameMat);return U.position.set(z,F,H),this.scene.add(U),this.doorFrameMeshes.push(U),U},_=.7,m=.5,p=m,T=i-a-p,M=(c-r)/2,x=M/2+r/2;for(const R of[-1,1]){const z=new kt(M,i,.5);this.applyWallUVs(z,M,i,.5);const F=h(z,R*x,i/2,d);this.walls[`north_${R>0?"right":"left"}`]=F}for(const R of[-1,1]){const z=new kt(m,a,_);this.applyWallUVs(z,m,a,_),g(z,R*(r/2+m/2),a/2,d)}const w=r+m*2,b=new kt(w,p,_);if(this.applyWallUVs(b,w,p,_),g(b,0,a+p/2,d),T>0){const R=new kt(r,T,.5);this.applyWallUVs(R,r,T,.5),this.walls.north_above=h(R,0,a+p+T/2,d)}const A=new Be(r,a),P=new Ze({color:0,side:ue}),E=new Tt(A,P);E.position.set(0,a/2,d-.4),this.scene.add(E),this.doorFrameMeshes.push(E),this._voidMesh=E;const y=new kt(r,a,.5);this.applyWallUVs(y,r,a,.5),this.doorSlab=new Tt(y,this._slabMat),this.doorSlab.position.set(0,a/2,d),this.scene.add(this.doorSlab),this._circularWalls.push({theta:f,sideLen:c,isDoor:!0});for(let R=0;R<12;R++){if(R===u)continue;const z=R*(2*Math.PI/12),F=Math.sin(z)*24,H=Math.cos(z)*24,U=new kt(c,i,.5);this.applyWallUVs(U,c,i,.5);const N=new Tt(U,this.wallMaterial);N.position.set(F,i/2,H),N.rotation.y=z,N.castShadow=!0,N.receiveShadow=!0,this.scene.add(N),this.walls[`poly_${R}`]=N,this._circularWalls.push({theta:z,sideLen:c,isDoor:!1})}this.generateRandomObstacles(),this._initTransparency(),this._scatterVineTilesOnWalls(),this._addLighting()}_loadHexagon(){const i=Math.PI/6,r=Math.sqrt(3)/2,a=this.wallHeight+1,o=.5,l=27,c=23,h=8,u=6.5,f=5,d=l*r,g=c*r,_=h*r,m=u*r,p=f*r;this.hexRings={HIGH_Y:2,MED_Y:1,LOW_Y:-1,RA_in:d,RB_in:g,RC_in:_,RD_in:m,RE_in:p},this._hexFloorMat=null,this.fieldWidth=l*4,this.fieldDepth=l*4,this.circleRadius=d,this._circularWalls=[];const T=this.textureLoader.load("images/tile-stone-1.png");T.wrapS=ae,T.wrapT=ae;const M=this.textureLoader.load("images/tile-stone-1.png");M.wrapS=ae,M.wrapT=ae,this.wallMaterial=new Se({map:M,roughness:.6,metalness:.2});const x=new Se({map:T,roughness:.6,metalness:.2,side:ue});this._hexFloorMat=x;const w=this.textureLoader.load("images/tile-stone-red-1.png");w.wrapS=ae,w.wrapT=ae;const b=new Se({map:w,roughness:.6,metalness:.2,side:ue});this._hexPitMat=b;const A=(Pt,pt)=>{const Lt=[];for(let rt=0;rt<6;rt++){const wt=rt*Math.PI/3+i;Lt.push(new D(Math.sin(wt)*Pt,pt,Math.cos(wt)*Pt))}return Lt},P=(Pt,pt,Lt,rt,wt=x)=>{const gt=new Float32Array([Pt.x,Pt.y,Pt.z,pt.x,pt.y,pt.z,Lt.x,Lt.y,Lt.z,rt.x,rt.y,rt.z]),St=new Float32Array([Pt.x/6,Pt.z/6,pt.x/6,pt.z/6,Lt.x/6,Lt.z/6,rt.x/6,rt.z/6]),Ht=new we;Ht.setAttribute("position",new De(gt,3)),Ht.setAttribute("uv",new De(St,2)),Ht.setIndex([0,1,2,0,2,3]),Ht.computeVertexNormals();const C=new Tt(Ht,wt);C.receiveShadow=!0,this.scene.add(C),this._hexFloorMeshes.push(C)},E=(Pt,pt,Lt,rt,wt=x)=>{const gt=A(Pt,pt),St=A(Lt,rt);for(let Ht=0;Ht<6;Ht++){const C=(Ht+1)%6;P(gt[Ht],gt[C],St[C],St[Ht],wt)}},y=(Pt,pt,Lt=x)=>{const rt=A(Pt,pt),wt=[0,pt,0],gt=[0,0];for(let v=0;v<6;v++)wt.push(rt[v].x,pt,rt[v].z),gt.push(rt[v].x/6,rt[v].z/6);const St=[];for(let v=0;v<6;v++)St.push(0,v+1,(v+1)%6+1);const Ht=new we;Ht.setAttribute("position",new De(new Float32Array(wt),3)),Ht.setAttribute("uv",new De(new Float32Array(gt),2)),Ht.setIndex(St),Ht.computeVertexNormals();const C=new Tt(Ht,Lt);C.receiveShadow=!0,this.scene.add(C),this._hexFloorMeshes.push(C)};E(l,1,h,1),E(h,1,f,-1,b),y(f,-1,b);const R=2,z=(R+.5)*Math.PI/3+i,F=Math.cos(z)*d,H=l,U=this.DOOR_WIDTH,N=this.DOOR_HEIGHT;this.doorWall="north",this._doorIsNS=!0,this._doorOpeningCenter={x:0,z:F},this._doorSlabStartY=1+N/2,this._doorSlabEndY=a+N,this._frameMat=this.wallMaterial.clone(),this._frameMat.color.setHex(10066329),this._frameMat.emissive=new qt(0),this._frameMat.emissiveIntensity=0,this._slabMat=this.wallMaterial.clone(),this._slabMat.color.setHex(10066329),this._slabMat.clippingPlanes=[new ke(new D(0,-1,0),a)],this._slabMat.clipShadows=!0;const X=(Pt,pt,Lt,rt,wt=0,gt=null)=>{const St=new Tt(Pt,this.wallMaterial);return St.position.set(pt,Lt,rt),wt!==0&&(St.rotation.y=wt),St.castShadow=!0,St.receiveShadow=!0,this.scene.add(St),gt&&(this.walls[gt]=St),St},k=(Pt,pt,Lt,rt)=>{const wt=new Tt(Pt,this._frameMat);return wt.position.set(pt,Lt,rt),this.scene.add(wt),this.doorFrameMeshes.push(wt),wt},Z=.7,st=.5,ft=st,Rt=a-1-N-ft,Gt=(H-U)/2,Y=Gt/2+U/2;for(const Pt of[-1,1]){const pt=new kt(Gt,a,o);this.applyWallUVs(pt,Gt,a,o),X(pt,Pt*Y,a/2,F,0,`north_${Pt>0?"right":"left"}`)}for(const Pt of[-1,1]){const pt=new kt(st,N,Z);this.applyWallUVs(pt,st,N,Z),k(pt,Pt*(U/2+st/2),1+N/2,F)}const et=U+st*2,mt=new kt(et,ft,Z);if(this.applyWallUVs(mt,et,ft,Z),k(mt,0,1+N+ft/2,F),Rt>.01){const Pt=new kt(U,Rt,o);this.applyWallUVs(Pt,U,Rt,o),X(Pt,0,1+N+ft+Rt/2,F,0,"north_above")}const Q=new Be(U,N),at=new Ze({color:0,side:ue}),Ot=new Tt(Q,at);Ot.position.set(0,1+N/2,F-.4),this.scene.add(Ot),this.doorFrameMeshes.push(Ot),this._voidMesh=Ot;const bt=new kt(U,N,o);this.applyWallUVs(bt,U,N,o),this.doorSlab=new Tt(bt,this._slabMat),this.doorSlab.position.set(0,1+N/2,F),this.scene.add(this.doorSlab),this._circularWalls.push({theta:z,sideLen:H,isDoor:!0});for(let Pt=0;Pt<6;Pt++){if(Pt===R)continue;const pt=(Pt+.5)*Math.PI/3+i,Lt=Math.sin(pt)*d,rt=Math.cos(pt)*d,wt=new kt(H,a,o);this.applyWallUVs(wt,H,a,o);const gt=X(wt,Lt,a/2,rt,pt);this._hexOuterWalls.push(gt),this._circularWalls.push({theta:pt,sideLen:H,isDoor:!1})}const Xt=17,Ft=3,jt=6,L=Math.PI/6;for(let Pt=0;Pt<jt;Pt++){const pt=L+Pt*(2*Math.PI/jt),Lt=Math.sin(pt)*Xt,rt=Math.cos(pt)*Xt,wt=pt+Math.PI,gt={x:Lt,z:rt,width:Ft,depth:Ft,type:"triangle",rotY:wt};this.obstacles.push(gt);const St=new pn(Ft/2,Ft/2,this.wallHeight,3);this.applyCylinderUVs(St,Ft/2,this.wallHeight);const Ht=new Tt(St,this.wallMaterial);Ht.position.set(Lt,1+this.wallHeight/2,rt),Ht.rotation.y=wt,Ht.castShadow=!0,Ht.receiveShadow=!0,this.scene.add(Ht),this.walls[`hex_col_${Pt}`]=Ht}this._initTransparency(),this._addLighting()}_loadBullseye(){const d=this.wallHeight,g=.5;this.circleRadius=22,this._circularWalls=[],this.fieldWidth=22*4,this.fieldDepth=22*4,this.obstacles=[],this._bullseyeColumnMeshes=[];const _=this.textureLoader.load("images/tile-stone-1.png");_.wrapS=ae,_.wrapT=ae,this.wallMaterial=new Se({map:_,roughness:.6,metalness:.2});const m=Q=>{const at=this.textureLoader.load("images/tile-stone-1.png");return at.wrapS=ae,at.wrapT=ae,at.repeat.set(Q*2/6,Q*2/6),new Se({map:at,roughness:.6,metalness:.2,side:ue})},p=new bn,T=new bn,M=new bn;this.scene.add(p,T,M);const x=new Tt(new Bs(8,64),m(8));x.rotation.x=-Math.PI/2,x.receiveShadow=!0,p.add(x);const w=new Tt(new Vi(8,16,64),m(16));w.rotation.x=-Math.PI/2,w.receiveShadow=!0,T.add(w);const b=new Tt(new Vi(16,22,64),m(22));b.rotation.x=-Math.PI/2,b.receiveShadow=!0,M.add(b);const A=(Q,at,Ot,bt)=>{for(let Xt=0;Xt<at;Xt++){const Ft=Xt/at*Math.PI*2,jt=Math.sin(Ft)*Ot,L=Math.cos(Ft)*Ot,Pt=new pn(.8,.8,d,16);this.applyCylinderUVs(Pt,.8,d);const pt=new Tt(Pt,this.wallMaterial);pt.position.set(jt,d/2,L),pt.castShadow=!0,pt.receiveShadow=!0,Q.add(pt),this._bullseyeColumnMeshes.push(pt);const Lt={type:"pillar",x:jt,z:L,width:.8*2,depth:.8*2};this.obstacles.push(Lt),bt.push({baseAngle:Ft,r:Ot,obsRef:Lt})}},P=[];A(T,5,12,P);const E=[];A(M,9,19,E);const y=2*22*Math.tan(Math.PI/12),R=12/2,z=R*(2*Math.PI/12),F=Math.cos(z)*22;this.doorWall="north",this._doorIsNS=!0,this._doorOpeningCenter={x:0,z:F},this._doorSlabStartY=this.DOOR_HEIGHT/2,this._doorSlabEndY=d+this.DOOR_HEIGHT,this._frameMat=this.wallMaterial.clone(),this._frameMat.color.setHex(10066329),this._frameMat.emissive=new qt(0),this._frameMat.emissiveIntensity=0,this._slabMat=this.wallMaterial.clone(),this._slabMat.color.setHex(10066329),this._slabMat.clippingPlanes=[new ke(new D(0,-1,0),d)],this._slabMat.clipShadows=!0;const H=(Q,at,Ot,bt,Xt=0)=>{const Ft=new Tt(Q,this.wallMaterial);return Ft.position.set(at,Ot,bt),Xt!==0&&(Ft.rotation.y=Xt),Ft.castShadow=!0,Ft.receiveShadow=!0,this.scene.add(Ft),Ft},U=(Q,at,Ot,bt)=>{const Xt=new Tt(Q,this._frameMat);return Xt.position.set(at,Ot,bt),this.scene.add(Xt),this.doorFrameMeshes.push(Xt),Xt},N=.7,X=.5,k=X,Z=d-this.DOOR_HEIGHT-k,st=(y-this.DOOR_WIDTH)/2,ft=st/2+this.DOOR_WIDTH/2;for(const Q of[-1,1]){const at=new kt(st,d,g);this.applyWallUVs(at,st,d,g);const Ot=H(at,Q*ft,d/2,F);this.walls[`north_${Q>0?"right":"left"}`]=Ot}for(const Q of[-1,1]){const at=new kt(X,this.DOOR_HEIGHT,N);this.applyWallUVs(at,X,this.DOOR_HEIGHT,N),U(at,Q*(this.DOOR_WIDTH/2+X/2),this.DOOR_HEIGHT/2,F)}const Rt=new kt(this.DOOR_WIDTH+X*2,k,N);if(this.applyWallUVs(Rt,this.DOOR_WIDTH+X*2,k,N),U(Rt,0,this.DOOR_HEIGHT+k/2,F),Z>0){const Q=new kt(this.DOOR_WIDTH,Z,g);this.applyWallUVs(Q,this.DOOR_WIDTH,Z,g),this.walls.north_above=H(Q,0,this.DOOR_HEIGHT+k+Z/2,F)}const Gt=new Be(this.DOOR_WIDTH,this.DOOR_HEIGHT),Y=new Ze({color:0,side:ue}),et=new Tt(Gt,Y);et.position.set(0,this.DOOR_HEIGHT/2,F-.4),this.scene.add(et),this.doorFrameMeshes.push(et),this._voidMesh=et;const mt=new kt(this.DOOR_WIDTH,this.DOOR_HEIGHT,g);this.applyWallUVs(mt,this.DOOR_WIDTH,this.DOOR_HEIGHT,g),this.doorSlab=new Tt(mt,this._slabMat),this.doorSlab.position.set(0,this.DOOR_HEIGHT/2,F),this.scene.add(this.doorSlab),this._circularWalls.push({theta:z,sideLen:y,isDoor:!0});for(let Q=0;Q<12;Q++){if(Q===R)continue;const at=Q*(2*Math.PI/12),Ot=Math.sin(at)*22,bt=Math.cos(at)*22,Xt=new kt(y,d,g);this.applyWallUVs(Xt,y,d,g);const Ft=new Tt(Xt,this.wallMaterial);Ft.position.set(Ot,d/2,bt),Ft.rotation.y=at,Ft.castShadow=!0,Ft.receiveShadow=!0,this.scene.add(Ft),this.walls[`poly_${Q}`]=Ft,this._circularWalls.push({theta:at,sideLen:y,isDoor:!1})}this.bullseyeRings={inner:{group:p,rotDir:-1,speed:.03,cols:[]},middle:{group:T,rotDir:1,speed:.15,cols:P},outer:{group:M,rotDir:-1,speed:.1,cols:E}},this._initTransparency(),this._addLighting()}_loadDonut(){const a=this.wallHeight,o=this.DOOR_WIDTH,l=this.DOOR_HEIGHT;this.circleRadius=22,this.donutInnerRadius=9,this._circularWalls=[],this.fieldWidth=22*4,this.fieldDepth=22*4,this.obstacles=[];const c=this.textureLoader.load("images/tile-stone-1.png");c.wrapS=ae,c.wrapT=ae,this.wallMaterial=new Se({map:c,roughness:.6,metalness:.2});const h=this.textureLoader.load("images/tile-stone-1.png");h.wrapS=ae,h.wrapT=ae,h.repeat.set(22*2/6,22*2/6),this.floor=new Tt(new Vi(9,22,64),new Se({map:h,roughness:.6,metalness:.2,side:ue})),this.floor.rotation.x=-Math.PI/2,this.floor.receiveShadow=!0,this.scene.add(this.floor);const u=(H,U,N,X,k=0)=>{const Z=new Tt(H,this.wallMaterial);return Z.position.set(U,N,X),k!==0&&(Z.rotation.y=k),Z.castShadow=!0,Z.receiveShadow=!0,this.scene.add(Z),Z},f=2*22*Math.tan(Math.PI/12),d=12/2,g=d*(2*Math.PI/12),_=Math.cos(g)*22;this.doorWall="north",this._doorIsNS=!0,this._doorOpeningCenter={x:0,z:_},this._doorSlabStartY=l/2,this._doorSlabEndY=a+l,this._frameMat=this.wallMaterial.clone(),this._frameMat.color.setHex(10066329),this._frameMat.emissive=new qt(0),this._frameMat.emissiveIntensity=0,this._slabMat=this.wallMaterial.clone(),this._slabMat.color.setHex(10066329),this._slabMat.clippingPlanes=[new ke(new D(0,-1,0),a)],this._slabMat.clipShadows=!0;const m=(H,U,N,X)=>{const k=new Tt(H,this._frameMat);return k.position.set(U,N,X),this.scene.add(k),this.doorFrameMeshes.push(k),k},p=.7,T=.5,M=T,x=a-l-M,w=(f-o)/2,b=w/2+o/2;for(const H of[-1,1]){const U=new kt(w,a,.5);this.applyWallUVs(U,w,a,.5);const N=u(U,H*b,a/2,_);this.walls[`north_${H>0?"right":"left"}`]=N}for(const H of[-1,1]){const U=new kt(T,l,p);this.applyWallUVs(U,T,l,p),m(U,H*(o/2+T/2),l/2,_)}const A=o+T*2,P=new kt(A,M,p);if(this.applyWallUVs(P,A,M,p),m(P,0,l+M/2,_),x>0){const H=new kt(o,x,.5);this.applyWallUVs(H,o,x,.5),this.walls.north_above=u(H,0,l+M+x/2,_)}const E=new Be(o,l),y=new Ze({color:0,side:ue}),R=new Tt(E,y);R.position.set(0,l/2,_-.4),this.scene.add(R),this.doorFrameMeshes.push(R),this._voidMesh=R;const z=new kt(o,l,.5);this.applyWallUVs(z,o,l,.5),this.doorSlab=new Tt(z,this._slabMat),this.doorSlab.position.set(0,l/2,_),this.scene.add(this.doorSlab),this._circularWalls.push({theta:g,sideLen:f,isDoor:!0});for(let H=0;H<12;H++){if(H===d)continue;const U=H*(2*Math.PI/12),N=Math.sin(U)*22,X=Math.cos(U)*22,k=new kt(f,a,.5);this.applyWallUVs(k,f,a,.5);const Z=new Tt(k,this.wallMaterial);Z.position.set(N,a/2,X),Z.rotation.y=U,Z.castShadow=!0,Z.receiveShadow=!0,this.scene.add(Z),this.walls[`poly_${H}`]=Z,this._circularWalls.push({theta:U,sideLen:f,isDoor:!1})}const F=2*9*Math.tan(Math.PI/10);for(let H=0;H<10;H++){const U=H*(2*Math.PI/10),N=Math.sin(U)*9,X=Math.cos(U)*9,k=new kt(F,a,.5);this.applyWallUVs(k,F,a,.5);const Z=new Tt(k,this.wallMaterial);Z.position.set(N,a/2,X),Z.rotation.y=U,Z.castShadow=!0,Z.receiveShadow=!0,this.scene.add(Z),this.walls[`inner_poly_${H}`]=Z}this._initTransparency(),this._addLighting()}getTerrainHeightAt(t,e){if(!this.hexRings)return 0;const{MED_Y:n,LOW_Y:i,RC_in:r,RE_in:a}=this.hexRings,o=Math.sqrt(t*t+e*e);if(o<=a)return i;if(o<=r){const l=(o-a)/(r-a);return i+l*(n-i)}return n}getTerrainSlopeForce(t,e){if(!this.hexRings)return{fx:0,fz:0};const{RC_in:n,RE_in:i}=this.hexRings,r=Math.sqrt(t*t+e*e);if(r<.01)return{fx:0,fz:0};if(r>i&&r<=n){const a=-(t/r)*.007,o=-(e/r)*.007;return{fx:a,fz:o}}return{fx:0,fz:0}}_addLighting(){const t=new wu(16777215,0);this.scene.add(t);const e=new bu(16777215,.2);e.position.set(10,20,10),e.castShadow=!0,e.shadow.mapSize.width=512,e.shadow.mapSize.height=512,e.shadow.camera.left=-40,e.shadow.camera.right=40,e.shadow.camera.top=40,e.shadow.camera.bottom=-40,e.shadow.camera.near=.1,e.shadow.camera.far=100,this.scene.add(e)}_createDoor(){this.doorWall="north";const t=this.DOOR_WIDTH,e=this.DOOR_HEIGHT,n=this.wallHeight,i=.5,r=.7,a=.5,o=a,l=n-e-o,c=this.doorWall==="north"||this.doorWall==="south";this._doorIsNS=c;const h={x:this.doorWall==="east"?this.fieldWidth/2:this.doorWall==="west"?-this.fieldWidth/2:0,z:this.doorWall==="north"?-this.fieldDepth/2:this.doorWall==="south"?this.fieldDepth/2:0},u=this.walls[this.doorWall];u&&(this.scene.remove(u),u.geometry.dispose(),delete this.walls[this.doorWall]),this._frameMat=this.wallMaterial.clone(),this._frameMat.color.setHex(10066329),this._frameMat.emissive=new qt(0),this._frameMat.emissiveIntensity=0,this._slabMat=this.wallMaterial.clone(),this._slabMat.color.setHex(10066329),this._slabMat.clippingPlanes=[new ke(new D(0,-1,0),n)],this._slabMat.clipShadows=!0;const f=(p,T,M,x)=>{const w=new Tt(p,this.wallMaterial);return w.position.set(T,M,x),w.castShadow=!0,w.receiveShadow=!0,this.scene.add(w),w},d=(p,T,M,x)=>{const w=new Tt(p,this._frameMat);return w.position.set(T,M,x),this.scene.add(w),this.doorFrameMeshes.push(w),w},_=((c?this.fieldWidth:this.fieldDepth)-t)/2,m=_/2+t/2;if(c){for(const P of[-1,1]){const E=new kt(_,n,i);this.applyWallUVs(E,_,n,i);const y=f(E,P*m,n/2,h.z);this.walls[`${this.doorWall}_${P>0?"right":"left"}`]=y}for(const P of[-1,1]){const E=new kt(a,e,r);this.applyWallUVs(E,a,e,r),d(E,P*(t/2+a/2),e/2,h.z)}const p=t+a*2,T=new kt(p,o,r);if(this.applyWallUVs(T,p,o,r),d(T,0,e+o/2,h.z),l>0){const P=new kt(t,l,i);this.applyWallUVs(P,t,l,i);const E=f(P,0,e+o+l/2,h.z);this.walls[`${this.doorWall}_above`]=E}const M=new Be(t,e),x=new Ze({color:0,side:ue}),w=new Tt(M,x),b=this.doorWall==="north"?-1:1;w.position.set(0,e/2,h.z+b*.4),this.scene.add(w),this.doorFrameMeshes.push(w),this._voidMesh=w;const A=new kt(t,e,i);this.applyWallUVs(A,t,e,i),this.doorSlab=new Tt(A,this._slabMat),this.doorSlab.position.set(0,e/2,h.z),this.scene.add(this.doorSlab)}else{for(const P of[-1,1]){const E=new kt(i,n,_);this.applyWallUVs(E,i,n,_);const y=f(E,h.x,n/2,P*m);this.walls[`${this.doorWall}_${P>0?"pos":"neg"}`]=y}for(const P of[-1,1]){const E=new kt(r,e,a);this.applyWallUVs(E,r,e,a),d(E,h.x,e/2,P*(t/2+a/2))}const p=t+a*2,T=new kt(r,o,p);if(this.applyWallUVs(T,r,o,p),d(T,h.x,e+o/2,0),l>0){const P=new kt(i,l,t);this.applyWallUVs(P,i,l,t);const E=f(P,h.x,e+o+l/2,0);this.walls[`${this.doorWall}_above`]=E}const M=new Be(t,e),x=new Ze({color:0,side:ue}),w=new Tt(M,x);w.rotation.y=Math.PI/2;const b=this.doorWall==="east"?1:-1;w.position.set(h.x+b*.4,e/2,0),this.scene.add(w),this.doorFrameMeshes.push(w),this._voidMesh=w;const A=new kt(i,e,t);this.applyWallUVs(A,i,e,t),this.doorSlab=new Tt(A,this._slabMat),this.doorSlab.position.set(h.x,e/2,0),this.scene.add(this.doorSlab)}this._doorOpeningCenter={x:h.x,z:h.z},this._doorSlabStartY=e/2,this._doorSlabEndY=n+e}_scatterVineTilesOnWalls(){if(this.hexRings)return;const t=6,e=.25,n=.27;this._vineTileMeshes=[],this._vineTileTexture=this.textureLoader.load("images/tile-stone-vines-1.png"),this._vineMat=new Se({map:this._vineTileTexture,roughness:.6,metalness:.2});const i=(h,u,f,d)=>{const g=new Be(t,t),_=new Tt(g,this._vineMat);_.position.set(h,u,f),_.rotation.y=d,_.receiveShadow=!0,this.scene.add(_),this._vineTileMeshes.push(_)},r=(h,u,f)=>!h||this.doorWall!==h?!1:Math.abs(u)<this.DOOR_WIDTH/2+t/2&&f<this.DOOR_HEIGHT+t/2,a=(h,u,f,d)=>{const g=Math.floor(h/t),_=Math.floor(u/t);for(let m=0;m<g;m++)for(let p=0;p<_;p++){const T=(m+.5)*t-h/2,M=(p+.5)*t;r(f,T,M)||Math.random()>e||d(T,M)}},o=this.fieldWidth,l=this.fieldDepth,c=this.wallHeight;if(this._circularWalls){const h=this.circleRadius;for(const{theta:u,sideLen:f,isDoor:d}of this._circularWalls)d||a(f,c,null,(g,_)=>{const m=Math.sin(u)*(h-n)+Math.cos(u)*g,p=Math.cos(u)*(h-n)-Math.sin(u)*g;i(m,_,p,u+Math.PI)})}else a(o,c,"north",(h,u)=>i(h,u,-l/2+n,0)),a(o,c,"south",(h,u)=>i(h,u,l/2-n,Math.PI)),a(l,c,"east",(h,u)=>i(o/2-n,u,h,-Math.PI/2)),a(l,c,"west",(h,u)=>i(-o/2+n,u,h,Math.PI/2));for(const h of this.obstacles){if(h.type==="pillar")continue;const{x:u,z:f,width:d,depth:g}=h;a(d,c,null,(_,m)=>i(u+_,m,f+g/2+n,0)),a(d,c,null,(_,m)=>i(u+_,m,f-g/2-n,Math.PI)),a(g,c,null,(_,m)=>i(u+d/2+n,m,f+_,Math.PI/2)),a(g,c,null,(_,m)=>i(u-d/2-n,m,f+_,-Math.PI/2))}}openDoor(){if(this.doorIsOpen||this._doorAnimating||!this.doorSlab)return;this._doorAnimating=!0,this._doorAnimProgress=0,this._frameMat&&(this._frameMat.emissive.setHex(16737792),this._frameMat.emissiveIntensity=.6);const t=this._doorOpeningCenter?this._doorOpeningCenter.x:0,e=this._doorOpeningCenter?this._doorOpeningCenter.z:0,n=2;let i=t,r=e;this._doorIsNS?r+=this.doorWall==="north"?n:-2:i+=this.doorWall==="east"?-2:n,this._doorLight=new Eu(16737792,60,12,2),this._doorLight.position.set(i,this.DOOR_HEIGHT*.5,r),this.scene.add(this._doorLight),this._doorLightTime=0}update(t){if(this.bullseyeRings){const{inner:e,middle:n,outer:i}=this.bullseyeRings;e.group.rotation.y+=e.rotDir*e.speed*t,n.group.rotation.y+=n.rotDir*n.speed*t,i.group.rotation.y+=i.rotDir*i.speed*t;for(const r of n.cols){const a=r.baseAngle+n.group.rotation.y;r.obsRef.x=Math.sin(a)*r.r,r.obsRef.z=Math.cos(a)*r.r}for(const r of i.cols){const a=r.baseAngle+i.group.rotation.y;r.obsRef.x=Math.sin(a)*r.r,r.obsRef.z=Math.cos(a)*r.r}}if(this._doorAnimating&&this.doorSlab){this._doorAnimProgress+=t/.8,this._doorAnimProgress>=1&&(this._doorAnimProgress=1,this._doorAnimating=!1,this.doorIsOpen=!0);const n=this._doorAnimProgress,i=n<.5?2*n*n:-1+(4-2*n)*n;this.doorSlab.position.y=this._doorSlabStartY+(this._doorSlabEndY-this._doorSlabStartY)*i}if(this._doorLight){this._doorLightTime+=t;const e=.65+.25*Math.sin(this._doorLightTime*2.3)+.1*Math.sin(this._doorLightTime*5.7);this._doorLight.intensity=60*e,this._frameMat&&(this._frameMat.emissiveIntensity=.55*e),this._voidMesh&&this._voidMesh.material.color.setRGB(e*1,e*.35,0)}}generateRandomObstacles(){this.obstacles=[];const t=4+Math.floor(Math.random()*4);for(let e=0;e<t;e++){let n=!1,i=0,r=null;for(;!n&&i<50;){const a=Math.random();let o,l,c,h,u;if(a<.35)o="block",l=4+Math.random()*3,c=l;else if(a<.55)o="triangle",l=3+Math.random()*3,c=l;else if(a<.75)o="pillar",l=2,c=2;else{o="wall";const M=Math.random()>.5;l=M?7+Math.random()*7:1.5,c=M?1.5:7+Math.random()*7}const f=this.circleRadius?this.circleRadius*2:this.fieldWidth,d=this.circleRadius?this.circleRadius*2:this.fieldDepth;h=(Math.random()-.5)*(f-l-4),u=(Math.random()-.5)*(d-c-4);const g=o==="triangle"?Math.random()*Math.PI*2:0;r={x:h,z:u,width:l,depth:c,type:o,rotY:g};const _=8,m=Math.sqrt(h*h+u*u),p=Math.sqrt(h*h+(u+3)*(u+3));if(m<_||p<_){i++;continue}let T=!1;for(const M of this.obstacles){const x=Math.abs(h-M.x),w=Math.abs(u-M.z);let b=3.5;o==="pillar"&&M.type==="pillar"&&(b=2.5);const A=(l+M.width)/2+b,P=(c+M.depth)/2+b;if(x<A&&w<P){T=!0;break}}T||(n=!0),i++}n&&r&&(this.obstacles.push(r),this.createObstacleMesh(r,e))}}createObstacleMesh(t,e){let n;t.type==="pillar"?(n=new pn(t.width/2,t.width/2,this.wallHeight,16),this.applyCylinderUVs(n,t.width/2,this.wallHeight)):t.type==="triangle"?(n=new pn(t.width/2,t.width/2,this.wallHeight,3),this.applyCylinderUVs(n,t.width/2,this.wallHeight)):(n=new kt(t.width,this.wallHeight,t.depth),this.applyWallUVs(n,t.width,this.wallHeight,t.depth));const i=new Tt(n,this.wallMaterial);i.position.set(t.x,this.wallHeight/2,t.z),t.type==="triangle"&&(i.rotation.y=t.rotY??0),i.castShadow=!0,i.receiveShadow=!0,this.scene.add(i),this.walls[`obstacle_${e}`]=i}isPositionValid(t,e,n=0){const i=n+.2;if(this.circleRadius){if(Math.sqrt(t*t+e*e)+i>this.circleRadius||this.donutInnerRadius&&Math.sqrt(t*t+e*e)<this.donutInnerRadius+i)return!1}else if(t-i<-this.fieldWidth/2||t+i>this.fieldWidth/2||e-i<-this.fieldDepth/2||e+i>this.fieldDepth/2)return!1;for(const r of this.obstacles)if(r.type==="pillar"||r.type==="triangle"){const a=t-r.x,o=e-r.z,l=a*a+o*o,c=r.width/2+i;if(l<c*c)return!1}else{const a=Math.abs(t-r.x),o=Math.abs(e-r.z);if(a<r.width/2+i&&o<r.depth/2+i)return!1}return!0}checkPortalCollision(t,e,n){if(!this.doorIsOpen||!this._doorOpeningCenter)return!1;const i=this._doorOpeningCenter.x,r=this._doorOpeningCenter.z,a=n+1;return this._doorIsNS?Math.abs(t-i)<this.DOOR_WIDTH/2&&Math.abs(e-r)<a:Math.abs(e-r)<this.DOOR_WIDTH/2&&Math.abs(t-i)<a}unload(){this.obstacles=[],this.floor&&(this.scene.remove(this.floor),this.floor.geometry&&this.floor.geometry.dispose(),this.floor.material&&(this.floor.material.map&&this.floor.material.map.dispose(),this.floor.material.dispose()),this.floor=null);for(const t in this.walls){const e=this.walls[t];e&&(this.scene.remove(e),e.geometry&&e.geometry.dispose(),e.material&&e.material.dispose())}this.walls={},this.doorSlab&&(this.scene.remove(this.doorSlab),this.doorSlab.geometry&&this.doorSlab.geometry.dispose(),this.doorSlab.material&&this.doorSlab.material.dispose(),this.doorSlab=null);for(const t of this.doorFrameMeshes)this.scene.remove(t),t.geometry&&t.geometry.dispose(),t.material&&t.material.dispose();this.doorFrameMeshes=[],this._frameMat&&(this._frameMat.dispose(),this._frameMat=null),this._slabMat&&(this._slabMat.dispose(),this._slabMat=null),this._voidMesh=null,this._doorLight&&(this.scene.remove(this._doorLight),this._doorLight=null),this._doorLightTime=0,this.doorWall=null,this.doorIsOpen=!1,this._doorAnimating=!1,this._doorAnimProgress=0,this._doorOpeningCenter=null;for(const t of this.portals)this.scene.remove(t),t.geometry&&t.geometry.dispose(),t.material&&t.material.dispose();this.portals=[];for(const t of this.portalLights)this.scene.remove(t);this.portalLights=[],this.wallMaterial&&(this.wallMaterial.map&&this.wallMaterial.map.dispose(),this.wallMaterial.dispose(),this.wallMaterial=null);for(const t of this._vineTileMeshes||[])this.scene.remove(t),t.geometry&&t.geometry.dispose();this._vineTileMeshes=[],this._vineMat&&(this._vineMat.dispose(),this._vineMat=null),this._vineTileTexture&&(this._vineTileTexture.dispose(),this._vineTileTexture=null),this.circleRadius=null,this._circularWalls=null,this.donutInnerRadius=null;for(const t of this._hexFloorMeshes||[])this.scene.remove(t),t.geometry&&t.geometry.dispose();this._hexFloorMeshes=[],this._hexFloorMat&&(this._hexFloorMat.map&&this._hexFloorMat.map.dispose(),this._hexFloorMat.dispose(),this._hexFloorMat=null),this._hexPitMat&&(this._hexPitMat.map&&this._hexPitMat.map.dispose(),this._hexPitMat.dispose(),this._hexPitMat=null);for(const t of this._hexOuterWalls||[])this.scene.remove(t),t.geometry&&t.geometry.dispose(),t.material&&t.material.dispose();if(this._hexOuterWalls=[],this.hexRings=null,this.bullseyeRings){const t=e=>{e.traverse(n=>{n.isMesh&&(n.geometry&&n.geometry.dispose(),n.material&&(n.material.map&&n.material.map.dispose(),n.material.dispose()))}),this.scene.remove(e)};t(this.bullseyeRings.inner.group),t(this.bullseyeRings.middle.group),t(this.bullseyeRings.outer.group),this.bullseyeRings=null}this._bullseyeColumnMeshes=[]}}class pg{constructor(t,e,n){this.throwInfoDiv=document.getElementById("throw-info"),this.discNamesList=document.getElementById("disc-names-list"),this.focusCameraOnDiscCallback=n,this.rageButtonElement=document.getElementById("rage-button"),this.fpsDisplayElement=document.getElementById("fps-counter"),this.fpsDisplayElement&&(this.fpsDisplayElement.style.display="none"),this.powersAreaElement=document.getElementById("powers-area"),this.powersAreaElement?(this.currentTurnDiscNameElement=document.createElement("h3"),this.currentTurnDiscNameElement.id="current-turn-disc-name-display",this.powersAreaElement.prepend(this.currentTurnDiscNameElement),this.actionButtonsContainerElement=document.createElement("div"),this.actionButtonsContainerElement.id="action-buttons-container",this.powersAreaElement.appendChild(this.actionButtonsContainerElement),this.rageButtonElement&&this.actionButtonsContainerElement&&this.actionButtonsContainerElement.appendChild(this.rageButtonElement)):(this.currentTurnDiscNameElement=null,this.actionButtonsContainerElement=null),this.gameOverMessageContainer=null,this.gameOverMessageTextElement=null,this.playAgainButton=null,this.recenterButton=null,this._createGameOverUI(t),this._createRecenterButton(e),this.floatingTextContainer=document.createElement("div"),this.floatingTextContainer.id="floating-text-container",Object.assign(this.floatingTextContainer.style,{position:"absolute",top:"0",left:"0",width:"100%",height:"100%",pointerEvents:"none",zIndex:"1005",overflow:"hidden"}),document.body.appendChild(this.floatingTextContainer),this.activeFloatingTexts=[]}showFloatingText(t,e,n){const i=document.createElement("div"),r=Math.abs(e);i.textContent=`${n?"+":"-"}${r} HP`,Object.assign(i.style,{position:"absolute",color:n?"#4488ff":"#ff4444",fontWeight:"bold",fontFamily:"Arial, sans-serif",textShadow:"1px 1px 2px black, -1px -1px 2px black, 1px -1px 2px black, -1px 1px 2px black",transform:"translate(-50%, -50%)",opacity:"0",fontSize:"16px",whiteSpace:"nowrap",pointerEvents:"none"}),this.floatingTextContainer.appendChild(i),this.activeFloatingTexts.push({element:i,disc:t,startTime:performance.now(),duration:2e3,startOffsetY:2,offsetX:(Math.random()-.5)*1.5,offsetZ:(Math.random()-.5)*1.5})}updateFloatingTexts(t){if(!t)return;const e=performance.now();for(let n=this.activeFloatingTexts.length-1;n>=0;n--){const i=this.activeFloatingTexts[n],a=(e-i.startTime)/i.duration;if(a>=1){i.element.remove(),this.activeFloatingTexts.splice(n,1);continue}let o;a<.2?o=.3+.7*(a/.2):o=1-(a-.2)/.8;const l=i.startOffsetY+a*4,c=16+a*12;if(i.disc&&i.disc.mesh){const h=i.disc.mesh.position.clone();h.x+=i.offsetX,h.y+=l,h.z+=i.offsetZ,h.project(t);const u=(h.x*.5+.5)*window.innerWidth,f=(h.y*-.5+.5)*window.innerHeight;h.z<1?(i.element.style.left=`${u}px`,i.element.style.top=`${f}px`,i.element.style.fontSize=`${c}px`,i.element.style.opacity=o.toString(),i.element.style.display="block"):i.element.style.display="none"}else i.element.style.fontSize=`${c}px`,i.element.style.opacity=o.toString()}}_createGameOverUI(t){this.gameOverMessageContainer=document.createElement("div"),this.gameOverMessageContainer.id="gameOverMessageContainer",Object.assign(this.gameOverMessageContainer.style,{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",padding:"20px",backgroundColor:"rgba(0, 0, 0, 0.75)",color:"white",textAlign:"center",borderRadius:"10px",zIndex:"1000",display:"none",fontFamily:"Arial, sans-serif"});const e=document.createElement("h1");e.textContent="GAME OVER",Object.assign(e.style,{margin:"0 0 10px 0",fontSize:"2.5em"}),this.gameOverMessageTextElement=document.createElement("p"),this.gameOverMessageTextElement.id="gameOverResultText",Object.assign(this.gameOverMessageTextElement.style,{margin:"0",fontSize:"1.5em"}),this.gameOverMessageContainer.appendChild(e),this.gameOverMessageContainer.appendChild(this.gameOverMessageTextElement),this.playAgainButton=document.createElement("button"),this.playAgainButton.textContent="Play Again",Object.assign(this.playAgainButton.style,{marginTop:"20px",padding:"10px 20px",fontSize:"1em",color:"white",backgroundColor:"#555",border:"none",borderRadius:"5px",cursor:"pointer"}),this.playAgainButton.addEventListener("mouseover",()=>{this.playAgainButton.style.backgroundColor="#777"}),this.playAgainButton.addEventListener("mouseout",()=>{this.playAgainButton.style.backgroundColor="#555"}),this.playAgainButton.addEventListener("click",()=>{this.hideGameOver(),t&&t()}),this.gameOverMessageContainer.appendChild(this.playAgainButton),document.body.appendChild(this.gameOverMessageContainer)}_createRecenterButton(t){let e=document.getElementById("recenter-button");e||(e=document.createElement("button"),e.id="recenter-button",e.textContent="[R] Recenter",Object.assign(e.style,{position:"fixed",bottom:"20px",right:"20px",zIndex:"1001",pointerEvents:"auto",padding:"10px 20px",fontSize:"16px",backgroundColor:"rgba(32, 64, 122, 0.9)",border:"none",borderRadius:"5px",color:"white",cursor:"pointer"}),document.body.appendChild(e)),t&&e.addEventListener("click",t),this.recenterButton=e}showGameOver(t){this.gameOverMessageContainer&&this.gameOverMessageTextElement&&(this.gameOverMessageTextElement.textContent=t?"You win!":"You lose!",this.gameOverMessageContainer.style.display="block")}hideGameOver(){this.gameOverMessageContainer&&(this.gameOverMessageContainer.style.display="none")}updateThrowInfo(t,e){this.throwInfoDiv&&(this.throwInfoDiv.textContent=t,this.throwInfoDiv.style.visibility=e?"visible":"hidden")}updateFPS(t){this.fpsDisplayElement&&(this.fpsDisplayElement.textContent=`FPS: ${t}`,this.fpsDisplayElement.style.display="inline-block")}updateDiscNames(t,e){if(!this.discNamesList)return;this.discNamesList.innerHTML="";const n=e?e.discName:null,i=t.filter(l=>l.type==="player"&&l.kind!=="Orb"&&l.kind!=="HealingOrb"&&l.kind!=="AnimatedDead"),r=t.filter(l=>l.type==="NPC"),a=l=>{const c=document.createElement("li");c.addEventListener("click",()=>{this.focusCameraOnDiscCallback&&this.focusCameraOnDiscCallback(l.discName)});const h=typeof l.hitPoints=="number"?l.hitPoints:"N/A";let u=`${l.discName} (${h} HP)`;const f=document.createElement("span");f.classList.add("disc-color-indicator");let d="#808080";if(typeof l.initialColor=="number"&&isFinite(l.initialColor))try{d="#"+(l.initialColor>=0?l.initialColor:0).toString(16).padStart(6,"0")}catch{}f.style.backgroundColor=d,l.dead&&(f.style.backgroundColor="#808080"),c.appendChild(f);const g=document.createTextNode(u);return c.appendChild(g),c.classList.add("turn-tracker-item"),l.dead&&c.classList.add("dead-disc"),l.discName===n&&c.classList.add("current-turn"),c},o=l=>{const c=document.createElement("li");return c.textContent=l,c.classList.add("tracker-section-header"),c};i.length>0&&(this.discNamesList.appendChild(o("Players")),i.forEach(l=>{this.discNamesList.appendChild(a(l))})),r.length>0&&(this.discNamesList.appendChild(o("Monsters")),r.forEach(l=>{this.discNamesList.appendChild(a(l))}))}getActionButtonsContainer(){return this.actionButtonsContainerElement}updateCurrentTurnDiscName(t){if(this.currentTurnDiscNameElement)if(t&&t.discName)if(typeof t.hitPoints=="number"&&typeof t.maxHitPoints=="number"){const e=Math.max(0,t.hitPoints),n=Math.max(0,t.maxHitPoints),i=Math.max(0,n-e),r="❤️".repeat(e),a="🩶".repeat(i);this.currentTurnDiscNameElement.innerHTML="";const o=document.createTextNode(t.discName+" ");this.currentTurnDiscNameElement.appendChild(o);const l=document.createElement("div");if(l.classList.add("hearts-container"),l.style.display="inline-block",l.textContent=r+a,this.currentTurnDiscNameElement.appendChild(l),t.kind==="Wizard"&&t.gameController){const c=document.createElement("div");c.classList.add("mana-container"),c.style.display="block",c.style.fontSize="0.8em",c.style.marginTop="4px",c.textContent=`Mana: ${"🔵".repeat(t.gameController.wizardController.mana)}`,this.currentTurnDiscNameElement.appendChild(c)}if(t.kind==="Necromancer"&&t.gameController){const c=document.createElement("div");c.classList.add("mana-container"),c.style.display="block",c.style.fontSize="0.8em",c.style.marginTop="4px",c.textContent=`Mana: ${"💀".repeat(t.gameController.necromancerController.mana)}`,this.currentTurnDiscNameElement.appendChild(c)}this.currentTurnDiscNameElement.classList.remove("element-hidden")}else{const e=typeof t.hitPoints=="number"?t.hitPoints:"N/A";this.currentTurnDiscNameElement.textContent=`${t.discName} (HP: ${e})`,this.currentTurnDiscNameElement.classList.remove("element-hidden"),typeof t.maxHitPoints!="number"&&console.warn(`UIManager: Disc "${t.discName}" is missing or has invalid maxHitPoints property for heart display. Displaying fallback.`),typeof t.hitPoints!="number"&&console.warn(`UIManager: Disc "${t.discName}" has invalid hitPoints property for heart display. Displaying fallback.`)}else this.currentTurnDiscNameElement.textContent="",this.currentTurnDiscNameElement.classList.add("element-hidden")}updateRageButtonVisibility(t,e,n,i){if(this.rageButtonElement){this.rageButtonElement.style.display=t?"inline-block":"none",this.rageButtonElement.disabled=!e;const r=typeof n=="number"?n:0,a=typeof i=="number"?i:0;this.rageButtonElement.textContent=`[1] Rage (${r}/${a})`}}setupRageButtonListener(t){this.rageButtonElement&&(this.rageButtonElement.removeEventListener("click",this._currentRageButtonHandler),this._currentRageButtonHandler=t,this.rageButtonElement.addEventListener("click",t))}}class mg{constructor(t,e,n){this.domElement=t,this.gameController=e,this.uiManager=n,this.isPointerDown=!1,this.pointerDownInitialPos={x:0,y:0},this._handlePointerDown=this._handlePointerDown.bind(this),this._handlePointerMove=this._handlePointerMove.bind(this),this._handlePointerUp=this._handlePointerUp.bind(this),this._handlePointerHover=this._handlePointerHover.bind(this),this._handleKeyDown=this._handleKeyDown.bind(this),this._handleKeyUp=this._handleKeyUp.bind(this),this._addEventListeners()}_addEventListeners(){this.domElement.addEventListener("pointerdown",this._handlePointerDown),window.addEventListener("pointermove",this._handlePointerMove),window.addEventListener("pointermove",this._handlePointerHover),window.addEventListener("pointerup",this._handlePointerUp),window.addEventListener("keydown",this._handleKeyDown,{capture:!0}),document.addEventListener("keydown",this._handleKeyDown,{capture:!0}),window.addEventListener("keyup",this._handleKeyUp)}_handlePointerDown(t){this.isPointerDown=!0,this.pointerDownInitialPos.x=t.clientX,this.pointerDownInitialPos.y=t.clientY,this.gameController.handlePointerDownInteraction&&this.gameController.handlePointerDownInteraction(t,this.pointerDownInitialPos)}_handlePointerHover(t){this.gameController.handlePointerHover&&this.gameController.handlePointerHover(t)}_handlePointerMove(t){this.isPointerDown&&this.gameController.handlePointerMoveInteraction&&this.gameController.handlePointerMoveInteraction(t,this.pointerDownInitialPos)}_handlePointerUp(t){this.isPointerDown&&(this.isPointerDown=!1,this.gameController.handlePointerUpInteraction&&this.gameController.handlePointerUpInteraction(t,this.pointerDownInitialPos))}_handleKeyDown(t){if(t._handledByInputHandler)return;t._handledByInputHandler=!0;const e=(t.key||"").toLowerCase();switch((e==="escape"||e==="esc"||t.code==="Escape"||t.keyCode===27)&&this.isPointerDown&&(t.preventDefault(),t.stopPropagation(),this.isPointerDown=!1,this.gameController&&typeof this.gameController.cancelAiming=="function"&&this.gameController.cancelAiming(),this.uiManager&&typeof this.uiManager.updateThrowInfo=="function"&&this.uiManager.updateThrowInfo("",!1)),e){case"w":case"arrowup":this.gameController.setPanningState&&this.gameController.setPanningState("up",!0);break;case"s":case"arrowdown":this.gameController.setPanningState&&this.gameController.setPanningState("down",!0);break;case"a":case"arrowleft":this.gameController.setPanningState&&this.gameController.setPanningState("left",!0);break;case"d":case"arrowright":this.gameController.setPanningState&&this.gameController.setPanningState("right",!0);break;case"q":this.gameController.setCameraRotation&&this.gameController.setCameraRotation(-1);break;case"e":this.gameController.setCameraRotation&&this.gameController.setCameraRotation(1);break;case"r":this.gameController.recenterCamera&&this.gameController.recenterCamera();break;case",":case"<":this.gameController.focusPrevAnimatedDead&&this.gameController.focusPrevAnimatedDead();break;case".":case">":this.gameController.focusNextAnimatedDead&&this.gameController.focusNextAnimatedDead();break;case" ":{t.preventDefault();const n=document.getElementById("action-buttons-container");if(n){const i=[...n.querySelectorAll("button")].find(r=>r.id.includes("end-turn")&&r.style.display!=="none"&&!r.disabled);i&&i.click()}break}case"1":case"2":case"3":case"4":case"5":{const n=parseInt(e)-1,i=document.getElementById("action-buttons-container");if(i){const r=[...i.querySelectorAll("button")].filter(a=>!a.id.includes("end-turn")&&a.style.display!=="none"&&!a.disabled);r[n]&&r[n].click()}break}}}_handleKeyUp(t){const e=(t.key||"").toLowerCase();switch((e==="escape"||e==="esc"||t.code==="Escape"||t.keyCode===27)&&this.isPointerDown&&(this.isPointerDown=!1,this.gameController&&typeof this.gameController.cancelAiming=="function"&&this.gameController.cancelAiming(),this.uiManager&&typeof this.uiManager.updateThrowInfo=="function"&&this.uiManager.updateThrowInfo("",!1)),e){case"w":case"arrowup":this.gameController.setPanningState&&this.gameController.setPanningState("up",!1);break;case"s":case"arrowdown":this.gameController.setPanningState&&this.gameController.setPanningState("down",!1);break;case"a":case"arrowleft":this.gameController.setPanningState&&this.gameController.setPanningState("left",!1);break;case"d":case"arrowright":this.gameController.setPanningState&&this.gameController.setPanningState("right",!1);break;case"q":case"e":this.gameController.setCameraRotation&&this.gameController.setCameraRotation(0);break}}reset(){this.isPointerDown=!1,this.pointerDownInitialPos={x:0,y:0}}dispose(){this.domElement.removeEventListener("pointerdown",this._handlePointerDown),window.removeEventListener("pointermove",this._handlePointerMove),window.removeEventListener("pointermove",this._handlePointerHover),window.removeEventListener("pointerup",this._handlePointerUp),window.removeEventListener("keydown",this._handleKeyDown,{capture:!0}),document.removeEventListener("keydown",this._handleKeyDown,{capture:!0}),window.removeEventListener("keyup",this._handleKeyUp)}}class gg{constructor(t){this.gc=t,this.rageCharges=0,this.maxRageChargesCap=3,this.uniqueNPCHitsThisThrow=new Set,this.endTurnButton=null,this._boundHandleRageButtonClick=null,this._actionButtonsContainer=null}init(t){this._actionButtonsContainer=t,this._createEndTurnButton(),this._setupEndTurnButtonListener(),this._setupRageButtonListener(),this.updateEndTurnButtonVisibility(),this.updateRageButtonVisibility()}getDisc(){return this.gc.discs.find(t=>t.type==="player"&&t.kind==="Barbarian"&&!t.dead)}_createEndTurnButton(){if(!this._actionButtonsContainer)return;let t=document.getElementById("barbarian-end-turn-button");t||(t=document.createElement("button"),t.id="barbarian-end-turn-button",t.textContent="[Space] End Turn",this._actionButtonsContainer.appendChild(t)),t.style.display="none",this.endTurnButton=t}_setupEndTurnButtonListener(){this.endTurnButton&&this.endTurnButton.addEventListener("click",this._handleEndTurnButtonClick.bind(this))}async _handleEndTurnButtonClick(){if(this.gc.gameOverState.active)return;const t=this.gc.currentTurnIndex!==-1?this.gc.discs[this.gc.currentTurnIndex]:null;t&&t.type==="player"&&t.kind==="Barbarian"&&!t.dead&&await this.gc._proceedToNextPlayerTurn()}updateEndTurnButtonVisibility(){if(!this.endTurnButton)return;const t=this.gc.currentTurnIndex!==-1?this.gc.discs[this.gc.currentTurnIndex]:null,e=!!(t&&t.type==="player"&&t.kind==="Barbarian"&&!t.dead&&!this.gc.gameOverState.active);this.endTurnButton.style.display=e?"inline-block":"none",this.endTurnButton.disabled=!e}_handleRageButtonClick(){const t=this.getDisc();t&&!t.dead&&this.rageCharges>0&&(t.rageIsActiveForNextThrow=!0,this.rageCharges--,t.setSpotlightIntensity(!0)),this.updateRageButtonVisibility()}_setupRageButtonListener(){this._boundHandleRageButtonClick||(this._boundHandleRageButtonClick=this._handleRageButtonClick.bind(this)),this.gc.uiManager&&this.gc.uiManager.setupRageButtonListener(this._boundHandleRageButtonClick)}updateRageButtonVisibility(){if(!this.gc.uiManager)return;const t=this.gc.currentTurnIndex!==-1?this.gc.discs[this.gc.currentTurnIndex]:null,e=!!(t&&t.type==="player"&&t.kind==="Barbarian"&&!t.dead&&!t.rageIsActiveForNextThrow&&this.rageCharges>0);this.gc.uiManager.updateRageButtonVisibility(e,e,this.rageCharges,this.maxRageChargesCap)}onNewThrow(){this.uniqueNPCHitsThisThrow.clear()}onTurnEnd(){}onLevelStart(){this.uniqueNPCHitsThisThrow.clear()}onGameRestart(){this.rageCharges=0,this.uniqueNPCHitsThisThrow.clear()}}const Hn=class Hn{constructor(t,e,n,i,r,a,o="Unknown",l="NPC",c="Unknown",h=3,u=100,f=null,d=!1,g=1,_=1,m=!1,p=!1,T=1,M=null,x="A mysterious combatant."){this.radius=t,this.height=e,this.initialColor=n,this.discName=o,this.type=l,this.kind=c,this.hitPoints=h,this.lastHitPoints=h,this.maxHitPoints=h,this.dead=!1,this.skillLevel=u,this.scene=a,this.canDoReboundDamage=d,this.throwPowerMultiplier=g,this.mass=_,this.rageIsActiveForNextThrow=m,this.rageWasUsedThisThrow=p,this.attackDamage=T,this.gameController=M,this.description=x,this.relativeOffset=new D,this.healedDiscs=new Set;const w=new pn(t,t,e,64);if(f){const A=new Fa;this.mesh=new bn;const P=new Tt(w,new Es({color:n,opacity:.9,transparent:!0}));P.castShadow=!0,P.receiveShadow=!0,this.mesh.add(P);const E=A.load(f,F=>{F.colorSpace=ze},void 0,F=>{}),y=new Be(t*1.8,t*1.8),R=new Es({map:E,transparent:!0,alphaTest:.1,opacity:1}),z=new Tt(y,R);z.rotation.x=-Math.PI/2,z.position.y=e/2+.01,z.castShadow=!0,this.mesh.add(z)}else this.mesh=new Tt(w,new Es({color:n,opacity:.9,transparent:!0})),this.mesh.castShadow=!0,this.mesh.receiveShadow=!0;this.basePositionY=e/2,this.mesh.position.y=this.basePositionY,this.mesh.position.x=i,this.mesh.position.z=r,a.add(this.mesh);const b=Hn.spotlightConfig.inactive;this.spotlight=new yu(b.color,b.intensity,b.distance,b.angle,b.penumbra),this.spotlight.position.set(i,8,r),this.spotlight.target=this.mesh,this.spotlight.castShadow=!1,this.spotlight.shadow.mapSize.width=256,this.spotlight.shadow.mapSize.height=256,this.spotlight.shadow.camera.near=.1,this.spotlight.shadow.camera.far=20,a.add(this.spotlight),a.add(this.spotlight.target),this.velocity=new D(0,0,0),this.moving=!1,this.hasThrown=!1,this.hasCausedDamage=!1,this.animatedDeadRing=null}updatePosition(){this.mesh.position.add(this.velocity),this.spotlight.position.set(this.mesh.position.x,8,this.mesh.position.z),this.animatedDeadRing&&(this.animatedDeadRing.position.x=this.mesh.position.x,this.animatedDeadRing.position.z=this.mesh.position.z)}handleWallCollision(t,e,n){this.mesh.position.x+this.radius>t/2?(this.mesh.position.x=t/2-this.radius,this.velocity.x=-this.velocity.x*n):this.mesh.position.x-this.radius<-t/2&&(this.mesh.position.x=-t/2+this.radius,this.velocity.x=-this.velocity.x*n),this.mesh.position.z+this.radius>e/2?(this.mesh.position.z=e/2-this.radius,this.velocity.z=-this.velocity.z*n):this.mesh.position.z-this.radius<-e/2&&(this.mesh.position.z=-e/2+this.radius,this.velocity.z=-this.velocity.z*n)}handleCollisionWithBox(t,e){t.updateMatrixWorld();const n=new Zn().setFromObject(t),i=this.mesh.position.clone(),r=this.radius,a=new D(Math.max(n.min.x,Math.min(i.x,n.max.x)),Math.max(n.min.y,Math.min(i.y,n.max.y)),Math.max(n.min.z,Math.min(i.z,n.max.z))),o=a.distanceTo(i);if(o<r){const l=i.clone().sub(a).normalize(),c=r-o;this.mesh.position.add(l.clone().multiplyScalar(c));const h=this.velocity.dot(l);if(h<0){const u=l.multiplyScalar(-2*h);this.velocity.add(u),this.velocity.multiplyScalar(e)}this.moving=!0}}applyFriction(t){this.velocity.multiplyScalar(t),this.velocity.length()<.01&&(this.velocity.set(0,0,0),this.moving=!1,this.hasCausedDamage=!1,this.rageWasUsedThisThrow&&(this.canDoReboundDamage=!1,this.rageWasUsedThisThrow=!1),(this.kind==="Orb"||this.kind==="HealingOrb")&&(this.hitPoints=0,this.lastHitPoints=0),this.hitPoints<=0&&!this.dead&&this.die(),(this.kind==="Orb"||this.kind==="HealingOrb")&&this.gameController&&this.gameController.removeOrb(this),this.kind==="AnimatedDead"&&this.dead&&this.gameController&&this.gameController.thrownDisc!==this&&this.gameController.removeAnimatedDead(this))}revive(t){this.dead&&(this.dead=!1,this.hitPoints=t,this.lastHitPoints=t,this.hasThrown=!1,this.moving=!1,this.velocity.set(0,0,0),this.mesh.isGroup?this.mesh.children.forEach(e=>{e.material&&(e.material.color&&this.initialColor!==void 0&&e.material.color.set(e.material.map?16777215:this.initialColor),e.material.transparent=!0,e.material.opacity=.9)}):this.mesh.material&&(this.mesh.material.color&&this.initialColor!==void 0&&this.mesh.material.color.set(this.initialColor),this.mesh.material.transparent=!0,this.mesh.material.opacity=.9),this.updateSpotlightConfig("inactive"))}takeHit(t=1,e=null){if(this.kind==="Wizard"&&this.gameController){const r=this.gameController.wizardOrbs.find(a=>a&&a.hitPoints>0&&!a.dead);if(r){e&&e.type==="NPC"&&e.takeHit(r.attackDamage,this);const a=r.hitPoints;r.hitPoints=0,a>0&&this.gameController&&this.gameController.uiManager&&this.gameController.uiManager.showFloatingText(r,a,!1),r.lastHitPoints=0,r.die(),this.gameController.removeOrb(r);return}}const n=this.hitPoints;this.hitPoints=Math.max(this.hitPoints-t,0);const i=n-this.hitPoints;i>0&&this.gameController&&this.gameController.uiManager&&this.kind!=="Orb"&&this.kind!=="HealingOrb"&&this.gameController.uiManager.showFloatingText(this,i,!1),this.lastHitPoints=this.hitPoints,(this.kind==="Orb"||this.kind==="HealingOrb")&&this.hitPoints<=0&&n>0&&(this.die(),this.gameController&&this.gameController.removeOrb(this))}restoreHealth(t=1){if(this.dead)return;const e=this.hitPoints;this.hitPoints=Math.min(this.hitPoints+t,this.maxHitPoints);const n=this.hitPoints-e;n>0&&this.gameController&&this.gameController.uiManager&&this.gameController.uiManager.showFloatingText(this,n,!0),this.lastHitPoints=this.hitPoints}die(){this.dead||(this.dead=!0,this.mesh.isGroup?this.mesh.children.forEach(t=>{t.material&&(t.material.color&&t.material.color.set(8947848),t.material.emissive&&t.material.emissive.set(0),t.material.opacity=.9,t.material.transparent=!1)}):(this.mesh.material.color&&this.mesh.material.color.set(8947848),this.mesh.material.emissive&&this.mesh.material.emissive.set(0),this.mesh.material.opacity=.9,this.mesh.material.transparent=!1),this.hideAnimatedDeadRing(),this.updateSpotlightConfig("dead"))}setSpotlightIntensity(t){this.dead?(this.hideAnimatedDeadRing(),this.updateSpotlightConfig("dead")):this.kind==="Barbarian"&&(this.rageIsActiveForNextThrow||this.rageWasUsedThisThrow)?(this.hideAnimatedDeadRing(),this.updateSpotlightConfig("raging")):this.kind==="AnimatedDead"?(this.showAnimatedDeadRing(),this.updateSpotlightConfig("inactive")):t?(this.hideAnimatedDeadRing(),this.updateSpotlightConfig("active")):(this.hideAnimatedDeadRing(),this.updateSpotlightConfig("inactive"))}showAnimatedDeadRing(){if(this.animatedDeadRing)return;const t=new Vs(this.radius,.3,8,48),e=new Es({color:8926156,emissive:4460902});this.animatedDeadRing=new Tt(t,e),this.animatedDeadRing.rotation.x=Math.PI/2,this.animatedDeadRing.position.set(this.mesh.position.x,.06,this.mesh.position.z),this.scene.add(this.animatedDeadRing)}hideAnimatedDeadRing(){this.animatedDeadRing&&(this.scene.remove(this.animatedDeadRing),this.animatedDeadRing.geometry.dispose(),this.animatedDeadRing.material.dispose(),this.animatedDeadRing=null)}updateSpotlightConfig(t){const e=Hn.spotlightConfig[t];e&&(this.spotlight.intensity=e.intensity,this.spotlight.distance=e.distance,this.spotlight.angle=e.angle,this.spotlight.penumbra=e.penumbra,this.spotlight.color.setHex(e.color))}static updateSpotlightConfig(t,e){Hn.spotlightConfig[t]&&Object.assign(Hn.spotlightConfig[t],e)}resetDamageState(){this.hasCausedDamage=!1,this.healedDiscs.clear()}dispose(){this.hideAnimatedDeadRing(),this.scene&&(this.scene.remove(this.mesh),this.scene.remove(this.spotlight),this.scene.remove(this.spotlight.target),this.mesh.isGroup?this.mesh.children.forEach(t=>{t.geometry&&t.geometry.dispose(),t.material&&(t.material.map&&t.material.map.dispose(),t.material.dispose())}):(this.mesh.geometry&&this.mesh.geometry.dispose(),this.mesh.material&&this.mesh.material.dispose()))}};Ka(Hn,"spotlightConfig",{active:{intensity:80,distance:25,angle:Math.PI/4,penumbra:1.2,color:16777215},inactive:{intensity:30,distance:12.5,angle:Math.PI/4,penumbra:1.2,color:16777215},dead:{intensity:2,distance:15,angle:Math.PI/8,penumbra:.5,color:8947848},raging:{intensity:80,distance:25,angle:Math.PI/4,penumbra:1.2,color:16711680},animatedDead:{intensity:80,distance:15,angle:Math.PI/10,penumbra:.3,color:0},animateDeadTarget:{intensity:15,distance:10,angle:Math.PI/5,penumbra:1,color:10040319},animateDeadHovered:{intensity:80,distance:18,angle:Math.PI/4,penumbra:1.2,color:13395711}});let gn=Hn;class _g{constructor(t){this.gc=t,this.mana=3,this.manaEarnedThisTurn=0,this.hasMovedThisTurn=!1,this.orbs=[],this._radiusBlastRings=[],this.summonOrbsButton=null,this.summonHealingOrbsButton=null,this.radiusBlastButton=null,this.endTurnButton=null,this._actionButtonsContainer=null}init(t){this._actionButtonsContainer=t,this._createSummonOrbsButton(),this._setupSummonOrbsButtonListener(),this._createSummonHealingOrbsButton(),this._setupSummonHealingOrbsButtonListener(),this._createRadiusBlastButton(),this._setupRadiusBlastButtonListener(),this._createEndTurnButton(),this._setupEndTurnButtonListener(),this.updateActionButtons(),this.updateEndTurnButtonVisibility()}getDisc(){return this.gc.discs.find(t=>t.type==="player"&&t.kind==="Wizard"&&!t.dead)}_createSummonOrbsButton(){if(!this._actionButtonsContainer)return;let t=document.getElementById("summon-orbs-button");t||(t=document.createElement("button"),t.id="summon-orbs-button",t.textContent="[1] Summon Orb",this._actionButtonsContainer.appendChild(t)),t.style.display="none",this.summonOrbsButton=t}_createSummonHealingOrbsButton(){if(!this._actionButtonsContainer)return;let t=document.getElementById("summon-healing-orbs-button");t||(t=document.createElement("button"),t.id="summon-healing-orbs-button",t.textContent="[2] Summon Healing Orb",this._actionButtonsContainer.appendChild(t)),t.style.display="none",this.summonHealingOrbsButton=t}_createRadiusBlastButton(){if(!this._actionButtonsContainer)return;let t=document.getElementById("radius-blast-button");t||(t=document.createElement("button"),t.id="radius-blast-button",t.textContent="[3] Radius Blast (2 Mana)",this._actionButtonsContainer.appendChild(t)),t.style.display="none",this.radiusBlastButton=t}_createEndTurnButton(){if(!this._actionButtonsContainer)return;let t=document.getElementById("wizard-end-turn-button");t||(t=document.createElement("button"),t.id="wizard-end-turn-button",t.textContent="[Space] End Turn",this._actionButtonsContainer.appendChild(t)),t.style.display="none",this.endTurnButton=t}_setupSummonOrbsButtonListener(){this.summonOrbsButton&&this.summonOrbsButton.addEventListener("click",this._handleSummonOrbsButtonClick.bind(this))}_setupSummonHealingOrbsButtonListener(){this.summonHealingOrbsButton&&this.summonHealingOrbsButton.addEventListener("click",this._handleSummonHealingOrbsButtonClick.bind(this))}_setupRadiusBlastButtonListener(){this.radiusBlastButton&&this.radiusBlastButton.addEventListener("click",this._handleRadiusBlastButtonClick.bind(this))}_setupEndTurnButtonListener(){this.endTurnButton&&this.endTurnButton.addEventListener("click",this._handleEndTurnButtonClick.bind(this))}_handleSummonOrbsButtonClick(){const t=this.gc.currentTurnIndex!==-1?this.gc.discs[this.gc.currentTurnIndex]:null;!t||t.kind!=="Wizard"||t.dead||(this.mana>0&&this.summonSingleOrb(t)&&(this.mana--,this.gc.uiManager&&this.gc.uiManager.updateCurrentTurnDiscName(t)),this.updateActionButtons())}_handleSummonHealingOrbsButtonClick(){const t=this.gc.currentTurnIndex!==-1?this.gc.discs[this.gc.currentTurnIndex]:null;!t||t.kind!=="Wizard"||t.dead||(this.mana>0&&this.summonHealingOrb(t)&&(this.mana--,this.gc.uiManager&&this.gc.uiManager.updateCurrentTurnDiscName(t)),this.updateActionButtons())}_handleRadiusBlastButtonClick(){const t=this.gc.currentTurnIndex!==-1?this.gc.discs[this.gc.currentTurnIndex]:null;!t||t.kind!=="Wizard"||t.dead||this.mana>=2&&this.castRadiusBlast(t)}async _handleEndTurnButtonClick(){const t=this.gc.currentTurnIndex!==-1?this.gc.discs[this.gc.currentTurnIndex]:null;t&&t.kind==="Wizard"&&!t.dead&&await this.gc._proceedToNextPlayerTurn()}updateActionButtons(){this._updateSummonOrbsButtonVisibility(),this._updateSummonHealingOrbsButtonVisibility(),this._updateRadiusBlastButtonVisibility()}_updateSummonOrbsButtonVisibility(){if(!this.summonOrbsButton)return;const t=this.gc.currentTurnIndex!==-1?this.gc.discs[this.gc.currentTurnIndex]:null,e=this.orbs.filter(i=>i&&i.hitPoints>0&&!i.dead).length,n=!!(t&&t.kind==="Wizard"&&t.type==="player"&&!t.dead&&!this.gc.gameOverState.active&&this.mana>0&&e<3);this.summonOrbsButton.style.display=n?"inline-block":"none",this.summonOrbsButton.disabled=!n}_updateSummonHealingOrbsButtonVisibility(){if(!this.summonHealingOrbsButton)return;const t=this.gc.currentTurnIndex!==-1?this.gc.discs[this.gc.currentTurnIndex]:null,e=this.orbs.filter(i=>i&&i.hitPoints>0&&!i.dead).length,n=!!(t&&t.kind==="Wizard"&&t.type==="player"&&!t.dead&&!this.gc.gameOverState.active&&this.mana>0&&e<3);this.summonHealingOrbsButton.style.display=n?"inline-block":"none",this.summonHealingOrbsButton.disabled=!n}_updateRadiusBlastButtonVisibility(){if(!this.radiusBlastButton)return;const t=this.gc.currentTurnIndex!==-1?this.gc.discs[this.gc.currentTurnIndex]:null,e=!!(t&&t.kind==="Wizard"&&t.type==="player"&&!t.dead&&!this.gc.gameOverState.active&&this.mana>=2);this.radiusBlastButton.style.display=e?"inline-block":"none",this.radiusBlastButton.disabled=!e}updateEndTurnButtonVisibility(){if(!this.endTurnButton)return;const t=this.gc.currentTurnIndex!==-1?this.gc.discs[this.gc.currentTurnIndex]:null,e=!!(t&&t.type==="player"&&t.kind==="Wizard"&&!t.dead&&!this.gc.gameOverState.active);this.endTurnButton.style.display=e?"inline-block":"none",this.endTurnButton.disabled=!e}summonSingleOrb(t){if(!t||t.kind!=="Wizard"||t.dead||this.orbs.filter(a=>a&&a.hitPoints>0&&!a.dead).length>=3)return!1;const n=t.mesh.position,i=2;let r=!1;for(let a=0;a<360;a+=5){const o=a*(Math.PI/180),l=n.x+i*Math.cos(o),c=n.z+i*Math.sin(o);if(this.gc.isPositionValid(l,c,.35,!0,[t])){const h=new gn(.35,.2,65535,l,c,this.gc.scene,"Wizard's Orb","player","Orb",1,0,null,!1,.5,.5,!1,!1,1,this.gc,this.gc.discDescriptions.Orb);h.uniqueOrbId=`orb_${Date.now()}_${Math.random().toString(36).substring(2,7)}`,h.relativeOffset.copy(new D(l,0,c).sub(new D(n.x,0,n.z))),this.gc.discs.push(h),this.orbs.push(h),h.setSpotlightIntensity(!0),r=!0;break}}return r&&this.gc.updateDiscNames(),r}summonHealingOrb(t){if(!t||t.kind!=="Wizard"||t.dead||this.orbs.filter(a=>a&&a.hitPoints>0&&!a.dead).length>=3)return!1;const n=t.mesh.position,i=2;let r=!1;for(let a=0;a<360;a+=5){const o=a*(Math.PI/180),l=n.x+i*Math.cos(o),c=n.z+i*Math.sin(o);if(this.gc.isPositionValid(l,c,.35,!0,[t])){const h=new gn(.35,.2,16711680,l,c,this.gc.scene,"Healing Orb","player","HealingOrb",1,0,null,!1,.5,.5,!1,!1,0,this.gc,this.gc.discDescriptions.HealingOrb);h.uniqueOrbId=`orb_${Date.now()}_${Math.random().toString(36).substring(2,7)}`,h.relativeOffset.copy(new D(l,0,c).sub(new D(n.x,0,n.z))),this.gc.discs.push(h),this.orbs.push(h),h.setSpotlightIntensity(!0),r=!0;break}}return r&&this.gc.updateDiscNames(),r}removeOrb(t){if(!t)return;const e=this.orbs.indexOf(t);e>-1&&this.orbs.splice(e,1);const n=this.gc.discs.indexOf(t);n>-1&&this.gc.discs.splice(n,1),t.velocity.set(0,0,0),t.moving=!1,t.dispose(),this.updateActionButtons(),this.gc.updateDiscNames()}castRadiusBlast(t){if(!t||t.dead||this.mana<2)return;this.mana-=2;const e=8,n=3.5,i=t.mesh.position;this.gc.discs.forEach(c=>{if(c===t||c.dead)return;const h=c.mesh.position.x-i.x,u=c.mesh.position.z-i.z,f=Math.sqrt(h*h+u*u);if(f>0&&f<=e){const d=n*(1-f/e);c.velocity.x+=h/f*d,c.velocity.z+=u/f*d,c.moving=!0,c.takeHit(1,t)}}),this.gc.updateAllDiscDeadStates(),this.gc.checkGameOverConditions();const r=t.mesh.position.y+.1,a=t.mesh.position.x,o=t.mesh.position.z,l=.45;for(let c=0;c<2;c++){const h=new Vs(1,.03,8,64),u=new Ze({color:8965375,transparent:!0,opacity:.85,side:ue}),f=new Tt(h,u);f.rotation.x=Math.PI/2,f.position.set(a,r,o),this.gc.scene.add(f),this._radiusBlastRings.push({mesh:f,delay:c*.15,elapsed:0,duration:l,maxRadius:e})}this.gc.uiManager&&this.gc.uiManager.updateCurrentTurnDiscName(t),this.updateActionButtons()}update(t){this._updateOrbFollowing(),this._updateRadiusBlastRings(t)}_updateOrbFollowing(){const t=this.gc.discs.find(n=>n.kind==="Wizard"&&n.type==="player"&&!n.dead);if(!t||this.orbs.length===0)return;const e=t.mesh.position;[...this.orbs].forEach(n=>{const i=this.gc.discs.find(r=>r.uniqueOrbId===n.uniqueOrbId);if(i&&i.mesh&&i.hitPoints>0&&!i.dead&&!i.moving){const r=e.clone().add(i.relativeOffset);if(r.y=i.basePositionY,i.mesh.position.copy(r),i.spotlight&&i.spotlight.position.set(r.x,i.spotlight.position.y,r.z),this.gc.level&&typeof i.radius=="number"){const a=i.radius;i.mesh.position.x=Math.max(-this.gc.level.fieldWidth/2+a,Math.min(this.gc.level.fieldWidth/2-a,i.mesh.position.x)),i.mesh.position.z=Math.max(-this.gc.level.fieldDepth/2+a,Math.min(this.gc.level.fieldDepth/2-a,i.mesh.position.z))}}})}_updateRadiusBlastRings(t){for(let e=this._radiusBlastRings.length-1;e>=0;e--){const n=this._radiusBlastRings[e];n.elapsed+=t;const i=n.elapsed-n.delay;if(i<=0)continue;const r=Math.min(i/n.duration,1),a=n.maxRadius*r;n.mesh.scale.set(a,a,1),n.mesh.material.opacity=.85*(1-r),r>=1&&(this.gc.scene.remove(n.mesh),n.mesh.geometry.dispose(),n.mesh.material.dispose(),this._radiusBlastRings.splice(e,1))}}async onDiscStopped(t){if(t.kind==="Wizard"){this.hasMovedThisTurn=!0;const e=this.orbs.filter(i=>i&&i.hitPoints>0&&!i.dead).length,n=this.mana>0&&e<3;e===0&&!n?await this.gc._proceedToNextPlayerTurn():(this.gc.currentDisc=t,this.gc.logCurrentTurn(),this.gc._updateSpotlights(),this.gc.barbarianController.updateRageButtonVisibility(),this.updateActionButtons(),this.updateEndTurnButtonVisibility())}else if(t.kind==="Orb"||t.kind==="HealingOrb"){this.removeOrb(t);const e=this.gc.discs.find(n=>n.kind==="Wizard"&&n.type==="player"&&!n.dead);if(e){this.gc.currentDisc=e;const n=this.gc.discs.indexOf(e);n!==-1&&(this.gc.currentTurnIndex=n),this.gc.logCurrentTurn(),this.gc._updateSpotlights(),this.gc.barbarianController.updateRageButtonVisibility(),this.updateActionButtons(),this.updateEndTurnButtonVisibility(),this.gc.barbarianController.updateEndTurnButtonVisibility();const i=this.orbs.filter(a=>a&&a.hitPoints>0&&!a.dead).length,r=this.mana>0&&i<3;i===0&&this.hasMovedThisTurn&&!r&&await this.gc._proceedToNextPlayerTurn()}else await this.gc._proceedToNextPlayerTurn()}}applyEarnedMana(){this.mana+=this.manaEarnedThisTurn+1,this.manaEarnedThisTurn=0}onTurnEnd(){this.hasMovedThisTurn=!1}onLevelStart(){this.hasMovedThisTurn=!1,this.manaEarnedThisTurn=0,this.orbs=[]}onGameRestart(){this.mana=3,this.manaEarnedThisTurn=0,this.hasMovedThisTurn=!1,this.orbs=[]}}class vg{constructor(t){this.gc=t,this.mana=3,this.manaEarnedThisTurn=0,this.hasMovedThisTurn=!1,this.animatedDeadDiscs=[],this.movedThisTurn=new Set,this.selectingTarget=!1,this.hoveredDisc=null,this._focusIndex=0,this._targetBeams=[],this._beamGeo=null,this._beamMat=null,this.animateDeadButton=null,this.raiseDeadButton=null,this.focusPrevButton=null,this.focusNextButton=null,this.endTurnButton=null,this.targetSelectionPopup=null,this._actionButtonsContainer=null}init(t){this._actionButtonsContainer=t,this._createAnimateDeadButton(),this._setupAnimateDeadButtonListener(),this._createRaiseDeadButton(),this._setupRaiseDeadButtonListener(),this._createFocusButtons(),this._setupFocusButtonListeners(),this._createEndTurnButton(),this._setupEndTurnButtonListener(),this.updateActionButtons(),this.updateEndTurnButtonVisibility()}getDisc(){return this.gc.discs.find(t=>t.type==="player"&&t.kind==="Necromancer"&&!t.dead)}canCastSpells(t){if(!t||t.dead)return!1;const e=this.gc.discs.filter(r=>r.type==="NPC"&&r.dead&&!r.isAnimatedDead),n=this.gc.discs.filter(r=>r.type==="player"&&r.dead&&r.kind!=="Orb"&&r.kind!=="HealingOrb"&&r.kind!=="AnimatedDead"&&r.kind!=="Necromancer"),i=this.animatedDeadDiscs.filter(r=>r.hitPoints>0&&!r.dead).length;return this.mana>=1&&e.length>0&&i<3||this.mana>=2&&n.length>0}_createAnimateDeadButton(){if(!this._actionButtonsContainer)return;let t=document.getElementById("animate-dead-button");t||(t=document.createElement("button"),t.id="animate-dead-button",t.textContent="[1] Animate Dead (1💀)",this._actionButtonsContainer.appendChild(t)),t.style.display="none",this.animateDeadButton=t}_createRaiseDeadButton(){if(!this._actionButtonsContainer)return;let t=document.getElementById("raise-dead-button");t||(t=document.createElement("button"),t.id="raise-dead-button",t.textContent="[2] Raise Dead (2💀)",this._actionButtonsContainer.appendChild(t)),t.style.display="none",this.raiseDeadButton=t}_createFocusButtons(){if(!this._actionButtonsContainer)return;let t=document.getElementById("focus-animated-prev-button");t||(t=document.createElement("button"),t.id="focus-animated-prev-button",t.textContent="<",this._actionButtonsContainer.appendChild(t)),t.style.display="none",this.focusPrevButton=t;let e=document.getElementById("focus-animated-next-button");e||(e=document.createElement("button"),e.id="focus-animated-next-button",e.textContent=">",this._actionButtonsContainer.appendChild(e)),e.style.display="none",this.focusNextButton=e}_createEndTurnButton(){if(!this._actionButtonsContainer)return;let t=document.getElementById("necromancer-end-turn-button");t||(t=document.createElement("button"),t.id="necromancer-end-turn-button",t.textContent="[Space] End Turn",this._actionButtonsContainer.appendChild(t)),t.style.display="none",this.endTurnButton=t}_setupAnimateDeadButtonListener(){this.animateDeadButton&&this.animateDeadButton.addEventListener("click",this._handleAnimateDeadButtonClick.bind(this))}_setupRaiseDeadButtonListener(){this.raiseDeadButton&&this.raiseDeadButton.addEventListener("click",this._handleRaiseDeadButtonClick.bind(this))}_setupFocusButtonListeners(){this.focusPrevButton&&this.focusPrevButton.addEventListener("click",this._focusPrev.bind(this)),this.focusNextButton&&this.focusNextButton.addEventListener("click",this._focusNext.bind(this))}_setupEndTurnButtonListener(){this.endTurnButton&&this.endTurnButton.addEventListener("click",this._handleEndTurnButtonClick.bind(this))}_handleAnimateDeadButtonClick(){const t=this.gc.currentTurnIndex!==-1?this.gc.discs[this.gc.currentTurnIndex]:null;if(!t||t.kind!=="Necromancer"||t.dead||this.mana<1||this.animatedDeadDiscs.filter(i=>i.hitPoints>0&&!i.dead).length>=3)return;const n=this.gc.discs.filter(i=>i.type==="NPC"&&i.dead&&!i.isAnimatedDead);n.length!==0&&(this.selectingTarget=!0,n.forEach(i=>i.updateSpotlightConfig("animateDeadTarget")),this._spawnTargetBeams(n),this.gc.uiManager&&this.gc.uiManager.updateThrowInfo("Click a dead enemy to animate it  •  Esc to cancel",!0),this.updateActionButtons())}_handleRaiseDeadButtonClick(){const t=this.gc.currentTurnIndex!==-1?this.gc.discs[this.gc.currentTurnIndex]:null;if(!t||t.kind!=="Necromancer"||t.dead||this.mana<2)return;const e=this.gc.discs.filter(n=>n.type==="player"&&n.dead&&n.kind!=="Orb"&&n.kind!=="HealingOrb"&&n.kind!=="AnimatedDead"&&n.kind!=="Necromancer");e.length!==0&&this._showTargetSelectionPopup(e,n=>{this.raiseDeadDisc(t,n)&&(this.gc.uiManager&&this.gc.uiManager.updateCurrentTurnDiscName(t),this.updateActionButtons(),this.gc.updateDiscNames())},"Choose an ally to raise:")}async _handleEndTurnButtonClick(){const t=this.gc.currentTurnIndex!==-1?this.gc.discs[this.gc.currentTurnIndex]:null;t&&t.kind==="Necromancer"&&!t.dead&&await this.gc._proceedToNextPlayerTurn()}_focusPrev(){const t=this.animatedDeadDiscs.filter(e=>e&&!e.dead&&e.hitPoints>0);t.length&&(this._focusIndex=(this._focusIndex-1+t.length)%t.length,this.gc.controls&&this.gc.controls.target.copy(t[this._focusIndex].mesh.position))}_focusNext(){const t=this.animatedDeadDiscs.filter(e=>e&&!e.dead&&e.hitPoints>0);t.length&&(this._focusIndex=(this._focusIndex+1)%t.length,this.gc.controls&&this.gc.controls.target.copy(t[this._focusIndex].mesh.position))}updateActionButtons(){this._updateAnimateDeadButtonVisibility(),this._updateRaiseDeadButtonVisibility(),this._updateFocusButtonVisibility()}_updateAnimateDeadButtonVisibility(){if(!this.animateDeadButton)return;const t=this.gc.currentTurnIndex!==-1?this.gc.discs[this.gc.currentTurnIndex]:null,e=this.gc.discs.filter(r=>r.type==="NPC"&&r.dead&&!r.isAnimatedDead),n=this.animatedDeadDiscs.filter(r=>r.hitPoints>0&&!r.dead).length,i=!!(t&&t.kind==="Necromancer"&&t.type==="player"&&!t.dead&&!this.gc.gameOverState.active&&this.mana>=1&&e.length>0&&n<3&&!this.selectingTarget);this.animateDeadButton.style.display=i?"inline-block":"none",this.animateDeadButton.disabled=!i}_updateRaiseDeadButtonVisibility(){if(!this.raiseDeadButton)return;const t=this.gc.currentTurnIndex!==-1?this.gc.discs[this.gc.currentTurnIndex]:null,e=this.gc.discs.filter(i=>i.type==="player"&&i.dead&&i.kind!=="Orb"&&i.kind!=="HealingOrb"&&i.kind!=="AnimatedDead"&&i.kind!=="Necromancer"),n=!!(t&&t.kind==="Necromancer"&&t.type==="player"&&!t.dead&&!this.gc.gameOverState.active&&this.mana>=2&&e.length>0);this.raiseDeadButton.style.display=n?"inline-block":"none",this.raiseDeadButton.disabled=!n}_updateFocusButtonVisibility(){const t=this.gc.currentTurnIndex!==-1?this.gc.discs[this.gc.currentTurnIndex]:null,e=this.animatedDeadDiscs.filter(i=>i&&!i.dead&&i.hitPoints>0),n=!!(t&&t.kind==="Necromancer"&&!t.dead&&e.length>1);this.focusPrevButton&&(this.focusPrevButton.style.display=n?"inline-block":"none",this.focusPrevButton.disabled=!n),this.focusNextButton&&(this.focusNextButton.style.display=n?"inline-block":"none",this.focusNextButton.disabled=!n)}updateEndTurnButtonVisibility(){if(!this.endTurnButton)return;const t=this.gc.currentTurnIndex!==-1?this.gc.discs[this.gc.currentTurnIndex]:null,e=!!(t&&t.type==="player"&&t.kind==="Necromancer"&&!t.dead&&!this.gc.gameOverState.active);this.endTurnButton.style.display=e?"inline-block":"none",this.endTurnButton.disabled=!e}cancelTargetSelection(){this.selectingTarget&&(this.selectingTarget=!1,this.hoveredDisc=null,this.gc.discs.filter(t=>t.type==="NPC"&&t.dead&&!t.isAnimatedDead).forEach(t=>t.updateSpotlightConfig("dead")),this._clearTargetBeams(),this.gc.uiManager&&this.gc.uiManager.updateThrowInfo("",!1),this.updateActionButtons())}handlePointerHover(t){if(!this.selectingTarget)return;const e=new ot(t.clientX/window.innerWidth*2-1,-(t.clientY/window.innerHeight)*2+1);this.gc.raycaster.setFromCamera(e,this.gc.camera);const n=this.gc.discs.filter(r=>r.type==="NPC"&&r.dead&&!r.isAnimatedDead);let i=null;for(const r of n)if(this.gc.raycaster.intersectObject(r.mesh,!0).length>0){i=r;break}i!==this.hoveredDisc&&(this.hoveredDisc&&this.hoveredDisc.updateSpotlightConfig("animateDeadTarget"),this.hoveredDisc=i,i&&i.updateSpotlightConfig("animateDeadHovered"))}handleTargetClick(t){if(t&&t.type==="NPC"&&t.dead&&!t.isAnimatedDead){const e=this.gc.discs.find(n=>n.kind==="Necromancer"&&n.type==="player"&&!n.dead);e&&this.animateDeadDisc(e,t)&&(this.gc.uiManager&&this.gc.uiManager.updateCurrentTurnDiscName(e),this.gc.updateDiscNames())}this.cancelTargetSelection()}_showTargetSelectionPopup(t,e,n){this.hideTargetSelectionPopup();const i=document.createElement("div");i.id="target-selection-popup",i.style.cssText="margin-top:8px;padding:8px;background:rgba(0,0,0,0.75);border:1px solid #8833CC;border-radius:6px;";const r=document.createElement("div");r.textContent=n,r.style.cssText="color:#CC88FF;font-size:0.8em;margin-bottom:6px;font-weight:bold;",i.appendChild(r),t.forEach(o=>{const l=document.createElement("button");l.textContent=o.discName,l.style.cssText="display:block;width:100%;margin-bottom:4px;padding:4px 8px;font-size:0.75em;cursor:pointer;",l.addEventListener("click",()=>{this.hideTargetSelectionPopup(),e(o)}),i.appendChild(l)});const a=document.createElement("button");a.textContent="Cancel",a.style.cssText="display:block;width:100%;padding:4px 8px;font-size:0.75em;cursor:pointer;margin-top:4px;opacity:0.7;",a.addEventListener("click",()=>this.hideTargetSelectionPopup()),i.appendChild(a),this._actionButtonsContainer.appendChild(i),this.targetSelectionPopup=i}hideTargetSelectionPopup(){this.targetSelectionPopup&&(this.targetSelectionPopup.remove(),this.targetSelectionPopup=null)}_spawnTargetBeams(t){if(this._clearTargetBeams(),!t.length)return;const e=200;this._beamGeo=new pn(1,1,e,16,1,!0),this._beamMat=new Ze({color:10040319,transparent:!0,opacity:.13,side:be,depthWrite:!1}),t.forEach(n=>{const i=new Tt(this._beamGeo,this._beamMat);i.position.set(n.mesh.position.x,e/2,n.mesh.position.z),this.gc.scene.add(i),this._targetBeams.push(i)})}_clearTargetBeams(){this._targetBeams.forEach(t=>this.gc.scene.remove(t)),this._targetBeams=[],this._beamGeo&&(this._beamGeo.dispose(),this._beamGeo=null),this._beamMat&&(this._beamMat.dispose(),this._beamMat=null)}animateDeadDisc(t,e){return!t||t.dead||!e||!e.dead||this.mana<1||this.animatedDeadDiscs.filter(i=>i.hitPoints>0&&!i.dead).length>=3?!1:(this.mana--,e._originalKind=e.kind,e._originalType=e.type,e._originalAttackDamage=e.attackDamage,e._originalMaxHitPoints=e.maxHitPoints,e.revive(1),e.attackDamage=1,e.maxHitPoints=1,e.type="player",e.kind="AnimatedDead",e.isAnimatedDead=!0,e._animatedDeadColor=t.initialColor,e.mesh.position.y=e.basePositionY,this.animatedDeadDiscs.push(e),e.setSpotlightIntensity(!1),!0)}raiseDeadDisc(t,e){if(!t||t.dead||!e||!e.dead||this.mana<2)return!1;this.mana-=2;const n=Math.max(1,Math.floor(e.maxHitPoints/2));return e.revive(n),e.hitPoints=n,e.lastHitPoints=n,this.gc.updateDiscNames(),!0}removeAnimatedDead(t){if(!t)return;const e=this.animatedDeadDiscs.indexOf(t);e!==-1&&(this.animatedDeadDiscs.splice(e,1),t.kind=t._originalKind||"Skeleton",t.type=t._originalType||"NPC",t.attackDamage=t._originalAttackDamage!==void 0?t._originalAttackDamage:1,t.maxHitPoints=t._originalMaxHitPoints!==void 0?t._originalMaxHitPoints:t.maxHitPoints,t.isAnimatedDead=!1,delete t._originalKind,delete t._originalType,delete t._originalAttackDamage,delete t._originalMaxHitPoints,delete t._animatedDeadColor,t.dead||(t.hitPoints=0,t.lastHitPoints=0,t.die()),this.updateActionButtons(),this.gc.updateDiscNames())}async onDiscStopped(t){if(t.kind==="Necromancer"){this.hasMovedThisTurn=!0;const e=this.animatedDeadDiscs.filter(i=>i&&i.hitPoints>0&&!i.dead).length,n=this.canCastSpells(t);e===0&&!n?await this.gc._proceedToNextPlayerTurn():(this.gc.currentDisc=t,this.gc.logCurrentTurn(),this.gc._updateSpotlights(),this.gc.barbarianController.updateRageButtonVisibility(),this.updateActionButtons(),this.updateEndTurnButtonVisibility())}else if(t.kind==="AnimatedDead"){this.movedThisTurn.add(t),t.hitPoints<=0&&this.removeAnimatedDead(t);const e=this.gc.discs.find(n=>n.kind==="Necromancer"&&n.type==="player"&&!n.dead);if(e){this.gc.currentDisc=e;const n=this.gc.discs.indexOf(e);n!==-1&&(this.gc.currentTurnIndex=n),this.gc.logCurrentTurn(),this.gc._updateSpotlights(),this.gc.barbarianController.updateRageButtonVisibility(),this.updateActionButtons(),this.updateEndTurnButtonVisibility(),this.gc.barbarianController.updateEndTurnButtonVisibility();const i=this.animatedDeadDiscs.filter(a=>a&&a.hitPoints>0&&!a.dead&&!this.movedThisTurn.has(a)).length,r=this.canCastSpells(e);i===0&&this.hasMovedThisTurn&&!r&&await this.gc._proceedToNextPlayerTurn()}else await this.gc._proceedToNextPlayerTurn()}}applyEarnedMana(){this.mana+=this.manaEarnedThisTurn,this.manaEarnedThisTurn=0}onTurnEnd(){this.hasMovedThisTurn=!1,this.movedThisTurn.clear(),this.cancelTargetSelection()}onLevelStart(){this.hasMovedThisTurn=!1,this.manaEarnedThisTurn=0,this.animatedDeadDiscs=[],this.movedThisTurn.clear(),this.cancelTargetSelection(),this.hideTargetSelectionPopup()}onGameRestart(){this.mana=3,this.manaEarnedThisTurn=0,this.hasMovedThisTurn=!1,this.animatedDeadDiscs=[],this.movedThisTurn.clear(),this.cancelTargetSelection(),this.hideTargetSelectionPopup()}}const al={type:"change"},ka={type:"start"},Yl={type:"end"},Cs=new Hs,ol=new ke,xg=Math.cos(70*pa.DEG2RAD),ge=new D,Ie=2*Math.PI,se={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Ar=1e-6;class Mg extends Au{constructor(t,e=null){super(t,e),this.state=se.NONE,this.target=new D,this.cursor=new D,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:gi.ROTATE,MIDDLE:gi.DOLLY,RIGHT:gi.PAN},this.touches={ONE:pi.ROTATE,TWO:pi.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new D,this._lastQuaternion=new _n,this._lastTargetPosition=new D,this._quat=new _n().setFromUnitVectors(t.up,new D(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new va,this._sphericalDelta=new va,this._scale=1,this._panOffset=new D,this._rotateStart=new ot,this._rotateEnd=new ot,this._rotateDelta=new ot,this._panStart=new ot,this._panEnd=new ot,this._panDelta=new ot,this._dollyStart=new ot,this._dollyEnd=new ot,this._dollyDelta=new ot,this._dollyDirection=new D,this._mouse=new ot,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Sg.bind(this),this._onPointerDown=yg.bind(this),this._onPointerUp=Eg.bind(this),this._onContextMenu=Dg.bind(this),this._onMouseWheel=wg.bind(this),this._onKeyDown=Cg.bind(this),this._onTouchStart=Ag.bind(this),this._onTouchMove=Rg.bind(this),this._onMouseDown=Tg.bind(this),this._onMouseMove=bg.bind(this),this._interceptControlDown=Pg.bind(this),this._interceptControlUp=Lg.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(al),this.update(),this.state=se.NONE}update(t=null){const e=this.object.position;ge.copy(e).sub(this.target),ge.applyQuaternion(this._quat),this._spherical.setFromVector3(ge),this.autoRotate&&this.state===se.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,i=this.maxAzimuthAngle;isFinite(n)&&isFinite(i)&&(n<-Math.PI?n+=Ie:n>Math.PI&&(n-=Ie),i<-Math.PI?i+=Ie:i>Math.PI&&(i-=Ie),n<=i?this._spherical.theta=Math.max(n,Math.min(i,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+i)/2?Math.max(n,this._spherical.theta):Math.min(i,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(ge.setFromSpherical(this._spherical),ge.applyQuaternion(this._quatInverse),e.copy(this.target).add(ge),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){const o=ge.length();a=this._clampDistance(o*this._scale);const l=o-a;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){const o=new D(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;const c=new D(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(o),this.object.updateMatrixWorld(),a=ge.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(Cs.origin.copy(this.object.position),Cs.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Cs.direction))<xg?this.object.lookAt(this.target):(ol.setFromNormalAndCoplanarPoint(this.object.up,this.target),Cs.intersectPlane(ol,this.target))))}else if(this.object.isOrthographicCamera){const a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Ar||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Ar||this._lastTargetPosition.distanceToSquared(this.target)>Ar?(this.dispatchEvent(al),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?Ie/60*this.autoRotateSpeed*t:Ie/60/60*this.autoRotateSpeed}_getZoomScale(t){const e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){ge.setFromMatrixColumn(e,0),ge.multiplyScalar(-t),this._panOffset.add(ge)}_panUp(t,e){this.screenSpacePanning===!0?ge.setFromMatrixColumn(e,1):(ge.setFromMatrixColumn(e,0),ge.crossVectors(this.object.up,ge)),ge.multiplyScalar(t),this._panOffset.add(ge)}_pan(t,e){const n=this.domElement;if(this.object.isPerspectiveCamera){const i=this.object.position;ge.copy(i).sub(this.target);let r=ge.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/n.clientHeight,this.object.matrix),this._panUp(2*e*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const n=this.domElement.getBoundingClientRect(),i=t-n.left,r=e-n.top,a=n.width,o=n.height;this._mouse.x=i/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(Ie*this._rotateDelta.x/e.clientHeight),this._rotateUp(Ie*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(Ie*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-Ie*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(Ie*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-Ie*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),i=.5*(t.pageY+e.y);this._rotateStart.set(n,i)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),i=.5*(t.pageY+e.y);this._panStart.set(n,i)}}_handleTouchStartDolly(t){const e=this._getSecondPointerPosition(t),n=t.pageX-e.x,i=t.pageY-e.y,r=Math.sqrt(n*n+i*i);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const n=this._getSecondPointerPosition(t),i=.5*(t.pageX+n.x),r=.5*(t.pageY+n.y);this._rotateEnd.set(i,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(Ie*this._rotateDelta.x/e.clientHeight),this._rotateUp(Ie*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),i=.5*(t.pageY+e.y);this._panEnd.set(n,i)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const e=this._getSecondPointerPosition(t),n=t.pageX-e.x,i=t.pageY-e.y,r=Math.sqrt(n*n+i*i);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const a=(t.pageX+e.x)*.5,o=(t.pageY+e.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new ot,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){const e=t.deltaMode,n={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}}function yg(s){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(s.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(s)&&(this._addPointer(s),s.pointerType==="touch"?this._onTouchStart(s):this._onMouseDown(s)))}function Sg(s){this.enabled!==!1&&(s.pointerType==="touch"?this._onTouchMove(s):this._onMouseMove(s))}function Eg(s){switch(this._removePointer(s),this._pointers.length){case 0:this.domElement.releasePointerCapture(s.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Yl),this.state=se.NONE;break;case 1:const t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function Tg(s){let t;switch(s.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case gi.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(s),this.state=se.DOLLY;break;case gi.ROTATE:if(s.ctrlKey||s.metaKey||s.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(s),this.state=se.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(s),this.state=se.ROTATE}break;case gi.PAN:if(s.ctrlKey||s.metaKey||s.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(s),this.state=se.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(s),this.state=se.PAN}break;default:this.state=se.NONE}this.state!==se.NONE&&this.dispatchEvent(ka)}function bg(s){switch(this.state){case se.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(s);break;case se.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(s);break;case se.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(s);break}}function wg(s){this.enabled===!1||this.enableZoom===!1||this.state!==se.NONE||(s.preventDefault(),this.dispatchEvent(ka),this._handleMouseWheel(this._customWheelEvent(s)),this.dispatchEvent(Yl))}function Cg(s){this.enabled!==!1&&this._handleKeyDown(s)}function Ag(s){switch(this._trackPointer(s),this._pointers.length){case 1:switch(this.touches.ONE){case pi.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(s),this.state=se.TOUCH_ROTATE;break;case pi.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(s),this.state=se.TOUCH_PAN;break;default:this.state=se.NONE}break;case 2:switch(this.touches.TWO){case pi.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(s),this.state=se.TOUCH_DOLLY_PAN;break;case pi.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(s),this.state=se.TOUCH_DOLLY_ROTATE;break;default:this.state=se.NONE}break;default:this.state=se.NONE}this.state!==se.NONE&&this.dispatchEvent(ka)}function Rg(s){switch(this._trackPointer(s),this.state){case se.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(s),this.update();break;case se.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(s),this.update();break;case se.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(s),this.update();break;case se.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(s),this.update();break;default:this.state=se.NONE}}function Dg(s){this.enabled!==!1&&s.preventDefault()}function Pg(s){s.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Lg(s){s.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}class Ig{constructor(){this.camera=null,this.renderer=null,this.controls=null,this.initialCameraPosition=null,this.initialCameraZoom=null,this.initialControlsTarget=null,this.cameraRotationDirection=0,this.cameraRotationSpeed=Math.PI/135,this.panningKeys={up:!1,down:!1,left:!1,right:!1},this.panSpeed=.5,this._wallFadeRaycaster=null,this._wallFadeDir=null}init(){this.camera=new Ne(60,window.innerWidth/window.innerHeight,.1,1e3);const t=40,e=Math.PI/3,n=t*Math.sin(e),i=t*Math.cos(e);this.camera.position.set(0,n,i),this.camera.lookAt(0,0,0),this.initialCameraPosition=this.camera.position.clone(),this.initialCameraZoom=this.camera.zoom,this.initialControlsTarget=new D(0,0,0),this.renderer=new dg({antialias:!0,alpha:!1}),this.renderer.localClippingEnabled=!0,this.renderer.setSize(window.innerWidth,window.innerHeight),document.body.appendChild(this.renderer.domElement),this._wallFadeRaycaster=new kl,this._wallFadeDir=new D,this.controls=new Mg(this.camera,this.renderer.domElement),this.controls.target.set(0,0,0),this.controls.update(),this.controls.minDistance=6,this.controls.maxDistance=45,this.controls.maxPolarAngle=Math.PI/2-25*Math.PI/180}update(t,e){if(this.controls&&this.controls.update(),this.cameraRotationDirection!==0&&this.controls&&this.controls.enabled){const n=new D().subVectors(this.controls.object.position,this.controls.target),i=new va().setFromVector3(n);i.theta+=this.cameraRotationDirection*this.cameraRotationSpeed,i.makeSafe(),n.setFromSpherical(i),this.controls.object.position.copy(this.controls.target).add(n),this.controls.update()}if(this.panningKeys.up||this.panningKeys.down||this.panningKeys.left||this.panningKeys.right){const n=new D,i=new D;this.camera.getWorldDirection(n),n.y=0,n.normalize(),i.crossVectors(n,new D(0,1,0)),i.normalize();const r=new D;this.panningKeys.up&&r.add(n.clone().multiplyScalar(this.panSpeed)),this.panningKeys.down&&r.add(n.clone().multiplyScalar(-this.panSpeed)),this.panningKeys.left&&r.add(i.clone().multiplyScalar(-this.panSpeed)),this.panningKeys.right&&r.add(i.clone().multiplyScalar(this.panSpeed)),this.camera.position.add(r),this.controls.target.add(r),this.controls.update()}if(e&&this.controls){const n=this.controls.target,i=e.fieldWidth/2,r=e.fieldDepth/2,a=0;n.x=pa.clamp(n.x,-i-a,i+a),n.z=pa.clamp(n.z,-r-a,r+a)}e&&this._updateWallFade(e)}recenterCamera(){this.camera&&this.controls&&(this.camera.position.copy(this.initialCameraPosition),this.camera.zoom=this.initialCameraZoom,this.controls.target.copy(this.initialControlsTarget),this.camera.updateProjectionMatrix(),this.controls.update())}focusCameraOnDisc(t){t&&this.controls&&this.controls.target.copy(t.mesh.position)}setCameraRotation(t){this.cameraRotationDirection=t}setPanningState(t,e){t in this.panningKeys&&(this.panningKeys[t]=e)}onWindowResize(){this.renderer&&this.renderer.setSize(window.innerWidth,window.innerHeight),this.camera&&(this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.updateProjectionMatrix())}_updateWallFade(t){if(!t||!this.camera||!this.controls)return;const e=t.getVisualWalls();if(!e.length)return;this._wallFadeDir.subVectors(this.controls.target,this.camera.position).normalize(),this._wallFadeRaycaster.set(this.camera.position,this._wallFadeDir),this._wallFadeRaycaster.far=this.camera.position.distanceTo(this.controls.target);const n=new Set(this._wallFadeRaycaster.intersectObjects(e).map(d=>d.object)),i=this.camera.position,r=t.fieldWidth/2,a=t.fieldDepth/2,o=8,l=3,c=1.5,h=.6,u=1,f=80;for(const d of e){const g=d.position.x,_=d.position.z;let m=n.has(d)?1:0;if(Math.abs(_-a)<c){const M=i.z-a;m=Math.max(m,Math.max(0,Math.min(1,(M+o)/(o+l))))}if(Math.abs(_+a)<c){const M=-i.z-a;m=Math.max(m,Math.max(0,Math.min(1,(M+o)/(o+l))))}if(Math.abs(g-r)<c){const M=i.x-r;m=Math.max(m,Math.max(0,Math.min(1,(M+o)/(o+l))))}if(Math.abs(g+r)<c){const M=-i.x-r;m=Math.max(m,Math.max(0,Math.min(1,(M+o)/(o+l))))}const p=m>0?h:u,T=Array.isArray(d.material)?d.material:[d.material];for(const M of T)if(M.opacity!==void 0){M.transparent=!0;const x=p-M.opacity;M.opacity+=Math.sign(x)*Math.min(Math.abs(x),f*(1/60)),M.opacity=Math.max(0,Math.min(1,M.opacity))}}}}class Ng{constructor(t){this.gc=t}async update(t){const e=this.gc;for(const i of[...e.discs])if(i.moving){if(i.updatePosition(),e.level&&e.level.hexRings){const o=e.level.getTerrainSlopeForce(i.mesh.position.x,i.mesh.position.z);i.velocity.x+=o.fx,i.velocity.z+=o.fz}if(e.roundWon&&i.type==="player"&&i.kind!=="Orb"&&i.kind!=="HealingOrb"&&i.kind!=="AnimatedDead"&&e.level.checkPortalCollision(i.mesh.position.x,i.mesh.position.z,i.radius))return await e.startNextLevel(i),!0;i.handleWallCollision(e.level.fieldWidth,e.level.fieldDepth,.8),e.level.getAllWalls().forEach(o=>{i.handleCollisionWithBox(o,.8)});for(const o of e.level.obstacles||[]){if(o.type!=="pillar"&&o.type!=="triangle")continue;const l=o.width/2,c=i.mesh.position.x-o.x,h=i.mesh.position.z-o.z,u=Math.sqrt(c*c+h*h),f=i.radius+l;if(u<f&&u>.001){const d=c/u,g=h/u;i.mesh.position.x=o.x+d*f,i.mesh.position.z=o.z+g*f;const _=i.velocity.x*d+i.velocity.z*g;_<0&&(i.velocity.x=(i.velocity.x-2*_*d)*.8,i.velocity.z=(i.velocity.z-2*_*g)*.8)}}if(e.level&&e.level.hexRings){const{RA_in:o}=e.level.hexRings,l=i.mesh.position.x,c=i.mesh.position.z,h=Math.sqrt(l*l+c*c),u=o-i.radius;if(h>u&&h>.001){const f=l/h,d=c/h;i.mesh.position.x=f*u,i.mesh.position.z=d*u;const g=i.velocity.x*f+i.velocity.z*d;g>0&&(i.velocity.x=(i.velocity.x-2*g*f)*.8,i.velocity.z=(i.velocity.z-2*g*d)*.8)}}const a=i.kind==="Wizard"||i.kind==="Necromancer"?.92:.96;i.applyFriction(a)}if(e.level&&e.level.bullseyeRings){const{inner:i,middle:r,outer:a}=e.level.bullseyeRings;for(const o of e.discs){const l=o.mesh.position.x,c=o.mesh.position.z,h=Math.sqrt(l*l+c*c);let u=0;if(h<8?u=i.rotDir*i.speed:h<16?u=r.rotDir*r.speed:h<22&&(u=a.rotDir*a.speed),u===0)continue;const f=u*t,d=Math.cos(f),g=Math.sin(f);if(o.mesh.position.x=l*d+c*g,o.mesh.position.z=-l*g+c*d,o.animatedDeadRing&&(o.animatedDeadRing.position.x=o.mesh.position.x,o.animatedDeadRing.position.z=o.mesh.position.z),o.spotlight&&(o.spotlight.position.x=o.mesh.position.x,o.spotlight.position.z=o.mesh.position.z),o===e.currentDisc&&e.throwDirectionLine&&e.throwDirectionLine.visible){const _=p=>{const T=p.x,M=p.z;p.x=T*d+M*g,p.z=-T*g+M*d};e._prevLineStart&&_(e._prevLineStart),e._prevLineEnd&&_(e._prevLineEnd);const m=e.throwDirectionLine.geometry.attributes.position;m&&(m.setXYZ(0,e._prevLineStart.x,e._prevLineStart.y,e._prevLineStart.z),m.setXYZ(1,e._prevLineEnd.x,e._prevLineEnd.y,e._prevLineEnd.z),m.needsUpdate=!0)}}}if(e.level&&e.level.hexRings)for(const i of e.discs){const r=e.level.getTerrainHeightAt(i.mesh.position.x,i.mesh.position.z);i.mesh.position.y=r+i.basePositionY}const n=[...e.discs];for(let i=0;i<n.length;i++){const r=n[i];for(let a=i+1;a<n.length;a++){const o=n[a];if(r.kind==="Wizard"&&e.wizardController.orbs.includes(o)&&!o.moving||o.kind==="Wizard"&&e.wizardController.orbs.includes(r)&&!r.moving||r.kind==="Necromancer"&&e.necromancerController.animatedDeadDiscs.includes(o)&&!o.moving||o.kind==="Necromancer"&&e.necromancerController.animatedDeadDiscs.includes(r)&&!r.moving)continue;const l=r.kind==="Orb",c=o.kind==="Orb",h=l||r.kind==="HealingOrb",u=c||o.kind==="HealingOrb";if(l&&o.dead||c&&r.dead||h&&u||r.kind==="Orb"&&o.type==="player"||o.kind==="Orb"&&r.type==="player")continue;const f=r.mesh.position.clone().sub(o.mesh.position.clone()),d=f.length(),g=r.radius+o.radius;if(d<g&&d>0){if((r.kind==="HealingOrb"||o.kind==="HealingOrb")&&!r.dead&&!o.dead){const T=r.kind==="HealingOrb"?r:o,M=r.kind==="HealingOrb"?o:r;T.healedDiscs.has(M)||(M.restoreHealth(1),T.healedDiscs.add(M),e.updateDiscNames(),e.uiManager&&e.uiManager.updateCurrentTurnDiscName(e.currentDisc),e.currentDisc&&(r===e.currentDisc||o===e.currentDisc)&&(e.currentDisc.hasCausedDamage=!0));continue}const _=f.clone().divideScalar(d);_.y=0,_.normalize();const p=r.velocity.clone().sub(o.velocity).dot(_);if(p<=0){const T=-2*p/(1/r.mass+1/o.mass);r.velocity.add(_.clone().multiplyScalar(T/r.mass)),o.velocity.sub(_.clone().multiplyScalar(T/o.mass)),r.moving=!0,o.moving=!0;const M=r.mass+o.mass,x=g-d;if(r.mesh.position.add(_.clone().multiplyScalar(x*(o.mass/M))),o.mesh.position.sub(_.clone().multiplyScalar(x*(M===0?0:r.mass/M))),r.hitPoints>0&&o.hitPoints>0&&!r.dead&&!o.dead){if(r.kind==="AnimatedDead"&&!r.dead&&o.type==="NPC"&&!o.dead||o.kind==="AnimatedDead"&&!o.dead&&r.type==="NPC"&&!r.dead){const w=r.kind==="AnimatedDead"?r:o,b=r.kind==="AnimatedDead"?o:r;e.currentDisc===w?(b.takeHit(w.attackDamage,w),b.hitPoints<=0&&!e.npcsKilledForRageCharge.has(b.discName)&&(e.necromancerController.manaEarnedThisTurn+=1,e.npcsKilledForRageCharge.add(b.discName),e.necromancerController.updateActionButtons())):e.currentDisc===b&&w.takeHit(b.attackDamage,b)}else if(e.thrownDisc!==null&&(r.kind==="Orb"&&o.type==="NPC"||o.kind==="Orb"&&r.type==="NPC")){const w=r.kind==="Orb"?r:o,b=r.kind==="Orb"?o:r,A=e.currentDisc;b.takeHit(w.attackDamage,w),b.hitPoints<=0&&!e.npcsKilledForRageCharge.has(b.discName)&&(e.wizardController.manaEarnedThisTurn+=1,e.npcsKilledForRageCharge.add(b.discName),e.barbarianController.updateRageButtonVisibility(),e.wizardController.updateActionButtons()),w.takeHit(999,b),A&&(r===A||o===A)&&(A.hasCausedDamage=!0)}else if(e.thrownDisc!==null&&r===e.currentDisc){if(r.type==="player"&&o.type==="NPC"){if(r.canDoReboundDamage||!e.playerDamagedNPCsThisThrow.has(o.discName)){r.kind==="Barbarian"&&o.type==="NPC"&&o.hitPoints>0&&!o.dead&&e.barbarianController.uniqueNPCHitsThisThrow.add(o.discName);let w=r.attackDamage;if(r.kind==="Barbarian"){const b=e.barbarianController.uniqueNPCHitsThisThrow.size;w=r.rageWasUsedThisThrow?2+b:r.attackDamage+b}o.takeHit(w,r),o.hitPoints<=0&&!e.npcsKilledForRageCharge.has(o.discName)&&(r.kind==="Barbarian"?(e.barbarianController.rageCharges<e.barbarianController.maxRageChargesCap&&e.barbarianController.rageCharges++,r.rageWasUsedThisThrow&&(r.restoreHealth(1),e.updateDiscNames(),e.uiManager&&e.uiManager.updateCurrentTurnDiscName(e.currentDisc))):r.kind==="Wizard"?e.wizardController.manaEarnedThisTurn+=2:r.kind==="Orb"?e.wizardController.manaEarnedThisTurn+=1:r.kind==="Necromancer"&&(e.necromancerController.manaEarnedThisTurn+=2),e.npcsKilledForRageCharge.add(o.discName),e.barbarianController.updateRageButtonVisibility()),r.canDoReboundDamage||e.playerDamagedNPCsThisThrow.add(o.discName)}}else if(!(r.type==="NPC"&&o.type==="NPC")&&!(r.type==="player"&&o.type==="player")&&(!r.hasCausedDamage||r.canDoReboundDamage)){let w=r.attackDamage;if(r.kind==="Barbarian"){const b=e.barbarianController.uniqueNPCHitsThisThrow.size;w=r.rageWasUsedThisThrow?2+b:r.attackDamage+b}o.takeHit(w,r),r.hasCausedDamage=!0,r.type==="NPC"&&r.hitPoints<=0&&!e.npcsKilledForRageCharge.has(r.discName)&&(o.kind==="Wizard"?e.wizardController.manaEarnedThisTurn+=1:o.kind==="Necromancer"&&(e.necromancerController.manaEarnedThisTurn+=1),e.npcsKilledForRageCharge.add(r.discName),e.barbarianController.updateRageButtonVisibility(),e.wizardController.updateActionButtons(),e.necromancerController.updateActionButtons())}}else if(e.thrownDisc!==null&&o===e.currentDisc){if(o.type==="player"&&r.type==="NPC"){if(o.canDoReboundDamage||!e.playerDamagedNPCsThisThrow.has(r.discName)){o.kind==="Barbarian"&&r.type==="NPC"&&r.hitPoints>0&&!r.dead&&e.barbarianController.uniqueNPCHitsThisThrow.add(r.discName);let w=o.attackDamage;if(o.kind==="Barbarian"){const b=e.barbarianController.uniqueNPCHitsThisThrow.size;w=o.rageWasUsedThisThrow?2+b:o.attackDamage+b}r.takeHit(w,o),r.hitPoints<=0&&!e.npcsKilledForRageCharge.has(r.discName)&&(o.kind==="Barbarian"?(e.barbarianController.rageCharges<e.barbarianController.maxRageChargesCap&&e.barbarianController.rageCharges++,o.rageWasUsedThisThrow&&(o.restoreHealth(1),e.updateDiscNames(),e.uiManager&&e.uiManager.updateCurrentTurnDiscName(e.currentDisc))):o.kind==="Wizard"?e.wizardController.manaEarnedThisTurn+=2:o.kind==="Orb"?e.wizardController.manaEarnedThisTurn+=1:o.kind==="Necromancer"&&(e.necromancerController.manaEarnedThisTurn+=2),e.npcsKilledForRageCharge.add(r.discName),e.barbarianController.updateRageButtonVisibility()),o.canDoReboundDamage||e.playerDamagedNPCsThisThrow.add(r.discName)}}else if(!(o.type==="NPC"&&r.type==="NPC")&&!(o.type==="player"&&r.type==="player")&&(!o.hasCausedDamage||o.canDoReboundDamage)){let w=o.attackDamage;if(o.kind==="Barbarian"){const b=e.barbarianController.uniqueNPCHitsThisThrow.size;w=o.rageWasUsedThisThrow?2+b:o.attackDamage+b}r.takeHit(w,o),o.hasCausedDamage=!0,o.type==="NPC"&&o.hitPoints<=0&&!e.npcsKilledForRageCharge.has(o.discName)&&(r.kind==="Wizard"?e.wizardController.manaEarnedThisTurn+=1:r.kind==="Necromancer"&&(e.necromancerController.manaEarnedThisTurn+=1),e.npcsKilledForRageCharge.add(o.discName),e.barbarianController.updateRageButtonVisibility(),e.wizardController.updateActionButtons(),e.necromancerController.updateActionButtons())}}else if(e.thrownDisc!==null&&r.type==="NPC"&&o.type==="NPC"&&e.currentDisc&&e.currentDisc.type==="player"){const w=e.currentDisc;if(w.canDoReboundDamage||!e.playerDamagedNPCsThisThrow.has(r.discName)||!e.playerDamagedNPCsThisThrow.has(o.discName)){let b=w.attackDamage;if(w.kind==="Barbarian"){e.barbarianController.uniqueNPCHitsThisThrow.add(r.discName),e.barbarianController.uniqueNPCHitsThisThrow.add(o.discName);const A=e.barbarianController.uniqueNPCHitsThisThrow.size;b=w.rageWasUsedThisThrow?2+A:w.attackDamage+A}r.takeHit(b,w),o.takeHit(b,w),[r,o].forEach(A=>{A.hitPoints<=0&&!e.npcsKilledForRageCharge.has(A.discName)&&(w.kind==="Barbarian"?(e.barbarianController.rageCharges<e.barbarianController.maxRageChargesCap&&e.barbarianController.rageCharges++,w.rageWasUsedThisThrow&&(w.restoreHealth(1),e.updateDiscNames(),e.uiManager&&e.uiManager.updateCurrentTurnDiscName(e.currentDisc))):w.kind==="Wizard"?e.wizardController.manaEarnedThisTurn+=2:w.kind==="Orb"?e.wizardController.manaEarnedThisTurn+=1:w.kind==="Necromancer"&&(e.necromancerController.manaEarnedThisTurn+=2),e.npcsKilledForRageCharge.add(A.discName))}),e.barbarianController.updateRageButtonVisibility(),w.canDoReboundDamage||(e.playerDamagedNPCsThisThrow.add(r.discName),e.playerDamagedNPCsThisThrow.add(o.discName))}}}}}}}return!1}}class Og extends gn{constructor(t,e,n,i,r,a,o,l){super(1,.4,o,e,n,t,i,"NPC","Skeleton",2,r,"images/skeleton-nobg.png",!1,.5,.8,!1,!1,1,a,l)}}class Ug extends gn{constructor(t,e,n,i,r,a,o,l){super(2.5,.4,o,e,n,t,i,"NPC","Warden",6,r,"images/warden-nobg.png",!1,2,6,!1,!1,2,a,l)}}const ll=[15079755,3978315,16769305,33480,16089648,9510580,15741670,13825340,16432846,32896,14466815,11169320,16775880,8388608,11206595,8421376,16766900,128,8421504];class Fg{constructor(t){this.gc=t}spawn(t=null){const e=this.gc,n=!!(e.level&&e.level.hexRings),i=!!(e.level&&e.level.bullseyeRings),r=(U,N,X=4)=>{let Z=0;for(;Z<100;){const st=(Math.random()-.5)*(e.level.fieldWidth-U*4),ft=(Math.random()-.5)*(e.level.fieldDepth-U*4);if(e.isPositionValid(st,ft,U)){let Rt=!0;for(const Gt of N)if(Math.sqrt((st-Gt.x)**2+(ft-Gt.z)**2)<X){Rt=!1;break}if(Rt)return{x:st,z:ft}}Z++}return null},a=(U,N,X=4)=>{const{RC_in:k,RA_in:Z}=e.level.hexRings,st=k+1.5,ft=Z-2.5;for(let Rt=0;Rt<100;Rt++){const Gt=Math.random()*Math.PI*2,Y=st+Math.random()*(ft-st),et=Math.sin(Gt)*Y,mt=Math.cos(Gt)*Y;if(!e.isPositionValid(et,mt,U))continue;let Q=!1;for(const at of N)if(Math.sqrt((et-at.x)**2+(mt-at.z)**2)<X){Q=!0;break}if(!Q)return{x:et,z:mt}}return null},o=(U,N,X,k,Z=4)=>{for(let st=0;st<100;st++){const ft=Math.random()*Math.PI*2,Rt=U+1.5+Math.random()*(N-U-3),Gt=Math.sin(ft)*Rt,Y=Math.cos(ft)*Rt;if(!e.isPositionValid(Gt,Y,X))continue;let et=!1;for(const mt of k)if(Math.sqrt((Gt-mt.x)**2+(Y-mt.z)**2)<Z){et=!0;break}if(!et)return{x:Gt,z:Y}}return null},l=6.5,c=[],h=U=>{const N=n?a(U,c,5):null;return N&&c.push(N),N},u=n?h(1.25):null,f=n?h(.9):null,d=n?h(1):null,g=i?Math.sin(0)*l:n&&u?u.x:0,_=i?Math.cos(0)*l:n&&u?u.z:0,m=i?Math.sin(2*Math.PI/3)*l:n&&f?f.x:0,p=i?Math.cos(2*Math.PI/3)*l:n&&f?f.z:-3,T=i?Math.sin(-2*Math.PI/3)*l:n&&d?d.x:-3,M=i?Math.cos(-2*Math.PI/3)*l:n&&d?d.z:-3,x=new gn(1.25,.4,35071,g,_,e.scene,"Barbarian","player","Barbarian",5,100,"images/barbarian-nobg.png",!1,1.3,1.5,!1,!1,1,e,e.discDescriptions.Barbarian),w=t==null?void 0:t.find(U=>U.kind==="Barbarian");w&&(x.hitPoints=w.hitPoints,x.maxHitPoints=w.maxHitPoints);const b=new gn(.9,.4,49344,m,p,e.scene,"Wizard","player","Wizard",3,100,"images/wizard-nobg.png",!1,.7,.8,!1,!1,1,e,e.discDescriptions.Wizard),A=t==null?void 0:t.find(U=>U.kind==="Wizard");A&&(b.hitPoints=A.hitPoints,b.maxHitPoints=A.maxHitPoints);const P=new gn(.9,.4,6684876,T,M,e.scene,"Necromancer","player","Necromancer",3,100,"images/necromancer-nobg.png",!1,.7,.8,!1,!1,1,e,e.discDescriptions.Necromancer),E=t==null?void 0:t.find(U=>U.kind==="Necromancer");E&&(P.hitPoints=E.hitPoints,P.maxHitPoints=E.maxHitPoints);const y=[{x:x.mesh.position.x,z:x.mesh.position.z},{x:b.mesh.position.x,z:b.mesh.position.z},{x:P.mesh.position.x,z:P.mesh.position.z}],z=[{name:"Skeleton 1",skillLevel:80,kind:"Skeleton"},{name:"Skeleton 2",skillLevel:80,kind:"Skeleton"},{name:"Skeleton 3",skillLevel:80,kind:"Skeleton"},{name:"Skeleton 4",skillLevel:80,kind:"Skeleton"},{name:"Skeleton 5",skillLevel:80,kind:"Skeleton"},{name:"Skeleton 6",skillLevel:80,kind:"Skeleton"},{name:"Warden 1",skillLevel:85,kind:"Warden"},{name:"Warden 2",skillLevel:85,kind:"Warden"}].map((U,N)=>({...U,color:ll[N%ll.length]})),F=[];let H=0;for(const U of z){let N;i?N=H<4?o(8,16,1.5,y):o(16,22,1.5,y):n?N=a(1.5,y):N=r(1.5,y),H++;const X=N?N.x:(Math.random()-.5)*e.level.fieldWidth*.7,k=N?N.z:(Math.random()-.5)*e.level.fieldDepth*.7,Z=[e.scene,X,k,U.name,U.skillLevel,e,U.color];let st;U.kind==="Skeleton"?st=new Og(...Z,e.discDescriptions.Skeleton):U.kind==="Warden"&&(st=new Ug(...Z,e.discDescriptions.Warden)),st&&F.push(st),y.push({x:X,z:k})}return[x,b,P,...F]}}class di{constructor({centerX:t,centerZ:e,baseRadius:n=5,numVertices:i=20,irregularity:r=.4,yPosition:a=.05,scrollSpeedX:o,scrollSpeedY:l}){this.centerX=t,this.centerZ=e,this.baseRadius=n,this.numVertices=Math.max(3,i),this.irregularity=Math.max(0,Math.min(1,r)),this.yPosition=a,this.relativeVertices2D=[],this.mesh=null,this.lavaTexture=null,this.scrollSpeedX=o!==void 0?o:(Math.random()-.5)*.04+.03,this.scrollSpeedY=l!==void 0?l:(Math.random()-.5)*.04+.02,this._generateShapeVertices(),this._createMesh()}_generateShapeVertices(){this.relativeVertices2D=[];const t=Math.PI*2,e=Math.random()*t,n=Math.random()*t,i=2+Math.random()*3,r=4+Math.random()*4;for(let a=0;a<this.numVertices;a++){const o=a/this.numVertices*t;let l=0;l+=Math.sin(o*i+e)*(this.baseRadius*this.irregularity*.6),l+=Math.sin(o*r+n)*(this.baseRadius*this.irregularity*.4);const c=this.baseRadius+l,h=c*Math.cos(o),u=c*Math.sin(o);this.relativeVertices2D.push({x:h,y:u})}}_createMesh(){if(this.relativeVertices2D.length<3){console.warn("LavaPool: Not enough vertices to create a shape.");return}const t=this.relativeVertices2D.map(o=>new ot(o.x,o.y)),e=new Nl(t),n=new Oa(e),i=new Fa;this.lavaTexture=i.load("images/lava-tile-1.png"),this.lavaTexture.wrapS=ae,this.lavaTexture.wrapT=ae,this.lavaTexture.offset.set(Math.random(),Math.random()),this.lavaTexture.rotation=Math.random()*Math.PI*2;const r=.25;this.lavaTexture.repeat.set(this.baseRadius*r,this.baseRadius*r);const a=new Se({map:this.lavaTexture,emissive:new qt(16729344),emissiveMap:this.lavaTexture,emissiveIntensity:.5,side:ue,transparent:!0,opacity:.95});this.mesh=new Tt(n,a),this.mesh.position.set(this.centerX,this.yPosition,this.centerZ),this.mesh.rotation.x=-Math.PI/2,this.mesh.name="LavaPool"}update(t=.016){this.lavaTexture&&(this.lavaTexture.offset.x+=this.scrollSpeedX*t,this.lavaTexture.offset.y+=this.scrollSpeedY*t)}getMesh(){return this.mesh}isPointInside(t,e){if(!this.relativeVertices2D||this.relativeVertices2D.length<3)return!1;const n=t-this.centerX,i=-(e-this.centerZ);let r=!1,a=this.relativeVertices2D.length-1;for(let o=0;o<this.relativeVertices2D.length;o++){const l=this.relativeVertices2D[o],c=this.relativeVertices2D[a];l.y>i!=c.y>i&&n<(c.x-l.x)*(i-l.y)/(c.y-l.y)+l.x&&(r=!r),a=o}return r}dispose(){this.mesh&&(this.mesh.geometry&&this.mesh.geometry.dispose(),this.mesh.material&&(Array.isArray(this.mesh.material)?this.mesh.material:[this.mesh.material]).forEach(e=>{e.map&&e.map.dispose(),e.emissiveMap&&e.emissiveMap.dispose(),e.dispose()}),this.mesh=null,this.lavaTexture=null),this.relativeVertices2D=[]}}class Bg{constructor(t){this.gc=t}generate(){const t=this.gc;if(!t.level||!t.scene){console.error("Level or scene not initialized. Cannot generate lava pools.");return}for(const a of t.lavaPools)a.getMesh()&&t.scene.remove(a.getMesh());if(t.lavaPools=[],t.level.hexRings){const{LOW_Y:a,MED_Y:o,RC_in:l,RA_in:c}=t.level.hexRings,h=new di({centerX:0,centerZ:0,baseRadius:3.8,numVertices:10,irregularity:.15,yPosition:a+.05});h.getMesh()&&(t.scene.add(h.getMesh()),t.lavaPools.push(h));const u=l+3,f=c-4,d=2+Math.floor(Math.random()*3),g=o+.05;for(let _=0;_<d;_++){let m=!1;for(let p=0;p<80&&!m;p++){const T=Math.random()*Math.PI*2,M=u+Math.random()*(f-u),x=Math.sin(T)*M,w=Math.cos(T)*M,b=1.5+Math.random()*1.5;let A=!1;for(const E of t.lavaPools){const y=x-E.centerX,R=w-E.centerZ;if(Math.sqrt(y*y+R*R)<b+E.baseRadius+3){A=!0;break}}if(A)continue;const P=new di({centerX:x,centerZ:w,baseRadius:b,numVertices:8+Math.floor(Math.random()*4),irregularity:.2+Math.random()*.2,yPosition:g});P.getMesh()&&(t.scene.add(P.getMesh()),t.lavaPools.push(P)),m=!0}}return}if(t.level.donutInnerRadius){const a=t.level.donutInnerRadius,o=t.level.circleRadius,l=new di({centerX:0,centerZ:0,baseRadius:a-.5,numVertices:16,irregularity:.08,yPosition:.05});l.getMesh()&&(t.scene.add(l.getMesh()),t.lavaPools.push(l));const c=2+Math.floor(Math.random()*3);for(let h=0;h<c;h++){let u=!1;for(let f=0;f<80&&!u;f++){const d=Math.random()*Math.PI*2,g=a+2.5+Math.random()*(o-a-5),_=Math.sin(d)*g,m=Math.cos(d)*g,p=1.5+Math.random()*1.5;let T=!1;for(const x of t.lavaPools){const w=_-x.centerX,b=m-x.centerZ;if(Math.sqrt(w*w+b*b)<p+x.baseRadius+3){T=!0;break}}if(T)continue;const M=new di({centerX:_,centerZ:m,baseRadius:p,numVertices:8+Math.floor(Math.random()*4),irregularity:.2+Math.random()*.2,yPosition:.05});M.getMesh()&&(t.scene.add(M.getMesh()),t.lavaPools.push(M)),u=!0}}return}if(t.level.bullseyeRings){const a=new di({centerX:0,centerZ:0,baseRadius:3.5,numVertices:12,irregularity:.15,yPosition:.05});a.getMesh()&&(t.scene.add(a.getMesh()),t.lavaPools.push(a));return}const e=Math.floor(Math.random()*2)+1,n=2,i=4,r=.05;for(let a=0;a<e;a++){const o=this._findValidPlacement(n,i);if(o){const l=new di({centerX:o.x,centerZ:o.z,baseRadius:o.radius,numVertices:12+Math.floor(Math.random()*5),irregularity:.1+Math.random()*.2,yPosition:r});l.getMesh()&&(t.scene.add(l.getMesh()),t.lavaPools.push(l))}else console.warn(`Could not find a valid placement for lava pool ${a+1} after several attempts.`)}}_findValidPlacement(t,e){const n=this.gc;for(let i=0;i<50;i++){const r=t+Math.random()*(e-t),a=r+1,o=(Math.random()-.5)*(n.level.fieldWidth-a*2),l=(Math.random()-.5)*(n.level.fieldDepth-a*2);if(this._isPositionValid(o,l,r))return{x:o,z:l,radius:r}}return null}_isPositionValid(t,e,n){const i=this.gc,r=[{x:t,z:e},{x:t+n,z:e},{x:t-n,z:e},{x:t,z:e+n},{x:t,z:e-n},{x:t+n*.707,z:e+n*.707},{x:t-n*.707,z:e+n*.707},{x:t+n*.707,z:e-n*.707},{x:t-n*.707,z:e-n*.707}];for(const a of r)if(!i.isPositionValid(a.x,a.z,.1))return!1;for(const a of i.discs){if(a.dead)continue;const o=(a.mesh.position.x-t)**2+(a.mesh.position.z-e)**2,l=n+a.radius+.5;if(o<l**2)return!1}for(const a of i.lavaPools){const o=(a.centerX-t)**2+(a.centerZ-e)**2,l=n+a.baseRadius+1;if(o<l**2)return!1}return!0}}let Rr=null;class ql{constructor(){if(Rr)return Rr;Rr=this,this.scene=null,this.camera=null,this.renderer=null,this.controls=null,this.level=null,this.discs=[],this.lavaPools=[],this.currentTurnIndex=0,this._currentDisc=null,this._turnStartBeams=[],this.raycaster=null,this.mouse=new ot,this.controlsEnabled=!0,this.pointerDisc=null,this.uiManager=null,this.inputHandler=null,this.fpsFrameCount=0,this.fpsLastTime=performance.now(),this.fpsLastUpdateTime=performance.now(),this.fpsUpdateInterval=1e3,this.throwDirectionLine=null,this._prevLineStart=null,this._prevLineEnd=null,this.waitingForDiscToStop=!1,this.playerDamagedNPCsThisThrow=new Set,this.npcsKilledForRageCharge=new Set,this.gameOverState={active:!1,playerWon:!1},this.roundWon=!1,this.thrownDisc=null,this.barbarianController=new gg(this),this.wizardController=new _g(this),this.necromancerController=new vg(this),this.cameraController=new Ig,this.physics=new Ng(this),this.discSpawner=new Fg(this),this.lavaManager=new Bg(this),this.discInfoPopupElement=null,this.discInfoNameElement=null,this.discInfoHpElement=null,this.discInfoDescriptionElement=null,this.discInfoPopupSelectedDisc=null,this.discDescriptions={Barbarian:"Deals 2 damage per hit, plus 1 extra per enemy hit on the same throw. Kills grant Rage, boosting base damage and adding rebound damage.",Wizard:"Summon orbs with Mana. Costs 1 Mana per orb. Kills with orbs or bumps earn Mana back. Clearing rooms grants Mana.",Necromancer:"Spend Mana to Animate Dead NPCs (1 mana) — they deal 1 damage and have 1 HP. Raise Dead allies for 2 mana, reviving them at half HP. Earn mana from kills and clearing rooms.",Skeleton:"Just your basic walking skeleton. Does 1 damage per hit.",Warden:"Hard to move, and hard to kill. Hits for 2 base damage.",Orb:"A volatile sphere of magical energy, summoned by the Wizard.",HealingOrb:"A red sphere of restorative energy. Heals 1 HP to every living disc it passes through.",AnimatedDead:"A reanimated corpse under the Necromancer's command. 1 HP, 1 damage."},window.addEventListener("resize",()=>this.onWindowResize()),this.animate=this.animate.bind(this),this.animate()}get currentDisc(){return this._currentDisc}set currentDisc(t){this.discs.forEach(e=>{e.setSpotlightIntensity(e===t)}),this._currentDisc=t,this.uiManager&&(this.uiManager.updateCurrentTurnDiscName(this._currentDisc),this.uiManager.updateDiscNames(this.discs,this._currentDisc))}logCurrentTurn(){}recenterCamera(){this.cameraController.recenterCamera()}focusCameraOnDisc(t){const e=this.discs.find(n=>n.discName===t);e&&this.cameraController.focusCameraOnDisc(e)}init(){this.scene=new Ih,this.cameraController.init(),this.camera=this.cameraController.camera,this.renderer=this.cameraController.renderer,this.controls=this.cameraController.controls,this.currentLevelNumber=1,this.level=new fg(this.scene),this.level.nextShape=this._shapeForLevel(this.currentLevelNumber),this.level.load(),this.discs=[],this.currentTurnIndex=0,this.raycaster=new kl,this.mouse=new ot,this.controlsEnabled=!0,this.pointerDisc=null,this.uiManager=new pg(this.restartGame.bind(this),this.recenterCamera.bind(this),this.focusCameraOnDisc.bind(this)),this.actionButtonsContainer=this.uiManager.getActionButtonsContainer(),this.actionButtonsContainer||console.error("GameController: Action buttons container not found from UIManager.");const t=new Al({color:16777215,linewidth:2}),e=new Float32Array(6),n=new we;n.setAttribute("position",new De(e,3)),n.setDrawRange(0,2),this.throwDirectionLine=new Uh(n,t),this.throwDirectionLine.visible=!1,this.scene.add(this.throwDirectionLine),this.inputHandler=new mg(this.renderer.domElement,this,this.uiManager),this.discInfoPopupElement=document.getElementById("disc-info-popup"),this.discInfoPopupElement?(this.discInfoNameElement=this.discInfoPopupElement.querySelector(".name"),this.discInfoHpElement=this.discInfoPopupElement.querySelector(".hp"),this.discInfoDescriptionElement=this.discInfoPopupElement.querySelector(".description")):console.error("Disc info popup element not found in DOM."),this.lavaManager.generate(),this.initDiscs(),this.barbarianController.init(this.actionButtonsContainer),this.wizardController.init(this.actionButtonsContainer),this.necromancerController.init(this.actionButtonsContainer),this.lavaManager.generate(),this.updateDiscNames()}isPositionValid(t,e,n,i=!1,r=[]){if(!this.level.isPositionValid(t,e,n))return!1;for(const o of this.lavaPools||[]){const l=t-o.centerX,c=e-o.centerZ,h=o.baseRadius+n+.5;if(l*l+c*c<h*h)return!1}if(i&&this.discs)for(const o of this.discs){if(!o||o.dead||o.hitPoints<=0||r.includes(o))continue;const l=t-o.mesh.position.x,c=e-o.mesh.position.z,h=l*l+c*c,u=n+o.radius;if(h<u*u)return!1}return!0}initDiscs(t=null){t||(this.barbarianController.rageCharges=0,this.npcsKilledForRageCharge.clear());const e=this.discSpawner.spawn(t);if(this.discs.push(...e),this.updateAllDiscDeadStates(),this.discs.forEach(n=>{n.setSpotlightIntensity(!1)}),this.currentTurnIndex=this.discs.findIndex(n=>n.type==="player"&&n.kind!=="Orb"&&n.kind!=="HealingOrb"&&n.kind!=="AnimatedDead"&&n.hitPoints>0&&!n.dead),this.currentTurnIndex!==-1)this.currentDisc=this.discs[this.currentTurnIndex],this.logCurrentTurn();else for(let n=0;n<this.discs.length;n++)if(this.discs[n].hitPoints>0&&!this.discs[n].dead){this.currentTurnIndex=n,this.currentDisc=this.discs[n],this.logCurrentTurn();break}this.barbarianController.updateRageButtonVisibility(),this.barbarianController.updateEndTurnButtonVisibility(),this.wizardController.updateActionButtons(),this.wizardController.updateEndTurnButtonVisibility(),this.necromancerController.updateActionButtons(),this.necromancerController.updateEndTurnButtonVisibility(),this.currentDisc&&this.currentDisc.type==="player"&&this._spawnTurnStartBeam(this.currentDisc)}handlePointerHover(t){this.necromancerController.handlePointerHover(t)}handlePointerDownInteraction(t,e){if(this.gameOverState.active)return;this.mouse.x=t.clientX/window.innerWidth*2-1,this.mouse.y=-(t.clientY/window.innerHeight)*2+1,this.raycaster.setFromCamera(this.mouse,this.camera),this.pointerDisc=null;for(const a of this.discs)if(this.raycaster.intersectObject(a.mesh,!0).length>0){this.pointerDisc=a;break}const n=this.currentTurnIndex!==-1&&this.discs.length>this.currentTurnIndex?this.discs[this.currentTurnIndex]:null;let i=!1,r=null;n&&n.type==="player"&&!n.dead?n.kind==="Wizard"?this.pointerDisc&&(this.pointerDisc.kind==="Orb"||this.pointerDisc.kind==="HealingOrb")&&this.wizardController.orbs.includes(this.pointerDisc)&&!this.pointerDisc.dead?(r=this.pointerDisc,i=!0):this.pointerDisc===n?(r=n,this.wizardController.hasMovedThisTurn?i=!1:i=!0):(r=n,i=!1):n.kind==="Necromancer"?this.pointerDisc&&this.pointerDisc.kind==="AnimatedDead"&&this.necromancerController.animatedDeadDiscs.includes(this.pointerDisc)&&!this.pointerDisc.dead&&!this.necromancerController.movedThisTurn.has(this.pointerDisc)?(r=this.pointerDisc,i=!0):this.pointerDisc===n?(r=n,this.necromancerController.hasMovedThisTurn?i=!1:i=!0):(r=n,i=!1):this.pointerDisc===n?(r=n,n.hasThrown?i=!1:i=!0):(r=n,i=!1):(r=n,i=!1),this.currentDisc=r,i&&this.currentDisc&&this.currentDisc.mesh?(this.controlsEnabled=!1,this.controls.enabled=!1,this.uiManager&&this.uiManager.updateThrowInfo("Magnitude: 0 Angle: 0°",!0),this.throwDirectionLine&&(this._prevLineStart=new D(this.currentDisc.mesh.position.x,this.currentDisc.mesh.position.y+this.currentDisc.height/2,this.currentDisc.mesh.position.z),this._prevLineEnd=this._prevLineStart.clone())):(this.controlsEnabled=!0,this.controls.enabled=!0,this.uiManager&&this.uiManager.updateThrowInfo("",!1)),this._updateSpotlights()}handlePointerMoveInteraction(t,e){if(this.gameOverState.active||this.controlsEnabled||!this.currentDisc){this.throwDirectionLine&&(this.throwDirectionLine.visible=!1),this.uiManager&&this.uiManager.updateThrowInfo("",!1);return}const n=t.clientX-e.x,i=t.clientY-e.y,r=Math.sqrt(n*n+i*i);if(r>0){let o=Math.atan2(-i,n)*(180/Math.PI);if(o<0&&(o+=360),this.uiManager&&this.uiManager.updateThrowInfo(`Magnitude: ${r.toFixed(1)} Angle: ${o.toFixed(1)}°`,!0),!this.controlsEnabled&&this.currentDisc&&this.currentDisc.mesh&&this.throwDirectionLine){const l=n/r,c=i/r,h=new D;this.camera.getWorldDirection(h),h.y=0,h.normalize();const u=new D(0,1,0),f=new D;f.crossVectors(h,u).normalize();let d=new D;d.add(f.multiplyScalar(l)),d.add(h.multiplyScalar(-c)),d.normalize(),d.negate();const _=Math.min(r/10,1)*10,m=this.currentDisc.mesh.position.clone(),p=m.clone().add(d.multiplyScalar(_)),T=this.throwDirectionLine.geometry.attributes.position;this._prevLineStart||(this._prevLineStart=new D(m.x,m.y+this.currentDisc.height/2,m.z)),this._prevLineEnd||(this._prevLineEnd=new D(p.x,p.y+this.currentDisc.height/2,p.z)),this._prevLineStart.lerp(new D(m.x,m.y+this.currentDisc.height/2,m.z),.2),this._prevLineEnd.lerp(new D(p.x,p.y+this.currentDisc.height/2,p.z),.2),T.setXYZ(0,this._prevLineStart.x,this._prevLineStart.y,this._prevLineStart.z),T.setXYZ(1,this._prevLineEnd.x,this._prevLineEnd.y,this._prevLineEnd.z),T.needsUpdate=!0,this.throwDirectionLine.visible=!0}}else this.uiManager&&this.uiManager.updateThrowInfo("Magnitude: 0 Angle: 0°",!0),this.throwDirectionLine&&(this.throwDirectionLine.visible=!1)}handlePointerUpInteraction(t,e){if(this.gameOverState.active)return;const n=t.clientX-e.x,i=t.clientY-e.y,r=Math.sqrt(n*n+i*i),a=2,o=this.pointerDisc;if(r<=a){if(this.necromancerController.selectingTarget){this.necromancerController.handleTargetClick(o),this.necromancerController.cancelTargetSelection(),this.throwDirectionLine&&(this.throwDirectionLine.visible=!1),this.controls.enabled=!0,this.controlsEnabled=!0,this.currentDisc=null;return}if(o){this.discInfoPopupSelectedDisc===o?this._hideDiscInfoPopup():this._showDiscInfoPopup(o),this.uiManager&&this.uiManager.updateThrowInfo("",!1),this.throwDirectionLine&&(this.throwDirectionLine.visible=!1),this.controls.enabled=!0,this.controlsEnabled=!0,this.currentDisc=null;return}else if(this.discInfoPopupSelectedDisc&&this.discInfoPopupElement){let l=t.target,c=!1;for(;l!=null;){if(l===this.discInfoPopupElement){c=!0;break}l=l.parentElement}c||this._hideDiscInfoPopup()}}if(this.uiManager&&this.uiManager.updateThrowInfo("",!1),this.throwDirectionLine&&(this.throwDirectionLine.visible=!1),this.controlsEnabled||!this.currentDisc){this.controls.enabled=!0,this.controlsEnabled=!0,this.throwDirectionLine&&(this.throwDirectionLine.visible=!1),this.uiManager&&this.uiManager.updateThrowInfo("",!1);return}if(this.controls.enabled=!0,this.controlsEnabled=!0,!this.waitingForDiscToStop&&this.currentDisc){if(this.currentDisc.dead||this.currentDisc.hasThrown&&this.currentDisc.moving||this.currentDisc.type!=="player")return;const l=t.clientX-e.x,c=t.clientY-e.y,h=Math.sqrt(l*l+c*c),u=this.controls.getDistance(),f=h*u,d=10,g=.004,_=.05;if(f>d){const m=f*g,p=l/h,T=c/h,M=new D;this.camera.getWorldDirection(M),M.y=0,M.normalize();const x=new D(0,1,0),w=new D;w.crossVectors(M,x).normalize();let b=new D;b.add(w.multiplyScalar(p)),b.add(M.multiplyScalar(-T)),b.normalize(),b.negate();const A=b.x,P=b.z;let E=this.currentDisc.throwPowerMultiplier;this.currentDisc.rageIsActiveForNextThrow&&(E*=2.5,this.currentDisc.rageIsActiveForNextThrow=!1,this.currentDisc.kind!=="Orb"?(this.currentDisc.canDoReboundDamage=!0,this.currentDisc.rageWasUsedThisThrow=!0):(this.currentDisc.canDoReboundDamage=!1,this.currentDisc.rageWasUsedThisThrow=!1),this.barbarianController.updateRageButtonVisibility());const y=1;let R=m*E/this.currentDisc.mass;R=Math.min(R,y),R<_&&(R=_),this.currentDisc.kind==="Barbarian"&&this.barbarianController.uniqueNPCHitsThisThrow.clear(),this.currentDisc.velocity.set(A*R,0,P*R),this.currentDisc.moving=!0,this.currentDisc.hasThrown=!0,this.currentDisc.resetDamageState(),this.thrownDisc=this.currentDisc,this.playerDamagedNPCsThisThrow.clear(),this.waitingForDiscToStop=!0}}}setPanningState(t,e){this.cameraController.setPanningState(t,e)}cancelAiming(){this.necromancerController.cancelTargetSelection(),this.pointerDisc=null,this.currentDisc=null,this.controls&&(this.controls.enabled=!0),this.throwDirectionLine&&(this.throwDirectionLine.visible=!1),this.uiManager&&this.uiManager.updateThrowInfo("",!1),this.controlsEnabled=!0}onWindowResize(){this.cameraController.onWindowResize(),this.level&&this.discs.forEach(t=>{t.mesh.position.x=this.clamp(t.mesh.position.x,-this.level.fieldWidth/2+t.radius,this.level.fieldWidth/2-t.radius),t.mesh.position.z=this.clamp(t.mesh.position.z,-this.level.fieldDepth/2+t.radius,this.level.fieldDepth/2-t.radius)})}clamp(t,e,n){return Math.max(e,Math.min(n,t))}updateAllDiscDeadStates(){!this.discs||this.discs.length===0||this.discs.forEach(t=>{t.hitPoints<=0&&!t.dead&&t.die()})}checkGameOverConditions(){if(this.gameOverState.active||!this.discs||this.discs.length===0)return this.gameOverState.active;this.updateAllDiscDeadStates();let t=0,e=0,n=!1,i=!1;if(this.discs.forEach(r=>{r.type==="player"&&r.kind!=="Orb"&&r.kind!=="HealingOrb"&&r.kind!=="AnimatedDead"?(n=!0,r.dead||t++):r.type==="NPC"&&(i=!0,!r.dead&&!r.isAnimatedDead&&e++)}),n&&t===0)return this.triggerGameOver(!1),!0;if(i&&e===0&&t>0&&!this.roundWon){this.roundWon=!0;const r=this.wizardController.getDisc();r&&!r.dead&&(this.wizardController.mana+=2);const a=this.necromancerController.getDisc();a&&!a.dead&&(this.necromancerController.mana+=2,this.uiManager&&this.uiManager.updateCurrentTurnDiscName(this.currentDisc)),this.level&&this.level.openDoor()}return!1}triggerGameOver(t){this.gameOverState.active||(this.gameOverState.active=!0,this.gameOverState.playerWon=t,this.uiManager&&this.uiManager.showGameOver(t))}_shapeForLevel(t){const e=["rect","circle","bullseye","donut"];return e[(t-1)%e.length]}async startNextLevel(t=null){const e=this.discs.filter(r=>r.type==="player"&&r.kind!=="Orb").map(r=>({kind:r.kind,hitPoints:r.hitPoints,maxHitPoints:r.maxHitPoints})),n=this.currentTurnIndex;this.roundWon=!1,this.gameOverState.active=!1,this.gameOverState.playerWon=!1,this.npcsKilledForRageCharge.clear(),this.lavaPools&&this.lavaPools.length>0&&this.lavaPools.forEach(r=>{r.getMesh()&&this.scene.remove(r.getMesh()),r.dispose()}),this.lavaPools=[],this._clearTurnStartBeams(),this.level&&this.level.unload(),this.discs&&this.discs.forEach(r=>r.dispose()),this.discs=[],this.wizardController.onLevelStart(),this.necromancerController.onLevelStart(),this.barbarianController.onLevelStart(),this.level&&(this.currentLevelNumber++,this.level.nextShape=this._shapeForLevel(this.currentLevelNumber),this.level.load()),this.lavaManager.generate(),this.initDiscs(e),this.wizardController.onTurnEnd(),this.necromancerController.onTurnEnd(),this.waitingForDiscToStop=!1,this.thrownDisc=null,this.playerDamagedNPCsThisThrow.clear();let i=!1;if(t){let r=t.kind;r==="HealingOrb"&&(r="Wizard");const a=this.discs.findIndex(o=>o.kind===r&&o.type==="player"&&!o.dead);a!==-1&&(this.currentTurnIndex=a,i=!0)}if(!i){let r=(n+1)%this.discs.length;for(let a=0;a<this.discs.length;a++){const o=(r+a)%this.discs.length,l=this.discs[o];if(l&&l.type==="player"&&l.kind!=="Orb"&&l.kind!=="HealingOrb"&&l.kind!=="AnimatedDead"&&!l.dead){this.currentTurnIndex=o,i=!0;break}}}if(!i){const r=this.discs.findIndex(a=>a.type==="player"&&a.kind!=="Orb"&&a.kind!=="HealingOrb"&&a.kind!=="AnimatedDead"&&!a.dead);this.currentTurnIndex=r!==-1?r:0}this.discs.forEach(r=>{r.type==="player"&&(r.hasThrown=!1)}),this.currentDisc=this.discs[this.currentTurnIndex],this._updateSpotlights(),this.logCurrentTurn(),this.recenterCamera(),this.uiManager&&(this.uiManager.hideGameOver(),this.updateDiscNames(),this.uiManager.updateCurrentTurnDiscName(this.currentDisc),this.barbarianController.updateRageButtonVisibility(),this.barbarianController.updateEndTurnButtonVisibility(),this.wizardController.updateActionButtons(),this.wizardController.updateEndTurnButtonVisibility(),this.necromancerController.updateActionButtons(),this.necromancerController.updateEndTurnButtonVisibility(),this.necromancerController.cancelTargetSelection(),this.necromancerController.hideTargetSelectionPopup())}async restartGame(){if(this.cancelAiming(),this.inputHandler&&this.inputHandler.reset(),this.discs&&this.discs.length>0&&this.discs.forEach(t=>t.dispose()),this.discs=[],this.wizardController.onGameRestart(),this.necromancerController.onGameRestart(),this.barbarianController.onGameRestart(),this.lavaPools&&this.lavaPools.length>0&&this.lavaPools.forEach(t=>{t.getMesh()&&this.scene.remove(t.getMesh()),t.dispose()}),this.lavaPools=[],this._clearTurnStartBeams(),this.level&&this.level.unload(),this.level)this.currentLevelNumber=1,this.level.nextShape=this._shapeForLevel(this.currentLevelNumber),this.level.load();else return;if(this.lavaManager.generate(),this.initDiscs(),this.currentTurnIndex=0,this._currentDisc=null,this.waitingForDiscToStop=!1,this.playerDamagedNPCsThisThrow.clear(),this.npcsKilledForRageCharge.clear(),this.gameOverState.active=!1,this.roundWon=!1,this.panningKeys={up:!1,down:!1,left:!1,right:!1},this.discs.length>0){let t=this.discs.find(e=>e.type==="player");t||(t=this.discs[0]),this.currentTurnIndex=this.discs.indexOf(t),this.currentTurnIndex===-1&&(this.currentTurnIndex=0),this.currentDisc=this.discs[this.currentTurnIndex],this.discs[this.currentTurnIndex].hasThrown=!1,this.currentDisc.type==="NPC"&&await this.aiThrow(this.currentDisc)}this.updateDiscNames(),this._hideDiscInfoPopup(),this.barbarianController.updateRageButtonVisibility(),this.barbarianController.updateEndTurnButtonVisibility(),this.wizardController.updateActionButtons(),this.wizardController.updateEndTurnButtonVisibility(),this.necromancerController.updateActionButtons(),this.necromancerController.updateEndTurnButtonVisibility(),this.necromancerController.cancelTargetSelection(),this.necromancerController.hideTargetSelectionPopup(),this.recenterCamera(),this.controls&&(this.controls.enabled=!0),this.controlsEnabled=!0,this._prevLineStart=null,this._prevLineEnd=null}async animate(){requestAnimationFrame(()=>this.animate()),this.uiManager&&this.uiManager.updateFloatingTexts(this.camera),this.fpsFrameCount++;const t=performance.now(),e=(t-this.fpsLastTime)/1e3;this.fpsLastTime=t;const n=t-this.fpsLastUpdateTime;if(n>=this.fpsUpdateInterval){const r=Math.round(this.fpsFrameCount*1e3/n);this.uiManager&&this.uiManager.updateFPS(r),this.fpsFrameCount=0,this.fpsLastUpdateTime=t}if(this.cameraController.update(e,this.level),this.currentDisc&&(this.currentDisc.mesh.scale.set(1,1,1),this.currentDisc.mesh.position.y=this.currentDisc.basePositionY,[...this.discs].forEach(r=>{if(r.dead)r.mesh.isGroup?r.mesh.children.forEach(a=>{a.material&&(a.material.color&&a.material.color.set(8947848),a.material.opacity=.9,a.material.transparent=!0)}):(r.mesh.material.color.set(8947848),r.mesh.material.opacity=.9,r.mesh.material.transparent=!0);else if(r.mesh.isGroup)r.mesh.children.forEach(a=>{if(a.material){if(r.kind==="AnimatedDead"&&r.initialColor!==void 0){const o=r._animatedDeadColor!==void 0?r._animatedDeadColor:r.initialColor;a.material.color.set(a.material.map?16777215:o)}else a.material.color&&a.material.color.set(a.material.color.getHex());a.material.opacity=.9,a.material.transparent=!0}});else{if(r.kind==="AnimatedDead"&&r.initialColor!==void 0){const a=r._animatedDeadColor!==void 0?r._animatedDeadColor:r.initialColor;r.mesh.material.color.set(a)}else r.mesh.material.color.set(r.mesh.material.color.getHex());r.mesh.material.opacity=.9,r.mesh.material.transparent=!0}})),this.wizardController.update(e),this._updateTurnStartBeams(e),!await this.physics.update(e)&&(this.level&&this.level.update(e),this.lavaPools&&this.lavaPools.length>0&&this.lavaPools.forEach(r=>r.update(e)),this.lavaPools&&this.lavaPools.length>0&&([...this.discs].forEach(r=>{typeof r.isCurrentlyInLavaState>"u"&&(r.isCurrentlyInLavaState=!1);let a=!1;for(const o of this.lavaPools)if(o.isPointInside(r.mesh.position.x,r.mesh.position.z)){if(a=!0,!r.isCurrentlyInLavaState&&(console.log(`${r.discName} fell into lava!`),r.isCurrentlyInLavaState=!0,r.kind!=="Orb"&&r.takeHit(1,null),r.type==="NPC"&&r.hitPoints<=0&&!this.npcsKilledForRageCharge.has(r.discName))){const l=this.currentDisc;l&&l.type==="player"&&(l.kind==="Barbarian"?this.barbarianController.rageCharges<this.barbarianController.maxRageChargesCap&&this.barbarianController.rageCharges++:(l.kind==="Wizard"||l.kind==="Orb")&&this.wizardController.manaEarnedThisTurn++,this.npcsKilledForRageCharge.add(r.discName),this.barbarianController.updateRageButtonVisibility())}break}!a&&r.isCurrentlyInLavaState&&(r.isCurrentlyInLavaState=!1)}),this.updateAllDiscDeadStates(),this.gameOverState.active||this.checkGameOverConditions()),this.renderer&&this.renderer.render(this.scene,this.camera),this.waitingForDiscToStop&&this.thrownDisc)){const r=this.thrownDisc.velocity.length(),a=(this.thrownDisc.kind==="Orb"||this.thrownDisc.kind==="HealingOrb")&&(this.thrownDisc.hitPoints<=0||this.thrownDisc.dead),o=this.thrownDisc.kind==="AnimatedDead"&&(this.thrownDisc.hitPoints<=0||this.thrownDisc.dead);if(r<.01&&!this.thrownDisc.moving||a||o){this.waitingForDiscToStop=!1;const l=this.thrownDisc;this.thrownDisc=null,l.kind==="Wizard"||l.kind==="Orb"||l.kind==="HealingOrb"?await this.wizardController.onDiscStopped(l):l.kind==="Necromancer"||l.kind==="AnimatedDead"?await this.necromancerController.onDiscStopped(l):await this._proceedToNextPlayerTurn()}}}updateDiscNames(){this.uiManager&&this.uiManager.updateDiscNames(this.discs,this.currentDisc)}async _proceedToNextPlayerTurn(){if(this.checkGameOverConditions())return;this.wizardController.onTurnEnd(),this.necromancerController.onTurnEnd(),this.barbarianController.onTurnEnd(),this.currentTurnIndex!==-1&&this.discs[this.currentTurnIndex]&&(this.currentDisc=this.discs[this.currentTurnIndex],this.currentDisc.mesh.isGroup?this.currentDisc.mesh.children.forEach(n=>{n.material&&n.material.emissive&&n.material.emissive.set(0)}):this.currentDisc.mesh&&this.currentDisc.mesh.material&&this.currentDisc.mesh.material.emissive.set(0));let t=!1,e=this.currentTurnIndex;for(let n=0;n<this.discs.length;n++){e=(this.currentTurnIndex+1+n)%this.discs.length;const i=this.discs[e];if(!(i.type!=="player"&&i.type!=="NPC")&&!(i.kind==="Orb"||i.kind==="HealingOrb")&&i.kind!=="AnimatedDead"&&i.hitPoints>0&&!i.dead){t=!0;break}}if(!t){const n=this.discs.find(i=>i.type==="player"&&i.kind!=="Orb"&&i.kind!=="HealingOrb"&&i.kind!=="AnimatedDead"&&!i.dead);if(n)this.currentDisc=n,this.currentTurnIndex=this.discs.indexOf(n);else{const i=this.discs.find(r=>r.type==="NPC"&&!r.dead);if(i)this.currentDisc=i,this.currentTurnIndex=this.discs.indexOf(i);else{this.currentDisc=null,this.currentTurnIndex=-1,this.logCurrentTurn(),this._updateSpotlights(),this.barbarianController.updateRageButtonVisibility(),this.wizardController.updateActionButtons();return}}}if(this.discs[e].hasThrown=!1,this.currentTurnIndex=e,this.currentDisc=this.discs[this.currentTurnIndex],this.currentDisc&&this.currentDisc.kind==="Wizard"&&!this.currentDisc.dead&&this.wizardController.applyEarnedMana(),this.currentDisc&&this.currentDisc.kind==="Necromancer"&&!this.currentDisc.dead&&this.necromancerController.applyEarnedMana(),this._applyStartOfTurnLavaDamage(this.currentDisc),this.currentDisc&&this.currentDisc.dead&&!this.gameOverState.active){await this._proceedToNextPlayerTurn();return}this.logCurrentTurn(),this._updateSpotlights(),this.barbarianController.updateRageButtonVisibility(),this.barbarianController.updateEndTurnButtonVisibility(),this.wizardController.updateActionButtons(),this.wizardController.updateEndTurnButtonVisibility(),this.necromancerController.updateActionButtons(),this.necromancerController.updateEndTurnButtonVisibility(),this._updateSpotlights(),this.currentDisc&&this.currentDisc.type==="player"&&this.currentDisc.kind!=="Orb"&&this.currentDisc.kind!=="HealingOrb"&&this.currentDisc.kind!=="AnimatedDead"&&this._spawnTurnStartBeam(this.currentDisc),this.currentDisc&&this.currentDisc.type==="NPC"&&!this.currentDisc.dead&&await this.aiThrow(this.currentDisc)}_spawnTurnStartBeam(t){if(!t||!t.mesh||!this.scene)return;const e=200,n=new pn(1,1,e,16,1,!0),i=new Ze({color:t.initialColor,transparent:!0,opacity:.18,side:be,depthWrite:!1}),r=new Tt(n,i);r.position.set(t.mesh.position.x,e*1.5,t.mesh.position.z),this.scene.add(r),this._turnStartBeams.push({mesh:r,geo:n,mat:i,elapsed:0})}_updateTurnStartBeams(t){for(let l=this._turnStartBeams.length-1;l>=0;l--){const c=this._turnStartBeams[l];if(c.elapsed+=t,c.elapsed<.25){const h=c.elapsed/.25;c.mesh.position.y=200+-100*h,c.mat.opacity=.33}else{c.mesh.position.y=100;const h=(c.elapsed-.25)/.33;c.mat.opacity=.33*Math.max(0,1-h)}c.elapsed>=.25+.33&&(this.scene.remove(c.mesh),c.geo.dispose(),c.mat.dispose(),this._turnStartBeams.splice(l,1))}}_clearTurnStartBeams(){for(const t of this._turnStartBeams)this.scene.remove(t.mesh),t.geo.dispose(),t.mat.dispose();this._turnStartBeams=[]}_showDiscInfoPopup(t){if(!this.discInfoPopupElement||!t)return;this.discInfoNameElement.innerText=t.discName;const e=Number(t.hitPoints)||0,n=Number(t.maxHitPoints)||0,i=e>0?"❤️".repeat(e):"",r=n>e?"🩶".repeat(n-e):"";this.discInfoHpElement.innerText=i+r,this.discInfoDescriptionElement.innerText=t.description||"No description available.",this.discInfoPopupElement.className="popup",t.type&&this.discInfoPopupElement.classList.add(t.type.toLowerCase()),this.discInfoPopupElement.classList.add(t.dead?"dead":"alive"),this.discInfoPopupElement.classList.remove("element-hidden"),this.discInfoPopupSelectedDisc=t}_hideDiscInfoPopup(){this.discInfoPopupElement&&(this.discInfoPopupElement.classList.add("element-hidden"),this.discInfoPopupSelectedDisc=null)}_updateSpotlights(){!this.discs||this.discs.length===0||this.discs.forEach(t=>{const e=t===this.currentDisc&&!t.dead;t.setSpotlightIntensity(e)})}async aiThrow(t){if(!t||t.dead)return;const e=this.discs.filter(_=>_.type==="player"&&_.hitPoints>0&&!_.dead);if(e.length===0)return;let n=e[0],i=t.mesh.position.distanceTo(n.mesh.position);for(let _=1;_<e.length;_++){const m=t.mesh.position.distanceTo(e[_].mesh.position);m<i&&(i=m,n=e[_])}const r=n.mesh.position.clone().sub(t.mesh.position);r.y=0,r.normalize();const a=(_,m)=>{const p=this.level.getAllWalls();for(const T of p){const M=new Zn().setFromObject(T),x=m.clone().sub(_).normalize(),w=_.distanceTo(m),b=Math.ceil(w*10);for(let A=0;A<=b;A++){const P=_.clone().add(x.clone().multiplyScalar(w/b*A));if(M.containsPoint(P))return!0}}return!1},o=999,l=15,c=(100-t.skillLevel)/100;t.kind==="Barbarian"&&this.barbarianController.uniqueNPCHitsThisThrow.clear();let h=r,u=Math.min(i/10,1)*(.7+.3*(t.skillLevel/100)),f=0,d=!1;for(let _=0;_<o;_++){f=(Math.random()*2-1)*c*l*(Math.PI/180);const m=new _n;m.setFromAxisAngle(new D(0,1,0),f);const p=r.clone().applyQuaternion(m).normalize(),T=t.mesh.position.clone().add(p.clone().multiplyScalar(u*10));if(!a(t.mesh.position.clone(),T)){h=p,d=!0;break}}if(!d){const _=new _n;_.setFromAxisAngle(new D(0,1,0),f),h=r.clone().applyQuaternion(_).normalize()}const g=u*t.throwPowerMultiplier/t.mass;t.velocity.set(h.x*g,0,h.z*g),t.moving=!0,t.hasThrown=!0,t.resetDamageState(),this.thrownDisc=t,this.waitingForDiscToStop=!0}setCameraRotation(t){this.cameraController.setCameraRotation(t)}_applyStartOfTurnLavaDamage(t){if(!(!t||!this.lavaPools||this.lavaPools.length===0||t.kind==="Orb"||t.kind==="HealingOrb")){for(const e of this.lavaPools)if(e.isPointInside(t.mesh.position.x,t.mesh.position.z)){if(console.log(`${t.discName} is starting turn in lava, takes 1 damage.`),t.takeHit(1,null),t.type==="NPC"&&t.hitPoints<=0&&!this.npcsKilledForRageCharge.has(t.discName)){const n=this.currentDisc;n&&n.type==="player"&&(n.kind==="Barbarian"?this.barbarianController.rageCharges<this.barbarianController.maxRageChargesCap&&this.barbarianController.rageCharges++:(n.kind==="Wizard"||n.kind==="Orb")&&this.wizardController.manaEarnedThisTurn++,this.npcsKilledForRageCharge.add(t.discName),this.barbarianController.updateRageButtonVisibility())}this.updateAllDiscDeadStates(),this.gameOverState.active||this.checkGameOverConditions();break}}}}window.gameController=window.gameController||new ql;window.gameController.init();new ql;
