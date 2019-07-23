class Ability
  include CanCan::Ability

  def initialize(user)
    can :read, :all

    if user.present?
      can :manage, User, id: user.id
      can :read, :dashboard

      if user.has_role? :admin
        can :access, :rails_admin
        can :manage, :dashboard
        can :manage, :all
      end
    end
  end
end
