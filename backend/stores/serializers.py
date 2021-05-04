from djoser.serializers import UserCreateSerializer
from djoser.serializers import UserSerializer
from django.contrib.auth import get_user_model
User = get_user_model()

class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('id','username','email', 'first_name', 'last_name','is_merchant','password')


class UserSerializer(UserSerializer):
    class Meta(UserSerializer.Meta):
        model = User
        fields = ('id','username', 'first_name', 'last_name','is_merchant')
