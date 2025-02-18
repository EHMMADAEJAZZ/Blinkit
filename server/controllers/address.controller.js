import Address from '../models/address.model.js';
import { ApiErrors } from '../utils/apiErrors.js';
import { ApiResponse } from '../utils/apiResponse.js';
import User from '../models/user.model.js';
//add Address
export const addAddress = async (req, res, next) => {
  try {
    const { addressLine, city, state, country, pincode, mobile } = req.body;
    if (!addressLine || !city || !state || !country || !pincode || !mobile) {
      return res
        .status(400)
        .json(new ApiErrors(400, 'All fields are required'));
    }
    const newAddress = await Address.create({
      addressLine,
      city,
      state,
      country,
      pincode,
      mobile,
      userId: req.user._id, //add the user id to the address model to associate it with the user
    });
    //push the new address id to the user model to associate it with the address model
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $push: { addressDetails: newAddress._id } },
      { new: true }
    );
    return res
      .status(201)
      .json(new ApiResponse(201, 'Address added successfully', newAddress));
  } catch (error) {
    next(error);
  }
};

//get all addresses
export const getAddresses = async (req, res, next) => {
  try {
    const addresses = await Address.find({ userId: req.user._id }).sort({
      createdAt: -1,
    });
    return res
      .status(200)
      .json(
        new ApiResponse(200, 'Addresses retrieved successfully', addresses)
      );
  } catch (error) {
    next(error);
  }
};
// edit Address
export const editAddress = async (req, res, next) => {
  const { addressId } = req.params;
  try {
    const { addressLine, city, state, country, pincode, mobile } = req.body;
    if (!addressLine || !city || !state || !country || !pincode || !mobile) {
      return res
        .status(400)
        .json(new ApiErrors(400, 'All fields are required'));
    }
    const updatedAddress = await Address.findByIdAndUpdate(
      addressId,
      {
        $set: {
          addressLine,
          city,
          state,
          country,
          pincode,
          mobile,
        },
      },
      { new: true }
    );
    return res
      .status(200)
      .json(
        new ApiResponse(200, 'Address updated successfully', updatedAddress)
      );
  } catch (error) {
    next(error);
  }
};
//delete address
export const deleteAddress = async (req, res, next) => {
  const { addressId } = req.params;
  try {
    await Address.findByIdAndDelete(addressId);
    //delete from user model
    await User.findByIdAndUpdate(
      req.user._id,
      { $pull: { addressDetails: req.params.id } },
      { new: true }
    );
    return res
      .status(200)
      .json(new ApiResponse(200, 'Address deleted successfully'));
  } catch (error) {
    next(error);
  }
};
//update address to set default address
export const setPrimaryAddress = async (req, res, next) => {
  const { addressId } = req.params;
  try {
    await Address.updateMany(
      { userId: req.user._id },
      { $set: { isDefault: false } }
    ); //unset default address for all addresses
    await Address.findByIdAndUpdate(
      addressId,
      { $set: { isDefault: true } },
      { new: true }
    ); //set default address for the specific address
    return res
      .status(200)
      .json(new ApiResponse(200, 'Address set as default successfully'));
  } catch (error) {
    next(error);
  }
};
///updateAddress status
export const enableAddress = async (req, res, next) => {
  const { addressId } = req.params;
  try {
    const updatedAddress = await Address.findByIdAndUpdate(
      addressId,
      { $set: { status: true } },
      { new: true }
    );
    return res
      .status(200)
      .json(
        new ApiResponse(200, 'Address status updated successfully', updatedAddress)
      );
  } catch (error) {
    next(error);
  }
};
//disable address
export const disableAddress = async (req, res, next) => {
  const { addressId } = req.params;
  try {
    const updatedAddress = await Address.findByIdAndUpdate(
      addressId,
      { $set: { status: false } },
      { new: true }
    );
    return res
      .status(200)
      .json(
        new ApiResponse(200, 'Address status updated successfully', updatedAddress)
      );
  } catch (error) {
    next(error);
  }
};