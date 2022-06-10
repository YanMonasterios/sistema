# from datetime import datetime

# from django.contrib.sessions.models import  Session

# from rest_framework import status
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework.authtoken.models import Token
# from rest_framework.authtoken.views import ObtainAuthToken

# from apps.users.api.serializers import UserTokenSerializer

# class Login(ObtainAuthToken):

#     def post(self,request,*args,**kwargs):
#         login_serializer = self.serializer_class(data = request.data, context = {'request':request})
#         if login_serializer.is_valid():
#             user = login_serializer.validated_data['user']
#             if user.is_active:
#                 token,created = Token.objects.get_or_create(user = user)
#                 user_serializer = UserTokenSerializer(user)
#                 if created:
#                     return Response({
#                         'token': token.key,
#                         'user': user_serializer.data, 
#                         'message': 'Inicio de sesion exitoso'
#                     }, status = status.HTTP_201_CREATED)
#                 else:
#                     """
#                     all_sessions = Session.objects.filter(expire_date__gte = datetime.now())
#                     if all_sessions.exists():
#                         for session in all_sessions:
#                             session_data = session.get_decoded()
#                             if user.id == int(session_data.get('_auth_user_id')):
#                                 session.delete() 
                    
#                     token = token.objects.create(user = user)
#                     return Response({
#                         'token': token.key,
#                         'user': user_serializer.data, 
#                         'message': 'Inicio de sesion exitoso'
#                     }, status = status.HTTP_201_CREATED)
#                     """
#                     token.delete()
#                     return Response({   
#                        'error': 'ya se ha iniciado sesion con este usuario'},
#                        status = status.HTTP_409_CONFLICT)
#             else:
#                 return Response({'error':'Este usuario no puede iniciar sesion'},
#                                    status = status.HTTP_401_UNAUTHORIZED)
#         else:
#             return Response({'error':'nombre de usuario o contraseña incorrectos.'},
#                                 status = status.HTTP_400_BAD_REQUEST)
#         return Response({'mensaje':'hola desde response'}, status = status.HTTP_200_OK)

# class Logout(APIView):

#     def post(self,request,*args,**kwargs):
#         try: 
#             token = request.POST.post('token')
#             token = Token.objects.filter(key = token).first()

#             if token:
#                 user = token.user
#                 all_sessions = Session.objects.filter(expire_date__gte = datetime.now())
#                 if all_sessions.exists():
#                     for session in all_sessions:
#                         session_data = session.get_decoded()
#                         if user.id == int(session_data.get('_auth_user_id')):
#                                 session.delete()    

#                 token.delete()
#                 session_message = 'sesiones de usuarios eliminadas'
#                 token_message = 'Token eliminado'
#                 return Response({'token_message':token_message,'session_message':session_message},
#                                     status = status.HTTP_200_OK)
            
#             return Response({'error':'No se han encontrado un usuario con estas credenciales'},
#                                 status = status.HTTP_400_BAD_REQUEST)

#         except:
#             return Response({'error': 'No se ha encontrado token en la peticion'}, 
#                                 status = status.HTTP_409_CONFLICT)
        

from django.contrib.auth import authenticate

from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response

from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView

from apps.users.api.serializers import (
    CustomTokenObtainPairSerializer, CustomUserSerializer
)
from apps.users.models import User
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from apps.users.api.serializers import UserTokenSerializer


class UserToken(APIView):
    def get(self,request,*args, **kwargs):
        username = request.GET.get('username')
        print(username)
        try:
            user_token = Token.objects.get(user = UserTokenSerializer().Meta.model.objects.filter(username = username).first()
            )
            return Response({
                'token': user_token.key
            })
        except:
            return Response({
                'error': 'Credenciales enviadas incorrectas'
            }, status = status.HTTP_400_BAD_REQUEST)



class Login(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        username = request.data.get('username', '')
        password = request.data.get('password', '')
        user = authenticate(
            username=username,
            password=password
        )

        if user:
            login_serializer = self.serializer_class(data=request.data)
            if login_serializer.is_valid():
                token,created = Token.objects.get_or_create(user = user)
                if created:
                    print('entre')
                    user_serializer = CustomUserSerializer(user)
                    return Response({
                        # 'token': login_serializer.validated_data.get('access'),
                        'token': token.key,
                        'refresh-token': login_serializer.validated_data.get('refresh'),
                        'user': user_serializer.data,
                        'message': 'Inicio de Sesion Existoso'
                    }, status=status.HTTP_200_OK)
            return Response({'error': 'Contraseña o nombre de usuario incorrectos'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'error': 'Contraseña o nombre de usuario incorrectos'}, status=status.HTTP_400_BAD_REQUEST)

class Logout(GenericAPIView):
    def post(self, request, *args, **kwargs):
        token = request.data.get('token', '')
        token = Token.objects.filter(key = token).first()
        if token:
            # user = token.user
            token.delete()
            return Response({'message': 'Sesión cerrada correctamente.'}, status=status.HTTP_200_OK)
        return Response({'error': 'No existe este usuario.'}, status=status.HTTP_400_BAD_REQUEST)