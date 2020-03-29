'use strict'

class SavePropriedade {
  get rules () {
    return {
      idLocalidade: 'required|integer|exists:localidade,id',
      latitude: 'required|coordinate',
      longitude: 'required|coordinate',
      nUnidade: 'integer'
    }
  }
}

module.exports = SavePropriedade
