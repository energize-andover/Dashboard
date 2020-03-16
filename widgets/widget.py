import itertools

count = itertools.count()


class Widget():
    def __init__(self, name, aspect_ratio):
        self.id = next(count)
        self.name = name
        self.aspect_ratio = aspect_ratio

    def get_id(self):
        return self.id

    def get_preview_image_name(self):
        return '{0}_{1}.png'.format(self.id, self.name.replace(' ', '_'))
