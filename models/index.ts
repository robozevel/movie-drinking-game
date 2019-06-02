export class Cue {
  start!: number
  end!: number
  text!: string
}

export type Subtitles = Cue[]

export class Movie {
  id!: string
  title!: string
  subtitle!: string
  image!: string
}

export class Result {
  word!: string
  timestamps!: number[]
  count!: number
  average!: number
  diffs!: number[]
  score!: number
}

export type Results = Result[]