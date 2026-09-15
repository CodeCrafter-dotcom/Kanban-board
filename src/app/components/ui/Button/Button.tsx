/* cspell:disable-file */

import React from "react";

const variant = {
    baseWhiteButton: 'baseWhiteButton',
    baseBlackButton: 'baseBlackButton',
    closeButton: 'closeButton',
    actionButton: 'actionButton',
    deleteColumnButton: 'deleteColumnButton',
    deleteTaskButton: 'deleteTaskButton',
} as const

type variantT = typeof variant[keyof typeof variant]

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode
    variant?: variantT
}

// inline-flex                  -> делает кнопку флексбоксом для выравнивания
// items-center                 -> центрирует текст и иконки по вертикали
// justify-center               -> центрирует текст и иконки по горизонтали
// font-medium                  -> задает среднюю толщину шрифта
// rounded-lg                   -> делает аккуратное скругление углов
// transition-all               -> включает плавную анимацию для всех изменений
// duration-200                 -> задает скорость анимации в 200мс
// select-none                  -> запрещает выделение текста синим при частых кликах
// cursor-pointer               -> меняет курсор мыши на «палец» при наведении
// focus-visible:outline-none   -> убирает стандартную грубую рамку браузера
// focus-visible:ring-2         -> создает красивый ободок Tailwind при фокусе
// focus-visible:ring-offset-2  -> делает отступ-зазор между кнопкой и ободком фокуса
// focus-visible:...            -> показывает фокус ТОЛЬКО при табе с клавиатуры, не от мыши
// disabled:pointer-events-none -> намертво блокирует клики и ховеры у неактивной кнопки
// disabled:opacity-50          -> делает неактивную кнопку блеклой на 50%
const baseStyles = [`
  inline-flex items-center justify-center font-medium rounded-xl transition-all 
  duration-200 select-none cursor-pointer disabled:pointer-events-none disabled:opacity-50 
`].join(' ')

// расширяет кликабельную зону (hitbox) маленькой кнопки
const hitBoxStyles = "relative after:content-[''] after:-translate-x-1/2 after:-translate-y-1/2 after:w-11 after:h-11 after:top-1/2 after:left-1/2 after:absolute"

const variants: Record<variantT, string> = {
    baseWhiteButton: `bg-white font-semibold border border-black py-1.5 px-5 h-12.5 hover:scale-110 duration-200`,
    baseBlackButton: `bg-black py-1.5 px-5 font-semibold text-white h-12.5 hover:scale-110 duration-200`,
    closeButton: `${hitBoxStyles} text-2xl font-bold`,
    actionButton: `bg-black h-11 text-white hover:scale-110 duration-200`,
    deleteColumnButton: `bg-black hover:scale-110 py-0.5 px-3 text-white font-normal`,
    deleteTaskButton: `${hitBoxStyles} w-10 text-2xl font-bold`
}

export default function Button({ children, variant, ...props }: ButtonProps) {
  
    return (
      <button className={`${baseStyles} ${variant ? variants[variant] : ''}`} {...props}>
        {children}
      </button>
    )
  }
  