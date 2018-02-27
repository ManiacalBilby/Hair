class Api::StylistsController < ApplicationController
  def show
    @stylist = Stylist.find(params[:id])

    render json: @stylist
  end

  def create
    @stylist = Stylist.create!(stylist_params)

    render json: @stylist
  end

  def

  private

  def stylist_params
    params.require(:stylist).permit(
      :first_name, 
      :last_name,
      :photo_url,
      :email)
  end

end
