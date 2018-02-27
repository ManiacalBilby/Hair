class Api::StylistsController < ApplicationController
  def show
    @stylist = Stylist.find(params[:id])

    render json: @stylist
  end

  def create
    @stylist = Stylist.create!(stylist_params)

    render json: @stylist
  end

  def update
    @stylist = Stylist.find(params[:id])
    @stylist.update! (stylist_params)

    render json: @stylist
  end

  private

  def stylist_params
    params.require(:stylist).permit(
      :first_name, 
      :last_name,
      :photo_url,
      :email,
      :password)
  end

end
