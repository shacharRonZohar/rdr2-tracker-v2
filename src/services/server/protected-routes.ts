class _ProtectedRoutes {
  private _protectedRoutes: string[] = []

  get protectedRoutes() {
    return this._protectedRoutes
  }

  protectRoute(route: string) {
    this._protectedRoutes.push(route)
  }

  isRouteProtected(route: string) {
    return this._protectedRoutes.includes(route)
  }

  removeRouteProtection(route: string) {
    const index = this._protectedRoutes.indexOf(route)
    if (index !== -1) {
      this._protectedRoutes.splice(index, 1)
    }
  }

  resetRouteProtection() {
    this._protectedRoutes.splice(0, this._protectedRoutes.length)
  }

  getProtectedRoutes() {
    return this._protectedRoutes
  }
}

export const protectedRoutes = new _ProtectedRoutes()
