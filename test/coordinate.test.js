const {
    polarToCartesian,
    cartesianToPolar,
    sphericalToCartesian,
    cartesianToSpherical,
} = require('../src/coordinate_conversion');

const verifyConversion = {
    twoD: (r, theta) => {
        const cartesian = polarToCartesian(r, theta);
        const polar = cartesianToPolar(cartesian.x, cartesian.y);

        console.log(
            `Начальные координаты (полярные): Радиус = ${r.toFixed(2)}, Угол = ${theta.toFixed(2)} радиан`
        );
        console.log(
            `Преобразовано в декартовые координаты: x = ${cartesian.x.toFixed(2)}, y = ${cartesian.y.toFixed(2)}`
        );
        console.log(
            `Обратно в полярные: Радиус = ${polar.r.toFixed(2)}, Угол = ${polar.theta.toFixed(2)} радиан`
        );
        console.log('---');
    },

    threeD: (r, theta, phi) => {
        const cartesian = sphericalToCartesian(r, theta, phi);
        const spherical = cartesianToSpherical(cartesian.x, cartesian.y, cartesian.z);

        console.log(
            `Начальные координаты (сферические): Радиус = ${r.toFixed(2)}, Угол1 = ${theta.toFixed(2)}, Угол2 = ${phi.toFixed(2)}`
        );
        console.log(
            `Преобразовано в декартовые координаты: x = ${cartesian.x.toFixed(2)}, y = ${cartesian.y.toFixed(2)}, z = ${cartesian.z.toFixed(2)}`
        );
        console.log(
            `Обратно в сферические: Радиус = ${spherical.r.toFixed(2)}, Угол1 = ${spherical.theta.toFixed(2)}, Угол2 = ${spherical.phi.toFixed(2)}`
        );
        console.log('---');
    },
};

verifyConversion.twoD(10, Math.PI / 4);
verifyConversion.twoD(15, Math.PI / 6);

verifyConversion.threeD(10, Math.PI / 3, Math.PI / 4);
verifyConversion.threeD(15, Math.PI / 6, Math.PI / 3);
