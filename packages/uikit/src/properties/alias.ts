type Aliases = Readonly<Record<string, ReadonlyArray<string> | undefined>>

export type WithAliases<T, A extends Record<string, ReadonlyArray<unknown>>> = T & {
  [K in keyof A as A[K][number] extends keyof T ? K : never]?: A[K][number] extends keyof T ? T[A[K][number]] : never
}

export type WithAllAliases<T> = WithAliases<T, AllAliases>

const borderAliases = {
  border: ['borderBottom', 'borderTop', 'borderLeft', 'borderRight'],
  borderX: ['borderLeft', 'borderRight'],
  borderY: ['borderTop', 'borderBottom'],
} as const satisfies Aliases

const flexAliases = {
  ...borderAliases,
  inset: ['positionTop', 'positionLeft', 'positionRight', 'positionBottom'],
  padding: ['paddingBottom', 'paddingTop', 'paddingLeft', 'paddingRight'],
  paddingX: ['paddingLeft', 'paddingRight'],
  paddingY: ['paddingTop', 'paddingBottom'],
  margin: ['marginBottom', 'marginTop', 'marginLeft', 'marginRight'],
  marginX: ['marginLeft', 'marginRight'],
  marginY: ['marginTop', 'marginBottom'],
  gap: ['gapRow', 'gapColumn'],
} as const satisfies Aliases

const panelAliases = {
  borderRadius: ['borderTopLeftRadius', 'borderTopRightRadius', 'borderBottomLeftRadius', 'borderBottomRightRadius'],
  borderTopRadius: ['borderTopLeftRadius', 'borderTopRightRadius'],
  borderLeftRadius: ['borderTopLeftRadius', 'borderBottomLeftRadius'],
  borderRightRadius: ['borderTopRightRadius', 'borderBottomRightRadius'],
  borderBottomRadius: ['borderBottomLeftRadius', 'borderBottomRightRadius'],
} as const satisfies Aliases

const scrollbarAliases = {
  scrollbarBorderRadius: [
    'scrollbarBorderTopLeftRadius',
    'scrollbarBorderTopRightRadius',
    'scrollbarBorderBottomLeftRadius',
    'scrollbarBorderBottomRightRadius',
  ],
  scrollbarBorderTopRadius: ['scrollbarBorderTopLeftRadius', 'scrollbarBorderTopRightRadius'],
  scrollbarBorderLeftRadius: ['scrollbarBorderTopLeftRadius', 'scrollbarBorderBottomLeftRadius'],
  scrollbarBorderRightRadius: ['scrollbarBorderTopRightRadius', 'scrollbarBorderBottomRightRadius'],
  scrollbarBorderBottomRadius: ['scrollbarBorderBottomLeftRadius', 'scrollbarBorderBottomRightRadius'],
  scrollbarBorder: ['scrollbarBorderBottom', 'scrollbarBorderTop', 'scrollbarBorderLeft', 'scrollbarBorderRight'],
  scrollbarBorderX: ['scrollbarBorderLeft', 'scrollbarBorderRight'],
  scrollbarBorderY: ['scrollbarBorderTop', 'scrollbarBorderBottom'],
} as const satisfies Aliases

const caretAliases = {
  caretBorderRadius: [
    'caretBorderTopLeftRadius',
    'caretBorderTopRightRadius',
    'caretBorderBottomLeftRadius',
    'caretBorderBottomRightRadius',
  ],
  caretBorderTopRadius: ['caretBorderTopLeftRadius', 'caretBorderTopRightRadius'],
  caretBorderLeftRadius: ['caretBorderTopLeftRadius', 'caretBorderBottomLeftRadius'],
  caretBorderRightRadius: ['caretBorderTopRightRadius', 'caretBorderBottomRightRadius'],
  caretBorderBottomRadius: ['caretBorderBottomLeftRadius', 'caretBorderBottomRightRadius'],
  caretBorder: ['caretBorderBottom', 'caretBorderTop', 'caretBorderLeft', 'caretBorderRight'],
  caretBorderX: ['caretBorderLeft', 'caretBorderRight'],
  caretBorderY: ['caretBorderTop', 'caretBorderBottom'],
} as const satisfies Aliases

const selectionAliases = {
  selectionBorderRadius: [
    'selectionBorderTopLeftRadius',
    'selectionBorderTopRightRadius',
    'selectionBorderBottomLeftRadius',
    'selectionBorderBottomRightRadius',
  ],
  selectionBorderTopRadius: ['selectionBorderTopLeftRadius', 'selectionBorderTopRightRadius'],
  selectionBorderLeftRadius: ['selectionBorderTopLeftRadius', 'selectionBorderBottomLeftRadius'],
  selectionBorderRightRadius: ['selectionBorderTopRightRadius', 'selectionBorderBottomRightRadius'],
  selectionBorderBottomRadius: ['selectionBorderBottomLeftRadius', 'selectionBorderBottomRightRadius'],
  selectionBorder: ['selectionBorderBottom', 'selectionBorderTop', 'selectionBorderLeft', 'selectionBorderRight'],
  selectionBorderX: ['selectionBorderLeft', 'selectionBorderRight'],
  selectionBorderY: ['selectionBorderTop', 'selectionBorderBottom'],
} as const satisfies Aliases

const transformAliases = {
  transformScale: ['transformScaleX', 'transformScaleY', 'transformScaleZ'],
} as const satisfies Aliases

export type AllAliases = typeof flexAliases &
  typeof panelAliases &
  typeof scrollbarAliases &
  typeof transformAliases &
  typeof caretAliases &
  typeof selectionAliases

export const allAliases: AllAliases = Object.assign(
  {},
  flexAliases,
  panelAliases,
  scrollbarAliases,
  transformAliases,
  caretAliases,
  selectionAliases,
)
