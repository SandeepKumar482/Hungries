import 'package:async/src/result/result.dart';
import 'package:auth/src/domain/auth_service.dart';
import 'package:auth/src/domain/crendentials.dart';
import 'package:auth/src/domain/token.dart';
import 'package:auth/src/infra/api/auth_api_contract.dart';
import 'package:google_sign_in/google_sign_in.dart';

class GoogleAuth implements IAuthService {
  final IApiAuth _apiAuth;

  final  GoogleSignIn _googleSignIn;
  GoogleSignInAccount? _currentUser;

  GoogleAuth(this._apiAuth, [GoogleSignIn? googleSignIn])
      : _googleSignIn = googleSignIn!;

  @override
  Future<Result<Token>> signIn() async {
    await _handleGoogleSignIn();
    if (_currentUser == null) {
      return Result.error('Failed to signIn with Google');
    }
    Credentials credentials = Credentials(
      authType: AuthType.google,
      email: _currentUser!.email,
      name: _currentUser!.displayName,
    );
    try {
      var result = await _apiAuth.signin(credentials);
      return Result.value(Token(value: result.asValue!.value));
    } catch (error) {
      return Result<Token>.error(error);
    }
  }

  @override
  Future<void> signOut() async{
    _googleSignIn.disconnect();
  }

  _handleGoogleSignIn() async {
    try {
      _currentUser = await _googleSignIn.signIn();
    } catch (error) {
      return;
    }
  }
}
