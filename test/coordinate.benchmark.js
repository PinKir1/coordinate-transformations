const {
    polarToCartesian,
    sphericalToCartesian,
    distanceCartesian2D,
    distanceCartesian3D,
    distancePolar,
    distanceSpherical,
    greatCircleDistance,
} = require('../src/coordinate_conversion');

function generateRandomPolarPoints(n) {
    return Array.from({ length: n }, () => ({
        r: Math.random() * 100,
        theta: Math.random() * 2 * Math.PI,
    }));
}

function generateRandomSphericalPoints(n) {
    return Array.from({ length: n }, () => ({
        r: Math.random() * 100,
        theta: Math.random() * 2 * Math.PI,
        phi: Math.random() * Math.PI,
    }));
}

function benchmarkDistances(n) {
    console.log(`Запуск бенчмарка для ${n} точек...`);

    const polarPoints = generateRandomPolarPoints(n);
    const sphericalPoints = generateRandomSphericalPoints(n);

    // Бенчмарк расстояний в полярной системе
    console.time('Полярные координаты (расстояние)');
    for (let i = 0; i < n - 1; i++) {
        distancePolar(
            polarPoints[i].r,
            polarPoints[i].theta,
            polarPoints[i + 1].r,
            polarPoints[i + 1].theta
        );
    }
    console.timeEnd('Полярные координаты (расстояние)');

    // Бенчмарк расстояний в декартовой системе (2D)
    console.time('Декартовые координаты 2D (расстояние)');
    for (let i = 0; i < n - 1; i++) {
        const p1 = polarToCartesian(polarPoints[i].r, polarPoints[i].theta);
        const p2 = polarToCartesian(polarPoints[i + 1].r, polarPoints[i + 1].theta);
        distanceCartesian2D(p1.x, p1.y, p2.x, p2.y);
    }
    console.timeEnd('Декартовые координаты 2D (расстояние)');

    // Бенчмарк расстояний в сферической системе
    console.time('Сферические координаты (расстояние)');
    for (let i = 0; i < n - 1; i++) {
        distanceSpherical(
            sphericalPoints[i].r,
            sphericalPoints[i].theta,
            sphericalPoints[i].phi,
            sphericalPoints[i + 1].r,
            sphericalPoints[i + 1].theta,
            sphericalPoints[i + 1].phi
        );
    }
    console.timeEnd('Сферические координаты (расстояние)');

    // Бенчмарк расстояний по великой окружности
    console.time('Великая окружность');
    const radius = 6371; // Радиус Земли в километрах
    for (let i = 0; i < n - 1; i++) {
        greatCircleDistance(
            radius,
            sphericalPoints[i].theta,
            sphericalPoints[i].phi,
            sphericalPoints[i + 1].theta,
            sphericalPoints[i + 1].phi
        );
    }
    console.timeEnd('Великая окружность');

    // Бенчмарк расстояний в декартовой системе (3D)
    console.time('Декартовые координаты 3D (расстояние)');
    for (let i = 0; i < n - 1; i++) {
        const p1 = sphericalToCartesian(
            sphericalPoints[i].r,
            sphericalPoints[i].theta,
            sphericalPoints[i].phi
        );
        const p2 = sphericalToCartesian(
            sphericalPoints[i + 1].r,
            sphericalPoints[i + 1].theta,
            sphericalPoints[i + 1].phi
        );
        distanceCartesian3D(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z);
    }
    console.timeEnd('Декартовые координаты 3D (расстояние)');

    console.log('Бенчмарк завершён!');
}

const n = 10000; // Количество точек для тестирования
benchmarkDistances(n);
