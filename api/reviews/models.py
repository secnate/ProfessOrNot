from django.db import models
from accounts.models import User
from courses.models import Course
from professors.models import Professor
from django.core.validators import MinValueValidator, MaxValueValidator

class Review(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    reviewer = models.ForeignKey(User, on_delete=models.CASCADE, default=1)
    professor = models.ForeignKey(Professor, on_delete=models.CASCADE, default=1)
    course = models.ForeignKey(Course, on_delete=models.CASCADE, default=1)
    rating = models.IntegerField(validators=[MinValueValidator(1),MaxValueValidator(5)], default=0)
    comment = models.CharField(max_length=255, default='')
    class Meta:
        unique_together = ('reviewer', 'professor','course')
    def __str__(self):
        return self.name