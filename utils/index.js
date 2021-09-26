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

export const isPointInPolygon = (point, pts) => {
	var N = pts.length; //pts [{latitude:xxx,longitude:xxx},{latitude:xxx,longitude:xxx}]
	var boundOrVertex = true; //如果点位于多边形的顶点或边上，也算做点在多边形内，直接返回true
	var intersectCount = 0; //cross points count of x
	var precision = 2e-10; //浮点类型计算时候与0比较时候的容差
	var p1, p2; //neighbour bound vertices
	var p = point; //point {latitude:xxx,longitude:xxx}

	p1 = pts[0]; //left vertex
	for (var i = 1; i <= N; ++i) { //check all rays
		if ((p.latitude == p1.latitude) && (p.longitude == p1.longitude)) {
			return boundOrVertex; //p is an vertex
		}
		p2 = pts[i % N]; //right vertex
		if (p.latitude < Math.min(p1.latitude, p2.latitude) || p.latitude > Math.max(p1.latitude, p2
			.latitude)) { //ray is outside of our interests
			p1 = p2;
			continue; //next ray left point
		}
		if (p.latitude > Math.min(p1.latitude, p2.latitude) && p.latitude < Math.max(p1.latitude, p2
			.latitude)) { //ray is crossing over by the algorithm (common part of)
			if (p.longitude <= Math.max(p1.longitude, p2.longitude)) { //x is before of ray
				if (p1.latitude == p2.latitude && p.longitude >= Math.min(p1.longitude, p2.longitude)) { //overlies on a horizontal ray
					return boundOrVertex;
				}
				if (p1.longitude == p2.longitude) { //ray is vertical
					if (p1.longitude == p.longitude) { //overlies on a vertical ray
						return boundOrVertex;
					} else { //before ray
						++intersectCount;
					}
				} else { //cross point on the left side
					var xinters = (p.latitude - p1.latitude) * (p2.longitude - p1.longitude) / (p2.latitude - p1.latitude) + p1
					.longitude; //cross point of longitude
					if (Math.abs(p.longitude - xinters) < precision) { //overlies on a ray
						return boundOrVertex;
					}
					if (p.longitude < xinters) { //before ray
						++intersectCount;
					}
				}
			}
		} else { //special case when ray is crossing through the vertex
			if (p.latitude == p2.latitude && p.longitude <= p2.longitude) { //p crossing over p2
				var p3 = pts[(i + 1) % N]; //next vertex
				if (p.latitude >= Math.min(p1.latitude, p3.latitude) && p.latitude <= Math.max(p1.latitude, p3
					.latitude)) { //p.latitude lies between p1.latitude & p3.latitude
					++intersectCount;
				} else {
					intersectCount += 2;
				}
			}
		}
		p1 = p2; //next ray left point
	}
	if (intersectCount % 2 == 0) { //偶数在多边形外
		return false;
	} else { //奇数在多边形内
		return true;
	}
}
