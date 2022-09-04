/**
 * @file Домашка по FP ч. 1
 *
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */
import {allPass, anyPass, compose, converge, equals, filter, length, lt, lte, not, prop, values} from "ramda";


const getTriangle = prop('triangle');
const getCircle = prop('circle');
const getStar = prop('star');
const getSquare = prop('square');

const isWhite = equals('white');
const isRed = equals('red');
const isGreen = equals('green');
const isBlue = equals('blue');
const isOrange = equals('orange');

const isWhiteTriangle = compose(isWhite, getTriangle);
const isWhiteCircle = compose(isWhite, getCircle);
const isRedStar = compose(isRed, getStar);
const isGreenSquare = compose(isGreen, getSquare);

const isBlueCircle = compose(isBlue, getCircle);
const isOrangeSquare = compose(isOrange, getSquare);

const filterGreen = filter(isGreen);
const filterRed = filter(isRed);
const filterBlue = filter(isBlue);
const filterOrange = filter(isOrange);

const getGreenCount = compose(length, filterGreen, values)

const getRedCount = compose(length, filterRed, values);
const getBlueCount = compose(length, filterBlue, values)
const getOrangeCount = compose(length, filterOrange, values);

const isTwoGreen = compose(equals(2), getGreenCount);

const isGreenTriangle = compose(isGreen, getTriangle);

const isOneRed = compose(equals(1), getRedCount);

const isNotWhite = compose(not, isWhite);

const isNotWhiteTriangle = compose(isNotWhite, getTriangle);

const isNotWhiteSquare = compose(isNotWhite, getSquare);

const triangleSquareColorEquals = converge(equals, [getTriangle, getSquare]);


// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = ({star, square, triangle, circle}) => {
    return allPass([
        isWhiteTriangle,
        isWhiteCircle,
        isRedStar,
        isGreenSquare
    ])({star, square, triangle, circle});
};

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = (figure) => compose(lte(2), getGreenCount)(figure);

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = (figure) => converge(equals, [getRedCount, getBlueCount])(figure);

// 4. Синий круг, красная звезда, оранжевый квадрат треугольник любого цвета
export const validateFieldN4 = (figure) => allPass([
    isBlueCircle,
    isRedStar,
    isOrangeSquare,
])(figure);

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = (figure) => anyPass([
    compose(lt(2), getGreenCount),
    compose(lt(2), getRedCount),
    compose(lt(2), getBlueCount),
    compose(lt(2), getOrangeCount),
])(figure);

// 6. Ровно две зеленые фигуры (одна из зелёных – это треугольник), плюс одна красная. Четвёртая оставшаяся любого доступного цвета, но не нарушающая первые два условия
export const validateFieldN6 = (figure) => allPass([
    isOneRed,
    isGreenTriangle,
    isTwoGreen
])(figure);

// 7. Все фигуры оранжевые.
export const validateFieldN7 = (figure) => compose(equals(4), getOrangeCount)(figure);

// 8. Не красная и не белая звезда, остальные – любого цвета.
export const validateFieldN8 = () => compose(not, anyPass([isWhite, isRed]), getStar);

// 9. Все фигуры зеленые.
export const validateFieldN9 = (figure) => compose(equals(4), getGreenCount)(figure);

// 10. Треугольник и квадрат одного цвета (не белого), остальные – любого цвета
export const validateFieldN10 = (figure) => allPass([
    triangleSquareColorEquals,
    isNotWhiteTriangle,
    isNotWhiteSquare
])(figure);
