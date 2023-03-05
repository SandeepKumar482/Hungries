import 'package:async/async.dart';
import '../../domain/crendentials.dart';
import '../../domain/token.dart';

abstract class IApiAuth {
  Future<Result<String>> signin(Credentials credential);
  Future<Result<String>> signup(Credentials credential);
}
