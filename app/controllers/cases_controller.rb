class CasesController < ApplicationController
  before_action :set_case, only: [:show]

  def new
    @case = Case.new
  end

  def show
  end

  def create
    @case = Case.new(case_params)
    if params[:case].present?
      file = params[:case][:image]
      File.open(Rails.root.join('app', 'assets', 'images', file.original_filename), 'wb') do |f|
        f.write(file.read)
      end
      @case.image = "/app/assets/images" + file.original_filename
    end
    if @case.save
      redirect @case, notice: "Case was successfully created"
    end
  end

  private

  def set_case
    @case = Case.find(params[:id])
  end

  def case_params
    params.require(:case).permit(:type, :image)
  end
end
