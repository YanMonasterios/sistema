from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from apps.hired.models import Hired

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    pass

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hired
        fields = ('name', 'last_name', 'CI','id_department','num','date')

class UserTokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hired
        fields = ('name', 'last_name', 'CI','id_department','num','date')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hired
        fields = '__all__'

    def create(self, validated_data):
        hired = Hired(**validated_data)
       # hired.set_password(validated_data['password'])
        hired.save
        return hired

    def update(self, instance, validated_data):
        updated_user = super().update(instance, validated_data)
        updated_user.save()
        return updated_user

    
    
    # def update(self, instance, validated_data):
    #     updated_user = super().update(instance, validated_data)
    #     updated_user.set_password(validated_data['password'])
    #     updated_user.save()
    #     return updated_user

class UpdateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hired
        fields = ('name', 'last_name', 'CI','id_department','num','date')

class PasswordSerializer(serializers.Serializer):
    password = serializers.CharField(max_length=128, min_length=6, write_only=True)
    password2 = serializers.CharField(max_length=128, min_length=6, write_only=True)

    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError(
                {'password':'Debe ingresar ambas contraseñas iguales'}
            )
        return data


class UserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hired


    def to_representation(self, instance):
        return {
            'id': instance.id,
            'name': instance.name,
            'CI': instance.CI,
            'last_name': instance.last_name,
            'id_department': instance.id_department,
            'num': instance.num


        }

