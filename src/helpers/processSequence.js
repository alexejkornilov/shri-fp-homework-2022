/**
 * @file Домашка по FP ч. 2
 *
 * Подсказки:
 * Метод get у инстанса Api – каррированый
 * GET / https://animals.tech/{id}
 *
 * GET / https://api.tech/numbers/base
 * params:
 * – number [Int] – число
 * – from [Int] – из какой системы счисления
 * – to [Int] – в какую систему счисления
 *
 * Иногда промисы от API будут приходить в состояние rejected, (прямо как и API в реальной жизни)
 * Ответ будет приходить в поле {result}
 */
import Api from '../tools/api';
import {
    allPass,
    andThen,
    compose,
    concat,
    gt,
    ifElse,
    length,
    lt,
    modulo,
    otherwise,
    prop,
    tap,
    test,
    toString
} from "ramda";
import {round} from "lodash";

const api = new Api();



const lessTenSymbol = compose(gt(10), length);

const moreTwoSymbol = compose(lt(1), length);

const isPositiveValue = compose(lt(0), parseFloat);

const roundUpToNumber = compose(round, parseFloat);

const getNumbersBaseApi = api.get('https://api.tech/numbers/base');
const getBinaryData = (number) => getNumbersBaseApi({from: 10, to: 2, number})

const getResult = prop('result');

const validateSting = allPass([
    test(/^\d+(\.\d+)?$/),
    isPositiveValue,
    moreTwoSymbol,
    lessTenSymbol
])
const numberToSquare = (number) => Math.pow(number, 2);

const getModThree = (number) => modulo(number, 3);

const createAnimalUrl = concat('https://animals.tech/');
const getAnimalData = (url) => api.get(url, {});

const processSequence = ({value, writeLog, handleSuccess, handleError}) => {
    const tapWriteLog = tap(writeLog);
    const handleValidationError = () => handleError('ValidationError');
    const handleErrorPromise = (e) => handleError(e);

    compose(
        ifElse(
            validateSting,
            compose(
                otherwise(handleErrorPromise),
                andThen(handleSuccess),
                andThen(getResult),
                andThen(getAnimalData),
                andThen(tapWriteLog),
                andThen(createAnimalUrl),
                andThen(toString),
                andThen(tapWriteLog),
                andThen(getModThree),
                andThen(tapWriteLog),
                andThen(numberToSquare),
                andThen(tapWriteLog),
                andThen(length),
                andThen(tapWriteLog),
                andThen(getResult),
                getBinaryData,
                tapWriteLog,
                roundUpToNumber
            ),
            handleValidationError
        ),
        tapWriteLog
    )(value)

}

export default processSequence;
