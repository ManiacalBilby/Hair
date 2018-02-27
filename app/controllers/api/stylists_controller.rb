class Api::StylistsController < ApplicationController
  def show
    @stylist = Stylist.find(params[:id])

    render json:@stylist
  end
end
