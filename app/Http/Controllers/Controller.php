<?php

namespace App\Http\Controllers;

abstract class Controller
{
	public function success($data = [], $message = "Successfully fetched")
	{
		return response()->json([
			"status" => "success",
			"data" => $data,
			"message" => $message
		]);
	}

	public function error($data = [], $message = "Something went wrong", $statusCode = 500)
	{
		return response()
			->json(
				data: [
					"status" => "error",
					"message" => $message,
					"data" => $data
				],
				status: $statusCode
			);
	}
}
