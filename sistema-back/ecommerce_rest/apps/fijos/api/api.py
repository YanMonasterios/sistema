# from django.shortcuts import get_object_or_404

# from rest_framework import status
# from rest_framework.response import Response
# from rest_framework.decorators import action
# from rest_framework import viewsets

# from apps.fijos.models import Fijos
# from apps.fijos.api.serializers import (
#     UserSerializer, UserListSerializer, UpdateUserSerializer
# )

# #class UserViewSet(Authentication,viewsets.GenericViewSet):
# class UserViewSet(viewsets.GenericViewSet):
#     model = Fijos
#     serializer_class = UserSerializer
#     list_serializer_class = UserListSerializer
#     queryset = None

#     def get_object(self, pk):
#         return get_object_or_404(self.model, pk=pk)

#     def get_queryset(self):
#         if self.queryset is None:
#             self.queryset = self.model.objects.all()
#                            # .values('name', 'last_name', 'id_department', 'num')
#         return self.queryset

#     def list(self, request):
#         users = self.get_queryset()
#         users_serializer = self.list_serializer_class(users, many=True)
#         return Response(users_serializer.data, status=status.HTTP_200_OK)
    
#     def create(self, request):
#         user_serializer = self.serializer_class(data=request.data)
#         if user_serializer.is_valid():
#             user_serializer.save()
#             return Response({
#                 'message': 'Usuario registrado correctamente.'
#             }, status=status.HTTP_201_CREATED)
#         return Response({
#             'message': 'Hay errores en el registro',
#             'errors': user_serializer.errors
#         }, status=status.HTTP_400_BAD_REQUEST)

#     def retrieve(self, request, pk=None):
#         user = self.get_object(pk)
#         user_serializer = self.serializer_class(user)
#         return Response(user_serializer.data)
    
#     def update(self, request, pk=None):
#         user = self.get_object(pk)
#         user_serializer = UpdateUserSerializer(user, data=request.data)
#         if user_serializer.is_valid():
#             user_serializer.save()
#             return Response({
#                 'message': 'Usuario actualizado correctamente'
#             }, status=status.HTTP_200_OK)
#         return Response({
#             'message': 'Hay errores en la actualización',
#             'errors': user_serializer.errors
#         }, status=status.HTTP_400_BAD_REQUEST)

#     def destroy(self, request, pk=None):
#         user_destroy = self.model.objects.filter(id=pk).update(is_active=False)
#         if user_destroy == 1:
#             return Response({
#                 'message': 'Usuario eliminado correctamente'
#             })
#         return Response({
#             'message': 'No existe el usuario que desea eliminar'
#         }, status=status.HTTP_404_NOT_FOUND)

from rest_framework import status
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.parsers import JSONParser, MultiPartParser
from apps.fijos.models import Fijos
from apps.fijos.api.serializers import FijosSerializer, FijosRetrieveSerializer

class FijosViewSet(viewsets.ModelViewSet):
    serializer_class = FijosSerializer
    parser_classes = (JSONParser, MultiPartParser, )

    def get_queryset(self, pk=None):
        if pk is None:
            return self.get_serializer().Meta.model.objects.filter(state=True)
        return self.get_serializer().Meta.model.objects.filter(id=pk, state=True).first()

    def list(self, request):
        # rquest .filterr status true 
        fijos_serializer = self.get_serializer(self.get_queryset(), many=True)
        data = {
            "total": self.get_queryset().count(),
            "totalNotFiltered": self.get_queryset().count(),
            "rows": fijos_serializer.data
        }
        return Response(data, status=status.HTTP_200_OK)

    def create(self, request):
        # send information to serializer 
        serializer = self.serializer_class(data=request.data)    
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Empleado fijo creado correctamente!'}, status=status.HTTP_201_CREATED)
        return Response({'message':'', 'error':serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        fijos = self.get_queryset(pk)
        if fijos:
            fijos_serializer = FijosRetrieveSerializer(fijos)
            return Response(fijos_serializer.data, status=status.HTTP_200_OK)
        return Response({'error':'No existe un empleado fijo con estos datos!'}, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None):
        if self.get_queryset(pk):
            # send information to serializer referencing the instance
            fijos_serializer = self.serializer_class(self.get_queryset(pk), data=request.data)            
            if fijos_serializer.is_valid():
                fijos_serializer.save()
                return Response({'message':'empleado fijo actualizado correctamente!'}, status=status.HTTP_200_OK)
            return Response({'message':'', 'error':fijos_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        fijos = self.get_queryset().filter(id=pk).first() # get instance        
        if fijos:
            fijos.state = False
            fijos.save()
            return Response({'message':'empleado fijo eliminado correctamente!'}, status=status.HTTP_200_OK)
            return Response({'error':'No existe un empleado fijo con estos datos!'}, status=status.HTTP_400_BAD_REQUEST)
        
