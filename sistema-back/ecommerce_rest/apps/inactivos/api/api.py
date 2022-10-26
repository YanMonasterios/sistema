from rest_framework import status
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.parsers import JSONParser, MultiPartParser
from apps.inactivos.models import Inactivos
from apps.inactivos.api.serializers import InactivosSerializer, InactivosRetrieveSerializer

class InactivosViewSet(viewsets.ModelViewSet):
    serializer_class = InactivosSerializer
    parser_classes = (JSONParser, MultiPartParser, )

    def get_queryset(self, pk=None):
        if pk is None:
            return self.get_serializer().Meta.model.objects.filter(state=True)
        return self.get_serializer().Meta.model.objects.filter(id=pk, state=True).first()

    def list(self, request):
        inactivos_serializer = self.get_serializer(self.get_queryset(), many=True)
        data = {
            "total": self.get_queryset().count(),
            "totalNotFiltered": self.get_queryset().count(),
            "rows": inactivos_serializer.data
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
        inactivos = self.get_queryset(pk)
        if inactivos:
            inactivos_serializer = InactivosRetrieveSerializer(inactivos)
            return Response(inactivos_serializer.data, status=status.HTTP_200_OK)
        return Response({'error':'No existe un empleado fijo con estos datos!'}, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None):
        if self.get_queryset(pk):
            # send information to serializer referencing the instance
            inactivos_serializer = self.serializer_class(self.get_queryset(pk), data=request.data)            
            if inactivos_serializer.is_valid():
                inactivos_serializer.save()
                return Response({'message':'empleado fijo actualizado correctamente!'}, status=status.HTTP_200_OK)
            return Response({'message':'', 'error':inactivos_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        inactivos = self.get_queryset().filter(id=pk).first() # get instance        
        if inactivos:
            inactivos.state = False
            inactivos.save()
            return Response({'message':'empleado fijo eliminado correctamente!'}, status=status.HTTP_200_OK)
            return Response({'error':'No existe un empleado fijo con estos datos!'}, status=status.HTTP_400_BAD_REQUEST)