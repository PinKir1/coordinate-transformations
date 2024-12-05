const CoordinateUtils = {
    polarToCartesian: (r, theta) => ({
        x: r * Math.cos(theta),
        y: r * Math.sin(theta),
    }),

    cartesianToPolar: (x, y) => ({
        r: Math.sqrt(x ** 2 + y ** 2),
        theta: Math.atan2(y, x),
    }),

    sphericalToCartesian: (r, theta, phi) => ({
        x: r * Math.sin(phi) * Math.cos(theta),
        y: r * Math.sin(phi) * Math.sin(theta),
        z: r * Math.cos(phi),
    }),

    cartesianToSpherical: (x, y, z) => {
        const r = Math.sqrt(x ** 2 + y ** 2 + z ** 2);
        return {
            r,
            theta: Math.atan2(y, x),
            phi: Math.acos(z / r),
        };
    },

    distanceCartesian2D: (x1, y1, x2, y2) =>
        Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2),

    distanceCartesian3D: (x1, y1, z1, x2, y2, z2) =>
        Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2 + (z2 - z1) ** 2),

    distancePolar: (r1, theta1, r2, theta2) =>
        Math.sqrt(r1 ** 2 + r2 ** 2 - 2 * r1 * r2 * Math.cos(theta2 - theta1)),

    distanceSpherical: (r1, theta1, phi1, r2, theta2, phi2) =>
        Math.sqrt(
            r1 ** 2 +
            r2 ** 2 -
            2 * r1 * r2 *
                (Math.sin(phi1) * Math.sin(phi2) * Math.cos(theta1 - theta2) +
                    Math.cos(phi1) * Math.cos(phi2))
        ),

    greatCircleDistance: (radius, theta1, phi1, theta2, phi2) =>
        radius *
        Math.acos(
            Math.sin(phi1) * Math.sin(phi2) +
                Math.cos(phi1) * Math.cos(phi2) * Math.cos(theta1 - theta2)
        ),
};

module.exports = CoordinateUtils;
