import './token.dart';
import 'package:async/async.dart';

abstract class ISignUpService {
  Future<Result<Token>> signup(String name,
  String email,
  String password);
}
