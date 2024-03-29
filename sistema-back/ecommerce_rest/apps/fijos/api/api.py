from rest_framework import status
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
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
        # fijos_serializer = self.get_serializer(self.get_queryset(), many=True)
        fijos_serializer = self.get_serializer(Fijos.objects.filter(state = True), many=True)
        print('trajo los activos')
        data = {
            "total": self.get_queryset().count(),
            "totalNotFiltered": self.get_queryset().count(),
            "rows": fijos_serializer.data
        }
        return Response(data, status=status.HTTP_200_OK)
    
    @action(detail=False, methods=['get'])
    def inactivos(self, request):
        fijos_serializer = self.get_serializer(Fijos.objects.filter(state = False), many=True)
        print('trajo los inactivos')
        
        data = {
            "total": self.get_queryset().count(),
            "totalNotFiltered": self.get_queryset().count(),
            "rows": fijos_serializer.data
        }
        
        return Response(data, status=status.HTTP_200_OK)     
            
    @action(detail=False, methods=['put'])
    def vacaciones(self, request):
        print('paso vacaciones')
        pk = request.data['id']
        fijos_serializer = self.get_serializer(Fijos.objects.filter(id=pk), many=True)
        recibi_dias = float(request.data['recibi_dias'])
        recibi_bono = float(request.data['recibi_bono'])
        Fijos.objects.filter(id=pk).update(dias_frac=recibi_dias) 
        Fijos.objects.filter(id=pk).update(bono_frac=recibi_bono) 
        b = Fijos.objects.filter(id=pk)
        recibi_dias = round (float(b[0].salary/30) * recibi_dias, 2) 
        Fijos.objects.filter(id=pk).update(total_vacaciones_frac=recibi_dias) 
        recibi_bono = round (float(b[0].salary/30) * recibi_bono, 2) 
        Fijos.objects.filter(id=pk).update(total_bono_frac=recibi_bono) 
        
        data = {
            "total": self.get_queryset().count(),
            "totalNotFiltered": self.get_queryset().count(),
            "rows": fijos_serializer.data
        }
        
        return Response(data, status=status.HTTP_200_OK)    
    
    @action(detail=False, methods=['put'])
    def utilidades(self, request):
        print('paso utilidades')
        pk = request.data['id']
        fijos_serializer = self.get_serializer(Fijos.objects.filter(id=pk), many=True)
        recibi_utilidades = float(request.data['recibi_utilidades'])
        Fijos.objects.filter(id=pk).update(utilidades=recibi_utilidades) 
        b = Fijos.objects.filter(id=pk)
        recibi_utilidades = round (float(b[0].salary/30) * recibi_utilidades, 2) 
        Fijos.objects.filter(id=pk).update(total_utilidades=recibi_utilidades) 
        
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
        
        
        
    # def list(self, request):
    #     print('paso list')
    #     tipo_fijo = request.data['tipo']
    #     if tipo_fijo == int(0):
    #         fijos_serializer = self.get_serializer(Fijos.objects.filter(state = True), many=True)
    #         print('trajo los activos')
    #     else:
    #         fijos_serializer = self.get_serializer(Fijos.objects.filter(state = False), many=True)
    #         print('trajo los inactivos')
    #     data = {
    #         "total": self.get_queryset().count(),
    #         "totalNotFiltered": self.get_queryset().count(),
    #         "rows": fijos_serializer.data
    #     }
    #     return Response(data, status=status.HTTP_200_OK)
