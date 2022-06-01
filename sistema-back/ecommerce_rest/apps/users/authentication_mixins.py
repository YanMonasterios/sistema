from email import message
from urllib import response
from rest_framework.renderers import JSONRenderer
from django.db import reset_queries
from rest_framework.authentication import get_authorization_header
from rest_framework.response import Response
from apps.users.authentication import ExpiringTokenAuthentication
from rest_framework import status

class Authentication(object):
    user = None
    user_token_expired = False


    def get_user(self,request):
        token = get_authorization_header(request).split()
        if token:
            try: 
                token = token[1].decode()
            except:
                return None

            token_expire = ExpiringTokenAuthentication()
            user,token,message,self.user_token_expired= token_expire.authenticate_credentials(token)
            if user != None and token != None:
                self.user = user
                return user 
            return message
        return None

    def dispatch(self,request,*args,**kwargs):
        user = self.get_user(request)
        # encontro un token en la peticion 
        if user is not None:
            if type(user) == str:
                response = Response({'Error':user, 'Expired':self.user_token_expired},
                                                 status = status.HTTP_400_BAD_REQUEST)
                response.accepted_renderer = JSONRenderer()
                response.accepted_media_type = 'application/json'
                response.renderer_context = {}
                return response

            if not self.user_token_expired:    
                return super().dispatch(request,*args,**kwargs)
        response = Response({'error':'no se ha enviado las credenciales', 'Expired':self.user_token_expired},
                                                                        tatus = status.HTTP_400_BAD_REQUEST)
        response.accepted_renderer = JSONRenderer()
        response.accepted_media_type = 'application/json'
        response.renderer_context = {}
        return response




# from rest_framework import authentication, exceptions
# from rest_framework.authentication import get_authorization_header

# from apps.users.authentication import ExpiringTokenAuthentication

# class Authentication(authentication.BaseAuthentication):
#     user = None
    
#     def get_user(self,request):
#         """
#         Return:
#             * user      : User Instance or 
#             * message   : Error Message or 
#             * None      : Corrup Token
#         """
#         token = get_authorization_header(request).split()
#         if token:
#             try:
#                 token = token[1].decode()
#             except:
#                 return None            
        
#             token_expire = ExpiringTokenAuthentication()
#             user = token_expire.authenticate_credentials(token)
            
#             if user != None:
#                 self.user = user
#                 return user
        
#         return None

#     def authenticate(self, request):
#         self.get_user(request)
#         if self.user is None:
#             raise exceptions.AuthenticationFailed('No se han enviado las credenciales.')

#         return (self.user, 1)
        