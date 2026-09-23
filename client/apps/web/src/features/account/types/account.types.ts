/** Shape of `location.state` the account page accepts. */
export type AccountLocationState = {
  /** Set right after signup, to greet the new customer. */
  welcome?: boolean
}

export type AccountDetail = {
  label: string
  value: string
}
