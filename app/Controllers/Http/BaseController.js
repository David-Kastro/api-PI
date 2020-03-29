'use strict'

class BaseController {

  /**
   * Realiza uma páginação geral a partir de uma Model ou a partir da referencia de uma Model.
   */
  async paginate(request, ModelRef, limit = 10) {
    
    const Model = typeof ModelRef === 'function'
      ? ModelRef
      : use(ModelRef)

    const { p } = request.get();
    const page  = Number(p) || 1;
    
    return await Model.query().paginate(page, limit);
  }

  /**
   * Realiza uma páginação a partir de uma Query.
   */
  async queryPaginate(request, Query, limit = 10) {

    const { p } = request.get();
    const page  = Number(p) || 1;
    
    return await Query.paginate(page, limit);
  }

}

module.exports = BaseController
