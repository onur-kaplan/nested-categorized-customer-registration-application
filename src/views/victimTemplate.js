export const victimTemplate = `
    <div class="card-body victim-box mx-3 my-2 position-relative" id="__ID__" data-status="__STATUS__">
        <button type="button" class="btn btn-sm btn-outline-success ml-auto victim-mission-complated-btn">Mission completed <i class="fas fa-check"></i></button>
        <button class="btn btn-outline-danger btn-sm ml-auto text-right victim-remove-btn" type="button"><i class="fas fa-trash-alt"></i></button>
        <div class="d-flex">
            <div class="mr-auto victim-photo-box">
                <img data-name="victim-photo" class="mr-2" src="__PHOTO__" alt="" width="100" height="100">
            </div>
            <div class="col ml-3 victim-info-box p-3">
                <div class="row">
                    <div class="col-12 pb-3">
                        <strong class="">
                            <span data-name="victim-name">__NAME__</span>
                            <span data-name="victim-surname">__LASTNAME__</span>
                        </strong>
                        <span class="badge badge-info" data-name="victim-gender"> __GENDER__ </span>
                        <span class="badge badge-warning" data-name="victim-age"> __AGE__ </span>
                    </div>
                    <div class="col-12">
                        __ADDRESSES__
                    </div>
                </div>
            </div>
        </div>
    </div>
`;
