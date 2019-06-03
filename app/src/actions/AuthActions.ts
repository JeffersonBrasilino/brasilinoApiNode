import AuthService from '../services/AuthService';
export class AuthActions {

    private authService: AuthService
    constructor() {
        this.authService = new AuthService();
    }

    index = (req, res) => {
        res.send('AuthAction');
    }
    signup = async (req, res) => {
        res.send('foifoi');

         //let result = await this.authService.signIn(req.data.user,req.data.password);
        // if (result == false){
        //     res.sendStatus(500);
        // }else{
        //     res.set({'location':'teste/'+result})
        //     res.status(201).json({id: result});
        // }

        //      UsuariosModel.findOne({
        //          where: {gurpo:13},
        //         include: [
        //             {
        //                 model:GrupousuariosusuarioModel, include: [GrupousuariosModel]
        //             }
        //         ]
        //     }).then((result) => {
        //         res.send(result.Grupousuariosusuario);
        //     });

        //     UsuariosModel.update(req.body,{where:{id:1}}).then((usuario) => {
        //         res.json(usuario);
        //     });


        // } catch (error) {
        //     console.log(error);
        // }
    }
}