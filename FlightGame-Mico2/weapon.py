class Weapon:
    def __init__(self, type, damage, durability):
        self.type = type
        self.damage = damage
        self.durability = durability

    def use(self):
        self.durability -= 1
