// ignore: file_names
import 'package:auth/src/domain/crendentials.dart';


class Mapper {
  static Map<String, dynamic> toJson(Credentials credential) => {
    "auth-type":credential.authType.toString().split('.').last,
    "name":credential.name,
    "email":credential.email,
    "password": credential.password
  };
}
