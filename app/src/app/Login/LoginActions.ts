import Usuarios from '../../models/Usuarios';
export class LoginActions {
    login = async (req, res) => {
        try {
            let retorno = '';
            await Usuarios.model.create(
                {
                    nome: 'teste com permissao',
                    GrupoUsuarios: {
                        grupo_usuarios_id: 3
                    }
                }, {
                    include: [{
                        association: Usuarios.asociation
                    }]
                }
            ).then((t) => {
                retorno = t;
            });
            res.send(retorno);
        } catch (err) {
            console.log(err);
        }
    }
}