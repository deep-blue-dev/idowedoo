class CasesController < ApplicationController

  def index
    if current_user.present?
      @cases = current_user.cases
    else
      @cases = []
    end
    @new_case = Case.new
    @templates = CaseTemplate.all
  end

  def create
    if current_user.present?
      kase = current_user.cases.build(case_params)
      if kase.save
        flash[:success] = t("cases_controller.create.success")
        redirect_to edit_case_path(kase)
      else
        flash[:error] = t("cases_controller.create.error")
        # render :back
        redirect_to :index
      end
    else
      ## Allow unauthed users to design case, but they must register to save
    end
  end

  def new
    @cases = Case.all
    @order_item = OrderItem.new
  end

  def edit
    @cases = Case.all
    @order_item = OrderItem.new
  end

  private 

  def case_params
    params.require(:case).permit(:title, :template_id)
  end
end
