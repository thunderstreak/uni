import area from '@/static/data/area.js'

// Create polygons points
export const createPolygons = (str = '') => {
  const ps = str.split(',')
  const points = []
  const idx = ps.length / 2
  for (let i = 0; i < idx; i++) {
    const [longitude, latitude] = ps.splice(0, 2)
    points.push({
      latitude: +latitude,
      longitude: +longitude
    })
  }
  return points
}

// Create all administrative areas
export const createAllAreas = () => {
  return area.map(x => {
    const boundary = createPolygons(x.boundary)
    const centerPoint = getCenterPoint(boundary)
    console.log(centerPoint)
    return {
      name: x.name,
      boundary,
			centerPoint
    }
  })
}

// Checks whether the point is within the specified target
export const isPointInPolygon = (point, pts) => {
  const N = pts.length; //pts [{latitude:xxx,longitude:xxx},{latitude:xxx,longitude:xxx}]
  const boundOrVertex = true; //如果点位于多边形的顶点或边上，也算做点在多边形内，直接返回true
  let intersectCount = 0; //cross points count of x
  const precision = 2e-10; //浮点类型计算时候与0比较时候的容差
  let p1, p2; //neighbour bound vertices
  const p = point; //point {latitude:xxx,longitude:xxx}

  p1 = pts[0]; //left vertex
  for (let i = 1; i <= N; ++i) { //check all rays
    if ((p.latitude === p1.latitude) && (p.longitude === p1.longitude)) {
      return boundOrVertex; //p is an vertex
    }
    p2 = pts[i % N]; //right vertex
    if (p.latitude < Math.min(p1.latitude, p2.latitude) || p.latitude > Math.max(p1.latitude, p2.latitude)) { //ray is outside of our interests
      p1 = p2;
      continue; //next ray left point
    }
    if (p.latitude > Math.min(p1.latitude, p2.latitude) && p.latitude < Math.max(p1.latitude, p2.latitude)) { //ray is crossing over by the algorithm (common part of)
      if (p.longitude <= Math.max(p1.longitude, p2.longitude)) { //x is before of ray
        if (p1.latitude === p2.latitude && p.longitude >= Math.min(p1.longitude, p2.longitude)) { //overlies on a horizontal ray
          return boundOrVertex;
        }
        if (p1.longitude === p2.longitude) { //ray is vertical
          if (p1.longitude === p.longitude) { //overlies on a vertical ray
            return boundOrVertex;
          } else { //before ray
            ++intersectCount;
          }
        } else { //cross point on the left side
          const xinters = (p.latitude - p1.latitude) * (p2.longitude - p1.longitude) / (p2.latitude - p1.latitude) + p1.longitude; //cross point of longitude
          if (Math.abs(p.longitude - xinters) < precision) { //overlies on a ray
            return boundOrVertex;
          }
          if (p.longitude < xinters) { //before ray
            ++intersectCount;
          }
        }
      }
    } else { //special case when ray is crossing through the vertex
      if (p.latitude === p2.latitude && p.longitude <= p2.longitude) { //p crossing over p2
        const p3 = pts[(i + 1) % N]; //next vertex
        if (p.latitude >= Math.min(p1.latitude, p3.latitude) && p.latitude <= Math.max(p1.latitude, p3.latitude)) { //p.latitude lies between p1.latitude & p3.latitude
          ++intersectCount;
        } else {
          intersectCount += 2;
        }
      }
    }
    p1 = p2; //next ray left point
  }
  if (intersectCount % 2 === 0) { //偶数在多边形外
    return false;
  } else { //奇数在多边形内
    return true;
  }
}

// Computing center points
export const calcCenterPoint = (longitude, latitude) => {

  const xarr = longitude.split(',');
  const yarr = latitude.split(',');
  const poly = [];
  for (let i = 0; i < xarr.length; i++) {
    const pu = {
      x: parseFloat(xarr[i]),
      y: parseFloat(yarr[i]),
      z: 0
    };
    poly.push(pu);
  }

  //console.log(JSON.stringify(pointArray));
  const sortedLongitudeArray = poly.map(item => item.x).sort(); //首先对经度进行排序，红色部分是array中经度的名称
  const sortedLatitudeArray = poly.map(item => item.y).sort(); //对纬度进行排序，红色部分是array中纬度的名称
  const centerLongitude = ((parseFloat(sortedLongitudeArray[0]) + parseFloat(sortedLongitudeArray[
  sortedLongitudeArray.length - 1])) / 2).toFixed(14);
  const centerLatitude = ((parseFloat(sortedLatitudeArray[0]) + parseFloat(sortedLatitudeArray[sortedLatitudeArray.length - 1])) / 2).toFixed(14);

  //如果经纬度在array中不是数字类型，需要转化为数字类型进行计算，如果是可以去掉parseFloat处理
  //console.log(centerLongitude+"---"+centerLatitude);

  // var sz=[centerLongitude,centerLatitude];
  return {
    x: centerLongitude,
    y: centerLatitude
  };
}


/**
 * 地点坐标计算中心点
 * @param geoCoordinateList {Array<Array<Object>>} [[{lat, lng}]]
 * @return { Object } {lat lng}
 */
export const getCenterPoint = (geoCoordinateList) => {
  const geoCoordinateListFlat = geoCoordinateList
  // .reduce((s, v) => {
  //   return (s = s.concat(v))
  // }, [])
  const total = geoCoordinateListFlat.length
  let X = 0
  let Y = 0
  let Z = 0
  for (const g of geoCoordinateListFlat) {
    const lat = g.lat * Math.PI / 180
    const lon = g.lng * Math.PI / 180
    const x = Math.cos(lat) * Math.cos(lon)
    const y = Math.cos(lat) * Math.sin(lon)
    const z = Math.sin(lat)
    X += x
    Y += y
    Z += z
  }

  X = X / total
  Y = Y / total
  Z = Z / total
  const Lon = Math.atan2(Y, X)
  const Hyp = Math.sqrt(X * X + Y * Y)
  const Lat = Math.atan2(Z, Hyp)

  return { lng: Lon * 180 / Math.PI, lat: Lat * 180 / Math.PI }
}
