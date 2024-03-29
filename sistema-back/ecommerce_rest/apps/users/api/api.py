from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import viewsets

from apps.users.models import User
from apps.users.authentication_mixins import Authentication
from apps.users.api.serializers import (
    UserSerializer, UserListSerializer, UpdateUserSerializer,
    PasswordSerializer
)

#class UserViewSet(Authentication,viewsets.GenericViewSet):
class UserViewSet(viewsets.GenericViewSet):
    model = User
    serializer_class = UserSerializer
    list_serializer_class = UserListSerializer
    queryset = None

    def get_object(self, pk):
        return get_object_or_404(self.model, pk=pk)

    def get_queryset(self):
        if self.queryset is None:
            self.queryset = self.model.objects\
                            .filter(is_active=True)\
                            .values('id', 'username', 'email', 'name', 'last_name')
        return self.queryset

    @action(detail=True, methods=['post'])
    def set_password(self, request, pk=None):
        user = self.get_object(pk)
        password_serializer = PasswordSerializer(data=request.data)
        if password_serializer.is_valid():
            user.set_password(password_serializer.validated_data['password'])
            user.save()
            return Response({
                'message': 'Contraseña actualizada correctamente'
            })
        return Response({
            'message': 'Hay errores en la información enviada',
            'errors': password_serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

    def list(self, request):
        users = self.get_queryset()
        users_serializer = self.list_serializer_class(users, many=True)
        return Response(users_serializer.data, status=status.HTTP_200_OK)
    
    def create(self, request):
        user_serializer = self.serializer_class(data=request.data)
        if user_serializer.is_valid():
            user_serializer.save()
            return Response({
                'message': 'Usuario registrado correctamente.'
            }, status=status.HTTP_201_CREATED)
        return Response({
            'message': 'Hay errores en el registro',
            'errors': user_serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        user = self.get_object(pk)
        user_serializer = self.serializer_class(user)
        return Response(user_serializer.data)
    
    def update(self, request, pk=None):
        user = self.get_object(pk)
        user_serializer = UpdateUserSerializer(user, data=request.data)
        if user_serializer.is_valid():
            user_serializer.save()
            return Response({
                'message': 'Usuario actualizado correctamente'
            }, status=status.HTTP_200_OK)
        return Response({
            'message': 'Hay errores en la actualización',
            'errors': user_serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        user_destroy = self.model.objects.filter(id=pk).update(is_active=False)
        if user_destroy == 1:
            return Response({
                'message': 'Usuario eliminado correctamente'
            })
        return Response({
            'message': 'No existe el usuario que desea eliminar'
        }, status=status.HTTP_404_NOT_FOUND)

# @api_view(['GET','POST'])
# def user_api_view(request):
# # definir el metodo get es el metodo que va a recibir la peticion que envie cualquier front(obtiene)

#  if request.method == 'GET':
#    users = User.objects.all().values('id','username','email','password')
#    Users_serializer = UserListSerializer(users, many = True)
#    return Response(Users_serializer.data, status = status.HTTP_200_OK)

#   #retorna una respuesta(entrega)
#  elif request.method  == 'POST':
#    #el userserializer convierte un modelo en json 
#     User_serializer = UserSerializer(data = request.data)

#     if User_serializer.is_valid():
#       User_serializer.save()
#       #guarda la informacion en la variable:
#       return Response({'massage':'Usuario creado correctamente'}, status = status.HTTP_201_CREATED)


#     return Response(User_serializer.errors, status = status.HTTP_400_BAD_REQUEST)


# @api_view(['GET','PUT','DELETE'])
# def user_detail_api_view(request,pk=None):
#   #consulta
#   user = User.objects.filter(id = pk).first()
#   #validacion
#   if user:

#     if request.method =='GET':    
#       user_serializer = UserSerializer(user)
#       return Response(user_serializer.data, status = status.HTTP_200_OK)
        
#         #update
#     elif request.method == 'PUT':
#       user_serializer = UserSerializer(user, data = request.data)
#       if user_serializer.is_valid():
#           user_serializer.save()
#           return Response(user_serializer.data, status = status.HTTP_200_OK)
#       return Response(user_serializer.errors, status = status.HTTP_400_BAD_REQUEST)
      
#     elif request.method == 'DELETE':
#       user.delete()
#       return Response({'message':'Usuario Eliminado Correctamente'}, status = status.HTTP_200_OK) 

#   return Response({'message':'No se ha encontrado un usuario con estos datos'}, status = status.HTTP_400_BAD_REQUEST) 