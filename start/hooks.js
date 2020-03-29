const { hooks } = require('@adonisjs/ignitor')

hooks.after.providersBooted(() => {
  const Validator = use('Validator')
  const Database = use('Database')

  /**
   * Validate if value exists in table field
   */
  const existsFn = async (data, field, message, args, get) => {
    const value = get(data, field)
    
    if (!value) {
      return
    }

    const [table, column] = args
    const row = await Database.table(table).where(column, value).first()

    if (!row) {
      throw message
    }
  }

  /**
   * Validate if value is coordinate
   */
  const coordinateFn = async (data, field, message, args, get) => {
    const value = get(data, field)
    
    if (!value) {
      return
    }

    if ( typeof value !== 'number' ) {
      throw message;
    }

    if ( value < -90 || value > 90  ) {
      throw message;
    }
  }

  Validator.extend('exists', existsFn)
  Validator.extend('coordinate', coordinateFn)
})