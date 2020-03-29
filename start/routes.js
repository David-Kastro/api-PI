'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.get('/propriedades', 'PropriedadeController.all')
Route.post('/propriedades', 'PropriedadeController.create').validator('SavePropriedade')
Route.put('/propriedades/:id', 'PropriedadeController.update').validator('SavePropriedade')
Route.delete('/propriedades/:id', 'PropriedadeController.delete')
Route.post('/propriedades/inativar', 'PropriedadeController.inativar')
Route.get('/propriedades/indicadas-avaliadas', 'PropriedadeController.indicadasOuAvaliadas')
Route.get('/propriedades/anunciadas', 'PropriedadeController.anunciadas')
Route.get('/propriedades/vendas', 'PropriedadeController.vendas')
Route.post('/propriedades/:id/imagens', 'PropriedadeController.uploadImages')
