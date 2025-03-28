class CreateEnemy:
    def __init__(self, name, attack_power, weakness, health):
        self.name = name
        self.health = health
        self.attack_power = attack_power
        self.weakness = weakness


    def attack(self, target):
        print(f"{self.name} hyökkää kohteeseen {target.name} ja aiheuttaa {self.attack_power} vahinkoa. ")
        target.take_damage(self.attack_power)

    def die(self):
        print(f"{self.name.title()} on kukistettu!")

    def take_damage(self, damage, weapon_type):
        if weapon_type == self.weakness:
            damage *= 2
        self.health -= damage
        print(f"{self.name.title()} sai {damage} vahinkoa. (HP: {self.health})")
        if self.health <= 0:
            self.die()