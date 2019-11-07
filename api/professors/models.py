from django.db import models
from schools.models import School

class Professor(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=50, default="")
    school = models.ForeignKey(School, on_delete=models.CASCADE, default=1)
    class Meta:
        unique_together = ('name', 'school')
    def __str__(self):
        return self.name