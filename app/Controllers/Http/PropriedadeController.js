'use strict'

const Propriedade    = use('App/Models/Propriedade');
const Imagem         = use('App/Models/Imagem');
const BaseController = use('App/Controllers/Http/BaseController');
const Helpers        = use('Helpers')

const saveOnly       = require('./only/propriedadeSaveOnly');

class PropriedadeController extends BaseController {
  all({ request }) {
    return super.paginate(request, Propriedade);
  }

  async create({ request }) {
    const data        = request.only(saveOnly);
    const propriedade = await Propriedade.create(data);

    return propriedade;
  }

  async update({ request, params }) {
    const data        = request.only(saveOnly);
    const propriedade = await Propriedade.findOrFail(params.id);

    propriedade.merge(data);
    await propriedade.save();
    return propriedade;
  }

  async delete({ params }) {
    const propriedade = await Propriedade.findOrFail(params.id);

    await propriedade.delete();
    return propriedade;
  }

  async uploadImages({ request, params }) {
    await Propriedade.findOrFail(params.id);
    
    const propriedadePics = request.file('files', {
      types: ['image'],
      size: '2mb'
    })
  
    await propriedadePics.moveAll(`${Helpers.tmpPath('uploads')}/propriedades/${params.id}`, file => ({
      name: `${Date.now()}-${file.clientName}`
    }));
  
    if (!propriedadePics.movedAll()) {
      return propriedadePics.errors()
    }

    await Promise.all(
      propriedadePics
        .movedList()
        .map(image => Imagem.create({
          idPropriedade: params.id,
          foto: image.fileName
        }))
    )
  }

  indicadasOuAvaliadas({ request }) {
    const Query = Propriedade
      .query()
      .where('tipo', 'indicar')
      .orWhere('tipo', 'avaliar');
    
    return super.queryPaginate(request, Query);
  }

  anunciadas({ request }) {
    const Query = Propriedade
      .query()
      .where('tipo', 'anunciar')
    
    return super.queryPaginate(request, Query);
  }

  vendas({ request }) {
    const Query = Propriedade
      .query()
      .where('tipo', 'vender')
    
    return super.queryPaginate(request, Query);
  }
}

module.exports = PropriedadeController
